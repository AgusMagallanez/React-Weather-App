import { useState } from "react";
import "./WeatherApp.css";

export const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [apiData, setApiData] = useState(null);

  const API_KEY = "API_KEY";
  const URL_BASE = `https://api.openweathermap.org/data/2.5/weather`;
  const diffKelvin = 273.15;

  const fecthApi = async () => {
    try {
      const res = await fetch(`${URL_BASE}?q=${city}&appid=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setApiData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fecthApi();
  };

  return (
    <>
      <div className="weather-app__container">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit} className="weather-app__form">
          <input
            className="weather-app__search-input"
            type="text"
            placeholder="Enter a city..."
            value={city}
            onChange={handleCityChange}
          />
          <input
            type="submit"
            value="Search"
            className="weather-app__submit-input"
          />
        </form>

        {apiData && (
          <div className="weather-app__data-conatiner">
            <h3>
              {apiData.name}, {apiData.sys.country}
            </h3>
            <p className="weather-app__data-temperature">
              {Math.floor(apiData.main.temp - diffKelvin)}ºC
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`}
              alt={apiData.weather[0].description}
            />
            <p>{apiData.weather[0].description}</p>
          </div>
        )}
      </div>
    </>
  );
};
