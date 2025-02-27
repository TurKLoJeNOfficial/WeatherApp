// components/ErrorDisplay.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ErrorDisplay = () => {
    return (
        <View style={styles.container}>
            <MaterialIcons name="sentiment-very-dissatisfied" size={80} color="#666" />
            <Text style={styles.message}>Şehir bulunamadı. Lütfen tekrar deneyiniz.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    message: {
        fontSize: 18,
        color: '#666',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default ErrorDisplay;