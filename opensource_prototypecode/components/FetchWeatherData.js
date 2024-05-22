const fetchWeatherData = async (city, setWeather, setLoading) => {

  
  try {
    setLoading(true);
    const apiKey = '53ce3fbfe2586eca2a0d0ddae22543b9';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  } finally {
    setLoading(false);
  }
};

export default fetchWeatherData;