import {Text, View, StyleSheet } from 'react-native';
import UserButton from '../components/UserButton';
import LogoTitle from '../components/LogoTitle';
import { useState } from 'react';

const FirstPage = (props) => {
  const [selectedUser, setSelectedUser] = useState("");

  const handleUserSelect = (userState) => {
    setSelectedUser(userState);
  };

  return (
    <View style={styles.container}>
    <Text style = {styles.text}>선문 날씨 정보 앱</Text>
    <LogoTitle/>
      <UserButton
        onSelectUser={handleUserSelect}
        navigation={props.navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : "#fff"
  },
  text : {
    fontSize : 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  }
});

export default FirstPage;
