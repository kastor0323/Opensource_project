
import { StyleSheet, Text, View, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const WeatherDisplay = ({ weather, showTomorrow, setShowTomorrow, getTemperatureData, loading }) => {
  // 현재 또는 내일 날짜를 가져오는 함수
  const getDate = (isTomorrow = false) => {
    const today = new Date();
    const targetDate = new Date(today);
    if (isTomorrow) {
      targetDate.setDate(today.getDate() + 1);
    }
    const month = targetDate.getMonth() + 1;
    const date = targetDate.getDate();
    return `${month}월 ${date}일`;
  };

  return (
    <View style={styles.weatherInfo}>
      <Text style={styles.currentDate}>{showTomorrow ? `내일 (${getDate(true)})` : `오늘 (${getDate()})`}</Text>
      <Text style={styles.temperature}>현재 기온: {Math.round(weather.main.temp)}°C</Text>
      <Text style={styles.temperature}>최고 기온: {Math.round(weather.main.temp_max)}°C</Text>
      <Text style={styles.temperature}>최저 기온: {Math.round(weather.main.temp_min)}°C</Text>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>
      <LineChart
        data={getTemperatureData()}
        width={Dimensions.get('window').width - 40}
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
  );
};

const styles = StyleSheet.create({
  weatherInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  currentDate: {
    fontSize: 24,
    fontWeight: 'bold',
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

export default WeatherDisplay;
