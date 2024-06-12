import { Alert } from 'react-native';

const fetchWeatherData = async (cityName, dayOffset, setWeather, setLoading) => {
  try {
    setLoading(true);
    const apiKey = '3de85e63751b1674d27cc0253974fe6a';
    const encodedCityName = encodeURIComponent(cityName);
    let url;
    
    if (dayOffset > 0) {
      // 내일이나 모레의 날씨 정보를 가져오는 경우
      const cnt = dayOffset === 2 ? 16 : 8;  // 모레까지 필요한 경우 16개, 내일까지는 8개
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCityName}&appid=${apiKey}&units=metric&lang=kr&cnt=${cnt}`;
    } else {
      // 현재 날씨 정보를 가져오는 경우
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCityName}&appid=${apiKey}&units=metric&lang=kr`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      let weatherData;
      if (dayOffset > 0) {
        const index = dayOffset === 2 ? 8 : 0; // 모레의 첫 번째 데이터는 list[8], 내일은 list[0]
        weatherData = { ...data.list[index], name: data.city.name };
      } else {
        weatherData = data;
      }
      setWeather(weatherData);
    } else {
      Alert.alert('오류', `날씨 데이터를 가져오지 못했습니다: ${data.message}`);
    }
  } catch (error) {
    console.error('날씨 데이터를 가져오는 중 오류가 발생했습니다:', error);
    Alert.alert('오류', '날씨 데이터를 가져오지 못했습니다. 다시 시도해주세요.');
  } finally {
    setLoading(false);
  }
};

export { fetchWeatherData };
