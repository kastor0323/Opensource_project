import { View, StyleSheet } from 'react-native';
import UserButton from '../components/UserBotton';
import { useState } from 'react';

const FirstPage = (props) => {
  const [selectedUser, setSelectedUser] = useState("");

  const handleUserSelect = (userState) => {
    setSelectedUser(userState);
    props.navigation.navigate("MainPage", { userState });
  };

  return (
    <View style={styles.container}>
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
  },
});

export default FirstPage;
