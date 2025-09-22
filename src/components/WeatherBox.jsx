import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const DEFAULT_CITY = "Hyderabad";

const WeatherBox = ({ horizontalMobile = false, fullHeight = false }) => {
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
    <div
      className={`w-full ${fullHeight ? "h-full" : ""} flex ${
        horizontalMobile
          ? "flex-row justify-center"
          : fullHeight
          ? "flex-col justify-center"
          : "flex-col md:flex-row justify-center md:justify-end"
      } gap-0 items-stretch ${
        fullHeight ? "" : horizontalMobile ? "my-2 mb-6" : "my-2"
      }`}
    >
      {/* Weather Info Box */}
      <div
        className={`${
          horizontalMobile
            ? "bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 backdrop-blur-sm border-2 border-green-300/60 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-green-400/80"
            : "bg-white border border-green-200 shadow-md"
        } ${
          fullHeight ? "rounded-xl" : "rounded-l-2xl"
        } px-4 py-4 flex flex-col justify-center ${
          horizontalMobile
            ? "min-w-[180px] max-w-[220px]"
            : fullHeight
            ? "w-full flex-1"
            : "min-w-[220px] max-w-[300px] flex-1"
        } ${
          fullHeight ? "h-full min-h-[200px]" : "h-24 md:h-32"
        } overflow-hidden`}
      >
        {loading ? (
          horizontalMobile ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse delay-200"></div>
              <span className="text-transparent bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-sm font-semibold ml-2">
                {t("weather.loading", "Loading weather...")}
              </span>
            </div>
          ) : (
            <div className="text-green-700 text-sm text-center">
              {t("weather.loading", "Loading weather...")}
            </div>
          )
        ) : error ? (
          horizontalMobile ? (
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-white text-lg">⚠️</span>
              </div>
              <div className="text-transparent bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-sm font-medium">
                {error}
              </div>
            </div>
          ) : (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )
        ) : weather ? (
          <div className={`${fullHeight ? "space-y-4" : "space-y-1"} w-full`}>
            {/* Weather Icon and Main Info */}
            {fullHeight && (
              <div className="text-center mb-4">
                {weather.icon &&
                  (horizontalMobile ? (
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full blur-xl opacity-30 scale-150"></div>
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                        alt={weather.condition}
                        className="w-20 h-20 mx-auto mb-2 relative z-10 drop-shadow-lg"
                      />
                    </div>
                  ) : (
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                      alt={weather.condition}
                      className="w-20 h-20 mx-auto mb-2"
                    />
                  ))}
                <div
                  className={
                    horizontalMobile
                      ? "text-4xl font-black text-transparent bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text mb-2 tracking-tight"
                      : "text-3xl font-bold text-green-800 mb-1"
                  }
                >
                  {weather.temp}°C
                </div>
                <div
                  className={
                    horizontalMobile
                      ? "text-lg font-semibold text-transparent bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text capitalize tracking-wide"
                      : "text-lg font-medium text-gray-700 capitalize"
                  }
                >
                  {weather.condition}
                </div>
              </div>
            )}

            <div
              className={
                horizontalMobile
                  ? "flex items-center justify-between w-full bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-lg px-2 py-1"
                  : "flex items-center justify-between w-full"
              }
            >
              <span
                className={`${
                  horizontalMobile
                    ? "font-bold text-transparent bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text"
                    : "font-semibold text-green-800"
                } ${fullHeight ? "text-sm" : "text-xs md:text-sm"}`}
              >
                {horizontalMobile ? "📍 " : ""}
                {t("weather.location", "Location")}:
              </span>
              <span
                className={`${
                  horizontalMobile ? "font-semibold" : "font-normal"
                } text-gray-700 ${
                  fullHeight ? "text-sm" : "text-xs md:text-sm"
                } truncate ${
                  fullHeight
                    ? "max-w-[150px]"
                    : "max-w-[100px] md:max-w-[120px]"
                }`}
              >
                {weather.location}
              </span>
            </div>

            {!fullHeight && (
              <>
                <div
                  className={
                    horizontalMobile
                      ? "flex items-center justify-between w-full bg-gradient-to-r from-blue-50/50 to-sky-50/50 rounded-lg px-2 py-1"
                      : "flex items-center justify-between w-full"
                  }
                >
                  <span
                    className={
                      horizontalMobile
                        ? "font-bold text-transparent bg-gradient-to-r from-blue-700 to-sky-600 bg-clip-text text-xs md:text-sm"
                        : "font-semibold text-green-800 text-xs md:text-sm"
                    }
                  >
                    {horizontalMobile ? "🌡️ " : ""}
                    {t("weather.temperature", "Temperature")}:
                  </span>
                  <span
                    className={
                      horizontalMobile
                        ? "font-bold text-blue-700 text-xs md:text-sm"
                        : "font-normal text-gray-700 text-xs md:text-sm"
                    }
                  >
                    {weather.temp}°C
                  </span>
                </div>
                <div
                  className={
                    horizontalMobile
                      ? "flex items-center justify-between w-full bg-gradient-to-r from-purple-50/50 to-indigo-50/50 rounded-lg px-2 py-1"
                      : "flex items-center justify-between w-full"
                  }
                >
                  <span
                    className={
                      horizontalMobile
                        ? "font-bold text-transparent bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-xs md:text-sm"
                        : "font-semibold text-green-800 text-xs md:text-sm"
                    }
                  >
                    {horizontalMobile ? "☁️ " : ""}
                    {t("weather.condition", "Weather")}:
                  </span>
                  <div className="flex items-center space-x-1">
                    <span
                      className={`${
                        horizontalMobile
                          ? "font-semibold text-purple-700 capitalize"
                          : "font-normal text-gray-700"
                      } text-xs md:text-sm truncate max-w-[60px] md:max-w-[80px]`}
                    >
                      {weather.condition}
                    </span>
                    {weather.icon && (
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt={weather.condition}
                        className={`w-5 h-5 md:w-6 md:h-6 flex-shrink-0 ${
                          horizontalMobile ? "drop-shadow-md" : ""
                        }`}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : null}

        {/* Weather Board Link - Integrated when fullHeight */}
        {fullHeight && (
          <div className="mt-6 pt-4 border-t border-green-200">
            <a
              href="/weather"
              className={
                horizontalMobile
                  ? "block w-full text-center py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-sky-600 text-white font-bold rounded-xl hover:from-blue-600 hover:via-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 tracking-wide"
                  : "block w-full text-center py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              }
            >
              {horizontalMobile ? "✨ " : ""}
              {t("weather.board", "Weather Board")}
            </a>
          </div>
        )}
      </div>

      {/* More Info Box - Only show when not fullHeight */}
      {!fullHeight && (
        <div
          className={`${
            horizontalMobile
              ? "bg-gradient-to-br from-blue-500 via-blue-600 to-sky-700 border-2 border-blue-600/80 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-400"
              : "bg-gradient-to-br from-blue-500 to-blue-700 border-t border-b border-r border-blue-700 shadow-md"
          } rounded-r-2xl px-3 py-3 flex items-center justify-center ${
            horizontalMobile
              ? "min-w-[120px] max-w-[140px]"
              : "min-w-[140px] max-w-[170px]"
          } h-24 md:h-32`}
        >
          <div className="text-center">
            {horizontalMobile && (
              <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center backdrop-blur-sm">
                <span className="text-white text-lg">🌤️</span>
              </div>
            )}
            <a
              href="/weather"
              className={
                horizontalMobile
                  ? "text-white text-sm md:text-base font-bold tracking-wide hover:text-blue-100 transition-colors duration-200 hover:scale-110 transform inline-block"
                  : "text-white text-sm md:text-base font-bold tracking-wide underline hover:text-blue-100 transition-colors duration-200"
              }
            >
              {t("weather.board", "Weather Board")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherBox;
