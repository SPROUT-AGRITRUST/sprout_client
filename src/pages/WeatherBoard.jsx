import React, { useEffect, useState } from "react";
import BackToHomeButton from "../components/BackToHomeButton";
import { useTranslation } from "react-i18next";

// Replace this with your actual OpenWeather API key
// const OPENWEATHER_API_KEY = "d6ddb3a31c34d60d3b545cf70d6ede5a";
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const WeatherBoard = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState(null);
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch current weather data
  const fetchCurrentWeather = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=en`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch current weather");
      const data = await res.json();
      setCurrent({
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind_speed: data.wind.speed,
        visibility: data.visibility,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        description: data.weather[0].description,
        main: data.weather[0].main,
        name: data.name,
        country: data.sys.country,
      });
    } catch (err) {
      setError(
        t("weatherBoard.errorCurrent", "Could not load current weather.")
      );
    }
  };

  // Fetch 5-day forecast data
  const fetchForecast = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&cnt=40`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch forecast");
      const data = await res.json();

      const days = {};
      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!days[date]) days[date] = [];
        days[date].push(item);
      });

      const forecastArr = Object.keys(days)
        .slice(0, 5)
        .map((date) => {
          const midday = days[date][Math.floor(days[date].length / 2)];
          return {
            date,
            temp: Math.round(midday.main.temp),
            main: midday.weather[0].main,
            desc: midday.weather[0].description,
            humidity: midday.main.humidity,
            pressure: midday.main.pressure,
            wind_speed: midday.wind.speed,
          };
        });

      setForecast(forecastArr);
    } catch (err) {
      setError(t("weatherBoard.errorForecast", "Could not load forecast."));
    }
  };

  // Get user's location and fetch data
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ lat: latitude, lon: longitude });
          fetchCurrentWeather(latitude, longitude);
          fetchForecast(latitude, longitude);
          setLoading(false);
        },
        () => {
          setError(
            t("weatherBoard.errorLocationDenied", "Location permission denied.")
          );
          setLoading(false);
        }
      );
    } else {
      setError(
        t("weatherBoard.errorGeolocation", "Geolocation not supported.")
      );
      setLoading(false);
    }
  }, []);

  // Convert timestamp to time string
  const formatTime = (unix) => {
    return new Date(unix * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Choose an icon based on weather
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
      case "Drizzle":
        return "🌧️";
      case "Thunderstorm":
        return "⛈️";
      case "Snow":
        return "❄️";
      default:
        return "🌤️";
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
      {/* Back to home component */}
      <div className="flex justify-center md:justify-start mb-4">
        <BackToHomeButton />
      </div>
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
        🌍 {t("weatherBoard.title", "Weather Dashboard")}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-32">
          <div className="text-center text-blue-700">
            {t("weather.loading", "Loading...")}
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-32">
          <div className="text-center text-red-600 max-w-md mx-auto px-4">
            {error}
          </div>
        </div>
      ) : (
        <>
          {current && (
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 w-full max-w-4xl mx-auto mb-8">
              <h2 className="text-lg md:text-xl font-bold text-blue-800 mb-4 text-center truncate">
                {t("weatherBoard.currentWeatherIn", "Current Weather in")}{" "}
                {current.name}, {current.country}
              </h2>
              <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between md:items-start">
                <div className="text-4xl md:text-5xl flex-shrink-0">
                  {getWeatherIcon(current.main)}
                </div>
                <div className="text-center md:text-left flex-shrink-0">
                  <div className="text-2xl md:text-3xl font-bold">
                    {current.temp}°C
                  </div>
                  <div className="capitalize text-blue-600 text-sm md:text-base">
                    {current.description}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 text-xs md:text-sm text-blue-700 max-w-full">
                  <div className="truncate">Feels: {current.feels_like}°C</div>
                  <div className="truncate">Humidity: {current.humidity}%</div>
                  <div className="truncate">
                    Pressure: {Math.round(current.pressure)} hPa
                  </div>
                  <div className="truncate">Wind: {current.wind_speed} m/s</div>
                  <div className="truncate">
                    Visibility: {Math.round(current.visibility / 1000)} km
                  </div>
                  <div className="truncate">
                    Sunrise: {formatTime(current.sunrise)}
                  </div>
                  <div className="truncate md:col-span-1">
                    Sunset: {formatTime(current.sunset)}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 w-full max-w-6xl mx-auto">
            <h2 className="text-lg md:text-xl font-semibold text-blue-800 mb-4 text-center">
              {t("weatherBoard.forecastFor", "5-Day Forecast")}
            </h2>
            <div className="flex flex-col items-center md:grid md:grid-cols-5 gap-3 md:gap-4">
              {forecast.map((day) => (
                <div
                  key={day.date}
                  className="bg-blue-50 rounded-xl p-3 md:p-4 text-center shadow border border-blue-200 w-full max-w-sm md:max-w-none min-h-[180px] md:min-h-[200px] flex flex-col justify-between"
                >
                  <div className="text-xl md:text-2xl">
                    {getWeatherIcon(day.main)}
                  </div>
                  <div className="font-bold text-blue-900 mt-2 text-xs md:text-sm truncate">
                    {new Date(day.date).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-base md:text-lg text-blue-700 font-semibold">
                    {day.temp}°C
                  </div>
                  <div className="capitalize text-blue-600 text-xs md:text-sm truncate px-1">
                    {day.desc}
                  </div>
                  <div className="mt-2 space-y-0.5">
                    <div className="text-xs text-blue-800 truncate">
                      Humidity: {day.humidity}%
                    </div>
                    <div className="text-xs text-blue-800 truncate">
                      Wind: {Math.round(day.wind_speed * 10) / 10} m/s
                    </div>
                    <div className="text-xs text-blue-800 truncate">
                      Pressure: {Math.round(day.pressure)} hPa
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherBoard;
