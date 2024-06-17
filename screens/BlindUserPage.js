import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';
import WeatherInput from '../components/WeatherInput';
import WeatherDisplay from '../components/WeatherDisplay';
import Locations from '../components/Locations';
import { fetchWeatherData } from '../API/WeatherAPI';
import { speakWeather } from '../components/SpeechWeather';

const BlindUserPage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dayOffset, setDayOffset] = useState(0); // 0: 오늘, 1: 내일, 2: 모레

  const handleLocationFound = (cityName) => {
    if (cityName !== 'City not found') {
      setCity(cityName);
      fetchWeatherData(cityName, dayOffset, setWeather, setLoading);
    } else {
      Alert.alert('Error', 'City not found. Please try again.');
    }
  };

  const getTemperatureData = () => {
    if (!weather || !weather.main) return null;
    return {
      labels: ['현재', '최고', '최저'],
      datasets: [
        {
          data: [
            weather.main.temp,
            weather.main.temp_max,
            weather.main.temp_min,
          ],
        },
      ],
    };
  };

  const fetchWeatherForDayOffset = (offset) => {
    setDayOffset(offset);
    fetchWeatherData(city, offset, setWeather, setLoading);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <WeatherInput city={city} setCity={setCity} fetchWeatherData={(city) => fetchWeatherData(city, dayOffset, setWeather, setLoading)} loading={loading} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => fetchWeatherForDayOffset(0)} 
            disabled={!city || loading} 
          >
            <Text style={styles.buttonText}>현재 날씨</Text>
          </TouchableOpacity>
          <Locations onLocationFound={handleLocationFound} />
          <TouchableOpacity 
            style={styles.button}
            onPress={() => fetchWeatherForDayOffset(1)} 
            disabled={!city || loading} 
          >
            <Text style={styles.buttonText}>내일 날씨</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => fetchWeatherForDayOffset(2)} 
            disabled={!city || loading} 
          >
            <Text style={styles.buttonText}>모레 날씨</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => speakWeather(weather, dayOffset)}
            disabled={!city || loading}
          >
            <Text style={styles.buttonText}>날씨 읽어주기</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}
      {weather && weather.main && (
        <WeatherDisplay
          weather={weather}
          dayOffset={dayOffset}
          getTemperatureData={getTemperatureData}
          loading={loading}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  topContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // 버튼들을 한 줄에 넣고 공간이 부족하면 다음 줄로 넘어가게 합니다.
    justifyContent: 'center', // 가로로 가운데 정렬합니다.
    width: '100%', // 부모 컨테이너의 폭을 100%로 설정합니다.
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'yellow',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },
});

export default BlindUserPage;
