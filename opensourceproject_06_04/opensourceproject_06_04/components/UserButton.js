import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';

const UserButton = (props) => {
  const [userState, setUserState] = useState("");

  console.log({ userState });

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'black'}]}
        onPress={() => {
          setUserState("common");
          props.onSelectUser("common");
          props.navigation.navigate("CommonUserPage", { userState: "common" });
        }}
      >
        <Text style={styles.buttonText}>일반 노인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'black'}]}
        onPress={() => {
          setUserState("blind");
          props.onSelectUser("blind");
          props.navigation.navigate("BlindUserPage", { userState: "blind" });
        }}
      >
        <Text style={styles.buttonText}>맹인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default UserButton;
