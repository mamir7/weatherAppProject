import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TodayHighlights from "../components/TodayHighlights";
import "./App.css"; // Ensure this import is present
import Mainweather from "../components/MainweatherCard";
import axios from "axios";
import MainweatherCard from "../components/MainweatherCard";
import FiveDayForecast from "../components/Fiveday";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setcity] = useState("London");
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);

  useEffect(() => {
    fetchweatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = "0d12f1a4f9ede2845ccb7b9da5b846a7"; // Replace with your OpenWeatherMap API key
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((response) => {
        setAirQualityData(response.data.list[0]); // Set the first item in the list as air quality data
      })
      .catch((error) =>
        console.error("Error fetching the air quality data:", error)
      );
  };

  const fetchweatherData = (city) => {
    const API_KEY = "0d12f1a4f9ede2845ccb7b9da5b846a7";
    fetch(`
   https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        console.log(JSON.stringify(data));
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        )
          .then(response => {
            setFiveDayForecast(response.data);
          })
          .catch((error) => console.error('Error fetching the 5-day forecast data:', error)
        );
        })
        .catch((error )=> console.error('Error fetching the weather data:', error)
      );
  };

  const handleSearch = (searchedCity) => {
    setcity(searchedCity);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />

      {weatherData && airQualityData && (
        <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <MainweatherCard weatherData={weatherData} />
            <p
              style={{ fontWeight: "700", fontSize: "20px", marginTop: "20px" }}
            >
              5 Days Forecast
            </p>
            {fiveDayForecast && (
              <FiveDayForecast forecastData={fiveDayForecast} />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "0.5",
              gap: "20px",
            }}
          >
            <TodayHighlights
              weatherData={weatherData}
              airQualityData={airQualityData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
