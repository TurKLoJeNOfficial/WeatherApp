// utils/api.js
import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig.extra.OPEN_WEATHER_API_KEY; // app.json'dan alınacak
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

// Şehir adına göre hava durumu
export const fetchWeather = async (city) => {
    try {
        const response = await axios.get(
            `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric&lang=tr`
        );
        return response.data;
    } catch (error) {
        return { error: true, message: 'Şehir bulunamadı!' };
    }
};

// Koordinatlara göre hava durumu
export const fetchWeatherByCoords = async (lat, lon) => {
    try {
        const response = await axios.get(
            `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`
        );
        return response.data;
    } catch (error) {
        return { error: true, message: 'Konum verisi alınamadı!' };
    }
};

// Haftalık tahmin
export const fetchWeeklyForecast = async (city) => {
    try {
        const response = await axios.get(
            `${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric&lang=tr`
        );
        return response.data;
    } catch (error) {
        return { error: true, message: 'Tahmin verisi alınamadı!' };
    }
};