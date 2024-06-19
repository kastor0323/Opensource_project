
오픈소스인 OpenWeather API와 Image Expo snack에서 제공하는 라이브러리인 expo-location , expo speech를 이용하여 만든 날씨 프로그램이다.

사용자 상태에 따라 버튼을 누르고 각 사용자 상태에 맞게 서비스를 제공한다.
 
이 앱의 온도는 WeatherDisplay.js에서 구현되어 있고 값을 변경하기 원한다면 Math.round(weather.main.**) **부분을 https://openweathermap.org/api 에서 call함수를 보고 코드를 작성하면 바꿀 수 있다.