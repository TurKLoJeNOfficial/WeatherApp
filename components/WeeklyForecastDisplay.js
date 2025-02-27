// components/WeeklyForecastDisplay.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const WeeklyForecastDisplay = ({ forecastData }) => {
    if (!forecastData || !forecastData.list) return null;

    // Günlük verileri grupla
    const dailyData = forecastData.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString('tr-TR', { weekday: 'long' });
        if (!acc[date]) {
            acc[date] = {
                date,
                temp: item.main.temp,
                description: item.weather[0].description,
            };
        }
        return acc;
    }, {});

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.day}>{item.date}</Text>
            <Text style={styles.temp}>{Math.round(item.temp)}°C</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>1 Haftalık Tahmin</Text>
            <FlatList
                data={Object.values(dailyData)}
                renderItem={renderItem}
                keyExtractor={(item) => item.date}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2196F3',
        marginBottom: 10,
        paddingLeft: 10,
    },
    item: {
        backgroundColor: '#f0f8ff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    day: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    temp: {
        fontSize: 16,
        color: '#2196F3',
        marginVertical: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        textTransform: 'capitalize',
    },
});

export default WeeklyForecastDisplay;