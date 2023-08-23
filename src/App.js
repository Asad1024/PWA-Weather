import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";
import humidity from "./assets/humidity.png";
import wind from "./assets/wind.png";
import logo from "./assets/logo.png";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [showWeather, setShowWeather] = useState(false);

  const fetchWeatherData = async () => {
    const data = await fetchWeather(query);
    setWeather(data);
    setShowWeather(true);
    setQuery('')
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  };

  const handleSearchButtonClick = () => {
    fetchWeatherData();
  };

  return (
    <div className="main-container">
      {!showWeather && (
        <div className="heading">
          <h1>Welcome to the Weather App!</h1>
          <p> Discover the current weather conditions for any location! 🌍</p>
        </div>
      )}
      <div className="searching">
        <input
          type="text"
          className="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
        <AiOutlineSearch className="search-icon" onClick={handleSearchButtonClick} />
      </div>

      {!showWeather && (
        <div className="footer">
          <img src={logo} style={{ width: "50px", height: "50px" }} alt="" />
          <h2>Weather App</h2>
        </div>
      )}
      {showWeather && weather.main && (
        <div className="city">
          <AiOutlineClose
            className="close"
            onClick={() => {
              setWeather({});
              setShowWeather(false);
            }}
          />

          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p className="description">{weather.weather[0].description}</p>
          </div>
          <div className="info-extra">
            <div className="humidity-info-extra-sub">
              <img src={humidity} alt="" />
              <p className="title">{weather.main.humidity}%</p>
            </div>
            <div className="info-extra-sub">
              <img src={wind} style={{ width: "px", height: "35px" }} alt="" />
              <p className="wind-title">{weather.wind.speed} km/h</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
