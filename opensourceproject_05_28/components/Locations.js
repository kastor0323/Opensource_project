// Locations.js
import React, { useState } from 'react';
import * as locations from 'expo-location';
import { StyleSheet, Text, View, Button } from 'react-native';

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
    <View style={styles.container}>
      <Button
        onPress={ask}
        title="Get Current Location"
      />
      {!ok && <Text>Location permission denied.</Text>}
      {location && (
        <Text>Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}</Text>
      )}
      {city && <Text>Current city: {city}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Locations;
