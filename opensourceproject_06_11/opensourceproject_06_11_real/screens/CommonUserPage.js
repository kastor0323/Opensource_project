import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Text } from 'react-native';
import WeatherInput from '../components/WeatherInput';
import WeatherDisplay from '../components/WeatherDisplay';
import Locations from '../components/Locations';
import { fetchWeatherData } from '../API/WeatherAPI';

const CommonUserPage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTomorrow, setShowTomorrow] = useState(false);

  const handleLocationFound = (cityName) => {
    if (cityName !== 'City not found') {
      setCity(cityName);
      fetchWeatherData(cityName, showTomorrow, setWeather, setLoading);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <WeatherInput 
          city={city} 
          setCity={setCity} 
          fetchWeatherData={(city) => fetchWeatherData(city, showTomorrow, setWeather, setLoading)} 
          loading={loading} 
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => fetchWeatherData(city, false, setWeather, setLoading)} 
            disabled={!city || loading} 
          >
            <Text style={styles.buttonText}>현재 날씨</Text>
          </TouchableOpacity>
          <Locations onLocationFound={handleLocationFound} />
          <TouchableOpacity 
            style={styles.button}
            onPress={() => setShowTomorrow(!showTomorrow)} 
            disabled={!city || loading} 
          >
            <Text style={styles.buttonText}>내일 날씨</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}
      {weather && weather.main && (
        <WeatherDisplay
          weather={weather}
          showTomorrow={showTomorrow}
          setShowTomorrow={setShowTomorrow}
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
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor : "yellow"
  },
  buttonText: {
    color: 'red',
    fontSize : 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CommonUserPage;
