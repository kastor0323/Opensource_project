import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import fetchWeatherData from './components/FetchWeatherData'

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchWeatherData = useCallback(() => {
    fetchWeatherData(city, setWeather, setLoading);
  }, [city]);

  const handleInputSubmit = () => {
    if (city && !loading) {
      handleFetchWeatherData();
    }
  };

  const getTemperatureColor = (temp) => { //todo : 온도 세분화를 통해서 색깔을 더 다양화화
    if (temp >= 0 && temp <= 22) {
      return '#00ff00'; // 초록색
    } else if (temp < 0) {
      return '#0000ff'; // 파란색
    } else {
      return '#ff6347'; // 빨간색
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={handleInputSubmit}
      />
      <Button
        title="Get Weather"
        onPress={handleFetchWeatherData}
        disabled={!city || loading}
      />
      {loading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}
      {weather && (
        <View style={styles.weatherInfo}>
          <View style={styles.temperatureContainer}>
            <View style={[styles.temperatureBar, { height: Math.abs(weather.main.temp) * 3, backgroundColor: getTemperatureColor(weather.main.temp) }]} />
            <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
          </View>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    width: '80%',
    height: 60, // 폰트 크기와 이미지 크기 조정을 위해 TextInput의 높이를 크게 조정합니다.
    fontSize: 20, // 폰트 크기를 크게 조정합니다.
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15, // 수평 여백을 늘립니다.
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
  weatherInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  temperatureContainer: {
    alignItems: 'center',
  },
  temperatureBar: {
    width: 40, // 이미지 크기를 크게 조정합니다.
    height: 20, // 이미지 크기를 크게 조정합니다.
    marginBottom: 10, // 수직 여백을 늘립니다.
    borderRadius: 5,
  },
  temperature: {
    fontSize: 30, // 폰트 크기를 크게 조정합니다.
    fontWeight: 'bold',
  },
  city: {
    fontSize: 30, // 폰트 크기를 크게 조정합니다.
    marginVertical: 15, // 수직 여백을 늘립니다.
  },
  description: {
    fontSize: 24, // 폰트 크기를 크게 조정합니다.
  },
});
