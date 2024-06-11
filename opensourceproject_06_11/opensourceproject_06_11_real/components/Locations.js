import React, { useState } from 'react';
import * as locations from 'expo-location';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; // TouchableOpacity 추가

const Locations = ({ onLocationFound }) => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [ok, setOk] = useState(true);

  const ask = async () => {
    try {
      const { status } = await locations.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setOk(false);
        return;
      }

      const loc = await locations.getCurrentPositionAsync({});
      setLocation(loc);
      console.log(`Current location: Latitude ${loc.coords.latitude}, Longitude ${loc.coords.longitude}`);

      const reverseGeocode = await locations.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const { city } = reverseGeocode[0];
        setCity(city || 'City not found');
        onLocationFound(city || 'City not found');
        console.log(`Current city: ${city}`);
      } else {
        setCity('City not found');
        onLocationFound('City not found');
        console.log('City not found');
      }
    } catch (error) {
      console.error(error);
      setOk(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={ask}
      disabled={!ok} // 권한이 허용되지 않은 경우 버튼을 비활성화합니다.
    >
      <Text style={styles.buttonText}>현위치 날씨</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'yellow',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },
});

export default Locations;
