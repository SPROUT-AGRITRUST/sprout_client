import React, { useEffect, useState } from "react";

// const OPENWEATHER_API_KEY = "d6ddb3a31c34d60d3b545cf70d6ede5a"; // <--
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
//const DEFAULT_CITY = "Hyderabad";

const WeatherBox = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeatherByCoords = async (lat, lon) => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=en`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeather({
          location: data.name,
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          icon: data.weather[0].icon,
        });
      } catch (err) {
        setError("Could not load weather info");
      } finally {
        setLoading(false);
      }
    };

    const fetchWeatherByCity = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=en`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeather({
          location: data.name,
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          icon: data.weather[0].icon,
        });
      } catch (err) {
        setError("Could not load weather info");
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (err) => {
          // If user denies or error, fallback to city
          fetchWeatherByCity();
        },
        { timeout: 10000 }
      );
    } else {
      fetchWeatherByCity();
    }
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row gap-0 md:gap-0 justify-end items-stretch my-2">
      {/* Weather Info Box */}
      <div className="bg-green-50 border border-green-200 rounded-l-2xl px-4 py-2 flex flex-col items-start justify-center min-w-[140px] max-w-[180px] h-16 md:h-20 shadow-md">
        {loading ? (
          <div className="text-green-700 text-sm">Loading weather...</div>
        ) : error ? (
          <div className="text-red-600 text-sm">{error}</div>
        ) : weather ? (
          <>
            <div className="font-semibold text-green-800 text-sm mb-1">
              Location:{" "}
              <span className="font-normal text-gray-700">
                {weather.location}
              </span>
            </div>
            <div className="font-semibold text-green-800 text-sm mb-1">
              Temperature:{" "}
              <span className="font-normal text-gray-700">
                {weather.temp}°C
              </span>
            </div>
            <div className="font-semibold text-green-800 text-sm flex items-center">
              Weather:{" "}
              <span className="font-normal text-gray-700 ml-1">
                {weather.condition}
              </span>
              {weather.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.condition}
                  className="w-5 h-5 ml-2 inline-block align-middle"
                />
              )}
            </div>
          </>
        ) : null}
      </div>
      {/* More Info Box */}
      {/* link to the weather board */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 border-t border-b border-r border-blue-700 rounded-r-2xl px-4 py-2 flex flex-col items-center justify-center min-w-[100px] max-w-[160px] h-16 md:h-20 shadow-md">
        <span className="text-white text-lg md:text-xl font-bold tracking-wide">
          {/* link to the weather board */}
          <a href="/weather" className="underline">
            Weather Board
          </a>
        </span>
      </div>
    </div>
  );
};

export default WeatherBox;
