// components/WeatherDisplay.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const weatherIcons = {
    Clear: 'weather-sunny',
    Clouds: 'weather-cloudy',
    Rain: 'weather-rainy',
    Snow: 'weather-snowy',
    Thunderstorm: 'weather-lightning',
    Drizzle: 'weather-pouring',
};

const WeatherDisplay = ({ data }) => {
    if (!data || data.error) return null;

    const iconName = weatherIcons[data.weather[0].main] || 'weather-cloudy';

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                name={iconName}
                size={120}
                color="#2196F3"
                style={styles.icon}
            />
            <Text style={styles.city}>{data.name}</Text>
            <Text style={styles.temperature}>{Math.round(data.main.temp)}°C</Text>
            <Text style={styles.description}>{data.weather[0].description}</Text>
            <View style={styles.details}>
                <Text style={styles.detailText}>Nem: {data.main.humidity}%</Text>
                <Text style={styles.detailText}>Rüzgar: {data.wind.speed} m/s</Text>
                <Text style={styles.detailText}>Basınç: {data.main.pressure} hPa</Text>
                <Text style={styles.detailText}>Hissedilen: {data.main.feels_like}°C</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 30,
    },
    city: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 10,
    },
    temperature: {
        fontSize: 48,
        fontWeight: '300',
        color: '#2196F3',
    },
    description: {
        fontSize: 20,
        color: '#666',
        textTransform: 'capitalize',
        marginVertical: 10,
    },
    details: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
        marginTop: 20,
    },
    detailText: {
        fontSize: 16,
        color: '#444',
    },
    icon: {
        marginBottom: 20,
    },
});

export default WeatherDisplay;