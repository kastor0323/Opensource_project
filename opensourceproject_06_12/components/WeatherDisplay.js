import { StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const WeatherDisplay = ({ weather, dayOffset, getTemperatureData, loading }) => {
  // 현재, 내일 또는 모레 날짜를 가져오는 함수
  const getDate = (offset = 0) => {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + offset);
    const month = targetDate.getMonth() + 1;
    const date = targetDate.getDate();
    return `${month}월 ${date}일`;
  };

  // 제목을 설정하는 함수
  const getTitle = () => {
    if (dayOffset === 2) {
      return `모레 (${getDate(2)})`;
    } else if (dayOffset === 1) {
      return `내일 (${getDate(1)})`;
    } else {
      return `오늘 (${getDate()})`;
    }
  };

  return (
    <View style={styles.weatherInfo}>
      <Text style={styles.currentDate}>{getTitle()}</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 20,
  },
  city: {
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default WeatherDisplay;
