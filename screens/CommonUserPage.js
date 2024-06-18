import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';
import WeatherInput from '../components/WeatherInput';
import WeatherDisplay from '../components/WeatherDisplay';
import Locations from '../components/Locations';
import { fetchWeatherData } from '../API/WeatherAPI';
import { speakWeather } from '../components/SpeechWeather';

const CommonUserPage = () => {
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
  const labels = ['9AM', '12PM', '3PM', '6PM', '9PM', '12AM'];
  const temperatureData = [22, 24, 23, 25, 24, 22]; // 실제 데이터로 대체
  const feelsLikeData = [20, 23, 21, 24, 22, 20]; // 체감 온도 데이터로 대체

  return {
    labels: labels,
    datasets: [
      {
        data: temperatureData,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: feelsLikeData,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // 체감 온도 데이터는 빨간색으로 설정
        strokeWidth: 2,
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

export default CommonUserPage;
