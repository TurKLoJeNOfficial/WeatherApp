// components/ForecastDisplay.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ForecastDisplay = ({ forecastData }) => {
    if (!forecastData || !forecastData.list) return null;

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.time}>{new Date(item.dt * 1000).toLocaleTimeString('tr-TR', { hour: '2-digit' })}</Text>
            <Text style={styles.temp}>{Math.round(item.main.temp)}°C</Text>
            <Text style={styles.description}>{item.weather[0].description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>24 Saatlik Tahmin</Text>
            <FlatList
                horizontal
                data={forecastData.list.slice(0, 8)} // İlk 8 veri (24 saat)
                renderItem={renderItem}
                keyExtractor={(item) => item.dt.toString()}
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
        marginHorizontal: 5,
        alignItems: 'center',
    },
    time: {
        fontSize: 16,
        color: '#333',
    },
    temp: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2196F3',
        marginVertical: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        textTransform: 'capitalize',
    },
});

export default ForecastDisplay;