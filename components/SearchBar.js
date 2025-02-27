import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState('');

    // Klavyeden Enter tuşuna basıldığında çalışır
    const handleSubmit = () => {
        onSearch(input); // Arama fonksiyonunu çağır
    };

    return (
        <View style={styles.container}>
            <Ionicons name="search" size={24} color="#666" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="Şehir adı yazın..."
                placeholderTextColor="#666"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={handleSubmit} // Enter tuşu için
                returnKeyType="search" // Klavyede "Ara" butonu göster
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit} // Ok tuşu için
            >
                <Ionicons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
        paddingHorizontal: 15,
        margin: 20,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 20,
    },
    icon: {
        opacity: 0.7,
    },
});

export default SearchBar;