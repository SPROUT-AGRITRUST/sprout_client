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
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xl mx-auto mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4 text-center">
                {t("weatherBoard.currentWeatherIn", "Current Weather in")}{" "}
                {current.name}, {current.country}
              </h2>
              <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
                <div className="text-5xl">{getWeatherIcon(current.main)}</div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold">{current.temp}°C</div>
                  <div className="capitalize text-blue-600">
                    {current.description}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-blue-700 justify-self-center md:justify-self-auto">
                  <div>Feels Like: {current.feels_like}°C</div>
                  <div>Humidity: {current.humidity}%</div>
                  <div>Pressure: {current.pressure} hPa</div>
                  <div>Wind: {current.wind_speed} m/s</div>
                  <div>Visibility: {current.visibility / 1000} km</div>
                  <div>Sunrise: {formatTime(current.sunrise)}</div>
                  <div>Sunset: {formatTime(current.sunset)}</div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-blue-800 mb-4 text-center">
              {t("weatherBoard.forecastFor", "5-Day Forecast")}
            </h2>
            <div className="flex flex-col items-center md:grid md:grid-cols-5 gap-4">
              {forecast.map((day) => (
                <div
                  key={day.date}
                  className="bg-blue-50 rounded-xl p-4 text-center shadow border border-blue-200 w-full max-w-sm md:max-w-none"
                >
                  <div className="text-2xl">{getWeatherIcon(day.main)}</div>
                  <div className="font-bold text-blue-900 mt-2">
                    {new Date(day.date).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-lg text-blue-700">{day.temp}°C</div>
                  <div className="capitalize text-blue-600 text-sm">
                    {day.desc}
                  </div>
                  <div className="text-xs mt-2 text-blue-800">
                    Humidity: {day.humidity}%
                  </div>
                  <div className="text-xs text-blue-800">
                    Wind: {day.wind_speed} m/s
                  </div>
                  <div className="text-xs text-blue-800">
                    Pressure: {day.pressure} hPa
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
