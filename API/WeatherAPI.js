import { Alert } from 'react-native';

const fetchWeatherData = async (cityName, dayOffset, setWeather, setLoading) => {
  try {
    setLoading(true);
    const apiKey = '3de85e63751b1674d27cc0253974fe6a';
    const encodedCityName = encodeURIComponent(cityName);
    let url;

    if (dayOffset > 0) {
      // 내일이나 모레의 날씨 정보를 가져오는 경우
      const cnt = 3;  // 최대 3일치 데이터 가져오기
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCityName}&cnt=${cnt}&lang=kr&appid=${apiKey}&units=metric`;
    } else {
      // 현재 날씨 정보를 가져오는 경우
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCityName}&appid=${apiKey}&units=metric&lang=kr`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      let weatherData;
      if (dayOffset > 0) {
        weatherData = { ...data.list[dayOffset], name: data.city.name };
      } else {
        weatherData = data;
      }

      // 날씨 아이콘 URL 추가
      const iconCode = weatherData.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherData.iconUrl = iconUrl;

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
