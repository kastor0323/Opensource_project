import {Text, View, StyleSheet } from 'react-native';
import UserButton from '../components/UserButton';
import { useState } from 'react';

const FirstPage = (props) => {
  const [selectedUser, setSelectedUser] = useState("");

  const handleUserSelect = (userState) => {
    setSelectedUser(userState);
    props.navigation.navigate("MainPage", { userState });
  };

  return (
    <View style={styles.container}>
    <Text style = {styles.text}>선문 날씨 정보 앱</Text>
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
    color: 'black',
    textAlign: 'center',
  }
});

export default FirstPage;
