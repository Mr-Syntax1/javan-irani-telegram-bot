import { getWeatherDescription } from "../utilities/getWeatherCodes.js";


const TABRIZ_LAT = 38.0800;
const TABRIZ_LON = 46.2919;

export const getWeather = async () => {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${TABRIZ_LAT}&longitude=${TABRIZ_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia/Tehran`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        return {
            city: 'تبریز',
            temp: Math.round(data.current.temperature_2m),
            feelsLike: Math.round(data.current.apparent_temperature),
            humidity: data.current.relative_humidity_2m,
            windSpeed: Math.round(data.current.wind_speed_10m),
            weatherCode: data.current.weather_code,
            description: getWeatherDescription(data.current.weather_code),
        };
    } catch (err) {
        console.error('❌ خطا در دریافت آب و هوا:', err.message);
        throw err;
    }
};

