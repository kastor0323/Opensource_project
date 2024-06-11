import { Alert } from 'react-native';

const fetchWeatherData = async (cityName, showTomorrow, setWeather, setLoading) => {
  try {
    setLoading(true);
    const apiKey = '53ce3fbfe2586eca2a0d0ddae22543b9';
    const encodedCityName = encodeURIComponent(cityName);
    let url;
    if (showTomorrow) {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCityName}&appid=${apiKey}&units=metric&lang=kr&cnt=8`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCityName}&appid=${apiKey}&units=metric&lang=kr`;
    }
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      // 예보 날씨 데이터일 경우 첫 번째 요소는 내일의 날씨 정보입니다.
      const weatherData = showTomorrow ? data.list[0] : data;
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
