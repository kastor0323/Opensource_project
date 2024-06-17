import React from 'react';
import { Image } from 'react-native';

const LogoTitle = () => {
  return (
    <Image
      style={{ width: 200, height: 200 }}
      source={require('../assets/SunMoonUNIV_symbol.png')}
    />
  );
}

export default LogoTitle;
