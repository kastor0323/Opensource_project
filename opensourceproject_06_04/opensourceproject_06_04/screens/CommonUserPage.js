import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Alert, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Locations from '../components/Locations';

const CommonUserPage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      const apiKey = '53ce3fbfe2586eca2a0d0ddae22543b9';
      const encodedCityName = encodeURIComponent(cityName);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCityName}&appid=${apiKey}&units=metric&lang=kr&cnt=7`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
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
      <TextInput
        style={styles.input}
        placeholder="도시 이름을 입력하세요"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={() => fetchWeatherData(city)}
      />
      <Locations onLocationFound={handleLocationFound} />
      <Button
        title="날씨 확인"
        onPress={() => fetchWeatherData(city)}
        disabled={!city || loading}
      />
      {loading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}
      {weather && weather.main && (
        <View style={styles.weatherInfo}>
          <Text style={styles.temperature}>현재 기온: {Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.temperature}>최고 기온: {Math.round(weather.main.temp_max)}°C</Text>
          <Text style={styles.temperature}>최저 기온: {Math.round(weather.main.temp_min)}°C</Text>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
          <LineChart
            data={getTemperatureData()}
            width={Dimensions.get('window').width - 40} // 차트 너비
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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

export default CommonUserPage;
