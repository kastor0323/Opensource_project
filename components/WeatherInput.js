import React from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';

const WeatherInput = ({ city, setCity, fetchWeatherData, loading }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="도시 이름을 입력하세요"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={() => fetchWeatherData(city)}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default WeatherInput;
