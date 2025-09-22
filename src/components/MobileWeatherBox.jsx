import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Thermometer, Cloud } from "lucide-react";

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const DEFAULT_CITY = "Hyderabad";

const MobileWeatherBox = () => {
  const { t } = useTranslation();
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
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
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
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
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

  if (loading) {
    return (
      <div className="w-full h-16 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-200 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-blue-700 text-sm font-medium">
            {t("weather.loading", "Loading weather...")}
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200 flex items-center justify-center">
        <span className="text-red-600 text-sm font-medium">{error}</span>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="w-full h-16 bg-gradient-to-r from-blue-500 to-sky-600 rounded-xl shadow-lg overflow-hidden">
      <div className="flex items-center h-full px-4">
        {/* Weather Icon */}
        <div className="flex-shrink-0 mr-3">
          {weather.icon ? (
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.condition}
              className="w-10 h-10"
            />
          ) : (
            <Cloud className="w-8 h-8 text-white" />
          )}
        </div>

        {/* Main Weather Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            {/* Location */}
            <div className="flex items-center space-x-1 min-w-0">
              <MapPin className="w-3 h-3 text-blue-100 flex-shrink-0" />
              <span className="text-white text-sm font-medium truncate max-w-[80px]">
                {weather.location}
              </span>
            </div>

            {/* Temperature */}
            <div className="flex items-center space-x-1 flex-shrink-0">
              <Thermometer className="w-3 h-3 text-blue-100" />
              <span className="text-white text-lg font-bold">
                {weather.temp}°C
              </span>
            </div>
          </div>

          {/* Condition and Additional Info */}
          <div className="flex items-center justify-between mt-1">
            <span className="text-blue-100 text-xs capitalize truncate max-w-[100px]">
              {weather.condition}
            </span>

            {/* Quick Stats */}
            <div className="flex items-center space-x-3 text-blue-100 text-xs">
              <span>💧{weather.humidity}%</span>
              <span>💨{Math.round(weather.windSpeed)}m/s</span>
            </div>
          </div>
        </div>

        {/* Weather Board Link */}
        <div className="flex-shrink-0 ml-3">
          <a
            href="/weather"
            className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-1.5 text-white text-xs font-semibold hover:bg-white/30 transition-all duration-200"
          >
            {t("weather.more", "More")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileWeatherBox;
