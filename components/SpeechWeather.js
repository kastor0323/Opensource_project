import * as Speech from 'expo-speech';

const speakWeather = (weather, dayOffset) => {
  if (weather && weather.main) {
    let weatherText;
    switch (dayOffset) {
      case 1:
        weatherText = `내일 ${weather.name}의 
        최고 기온은 ${Math.round(weather.main.temp_max)}도,
        최저 기온은 ${Math.round(weather.main.temp_min)}도이고, 
        ${weather.weather[0].description}입니다.`;
        break;
      case 2:
        weatherText = `모레 ${weather.name}의 
        최고 기온은 ${Math.round(weather.main.temp_max)}도,
        최저 기온은 ${Math.round(weather.main.temp_min)}도이고, 
        ${weather.weather[0].description}입니다.`;
        break;
      default:
        weatherText = `오늘 ${weather.name}의 기온은 
        현재 ${Math.round(weather.main.temp)}도이며, 
        최고 기온은 ${Math.round(weather.main.temp_max)}도, 
        최저 기온은 ${Math.round(weather.main.temp_min)}도이고,
        날씨는 ${weather.weather[0].description} 입니다.`;
        break;
    }
    Speech.speak(weatherText, { language: 'ko-KR' });
  }
};

export { speakWeather };
