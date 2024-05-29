import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import Locations from '../components/Locations';

const MainPage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      const apiKey = '53ce3fbfe2586eca2a0d0ddae22543b9';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=kr&cnt=7`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // 에러가 발생했을 때 알림 표시
      Alert.alert('Error', 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationFound = (cityName) => {
    if (cityName !== 'City not found') {
      setCity(cityName);
      fetchWeatherData(cityName);
    } else {
      // 검색 내역이 없는 경우 알림 표시
      Alert.alert('Error', 'City not found. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={() => fetchWeatherData(city)} // Enter 키를 누르면 호출됨
      />
      <Locations onLocationFound={handleLocationFound} />
      <Button
        title="Get Weather"
        onPress={() => fetchWeatherData(city)}
        disabled={!city || loading}
      />
      {loading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}
      {weather && weather.main && ( // weather 및 weather.main이 존재하는지 확인
        <View style={styles.weatherInfo}>
          <Text style={styles.temperature}>Current: {Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.temperature}>High: {Math.round(weather.main.temp_max)}°C</Text>
          <Text style={styles.temperature}>Low: {Math.round(weather.main.temp_min)}°C</Text>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
  weatherInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  city: {
    fontSize: 24,
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
  },
});

export default MainPage;