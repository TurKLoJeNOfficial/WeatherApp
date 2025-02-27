import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, Text, FlatList, View } from 'react-native';
import * as Location from 'expo-location';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import WeeklyForecastDisplay from './components/WeeklyForecastDisplay';
import ErrorPopup from './components/ErrorPopup';
import ErrorDisplay from './components/ErrorDisplay';
import { fetchWeather, fetchWeatherByCoords, fetchWeeklyForecast } from './utils/api';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const getLocationAndWeather = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setError('Konum izni reddedildi! Varsayılan: İstanbul');
      fetchDefaultWeather();
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const weather = await fetchWeatherByCoords(latitude, longitude);
    const forecast = await fetchWeeklyForecast('Istanbul'); // Örnek: İstanbul
    setWeatherData(weather);
    setForecastData(forecast);
  };

  const fetchDefaultWeather = async () => {
    const weather = await fetchWeather('Istanbul');
    const forecast = await fetchWeeklyForecast('Istanbul');
    setWeatherData(weather);
    setForecastData(forecast);
  };

  const handleSearch = async (city) => {
    if (!city) return;

    setLoading(true);
    setError(null);

    const weather = await fetchWeather(city);
    const forecast = await fetchWeeklyForecast(city);

    if (weather.error) {
      setError(weather.message);
      setShowPopup(true); // Popup'ı göster
      setWeatherData(null);
    } else {
      setWeatherData(weather);
      setForecastData(forecast);
    }

    setLoading(false);
  };

  useEffect(() => {
    getLocationAndWeather();
  }, []);

  // FlatList için veri listesi
  const renderData = [
    { key: 'searchBar', component: <SearchBar onSearch={handleSearch} /> },
    { key: 'loading', component: loading && <ActivityIndicator size="large" color="#2196F3" style={styles.loading} /> },
    { key: 'error', component: error && <ErrorDisplay /> },
    { key: 'weather', component: weatherData && <WeatherDisplay data={weatherData} /> },
    { key: 'forecast', component: forecastData && !error && <ForecastDisplay forecastData={forecastData} /> },
    { key: 'weeklyForecast', component: forecastData && !error && <WeeklyForecastDisplay forecastData={forecastData} /> },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* FlatList ile tüm içeriği göster */}
      <FlatList
        data={renderData}
        renderItem={({ item }) => item.component}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.scrollContent}
      />

      {/* Hata Popup'ı */}
      <ErrorPopup
        visible={showPopup}
        message="Böyle bir şehir bulunamadı. Lütfen tekrar deneyiniz."
        onClose={() => setShowPopup(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40, // Kaydırma alanı için boşluk
  },
  loading: {
    marginTop: 50,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
    fontSize: 16,
  },
});