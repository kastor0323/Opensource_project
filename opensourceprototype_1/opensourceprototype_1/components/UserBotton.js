import {Button, View} from 'react-native';
import {useState} from 'react';

const UserButton = (props) => {
  const [userState, setUserState] = useState("");

  console.log({userState});

  return (
    <View>
      <Button
        title="일반 노인"
        onPress={() => {
          setUserState("common");
          props.navigation.navigate("MainPage")
        }}
      />

      <Button
        title="맹인"
        onPress={() => {
          setUserState("blind");
          props.navigation.navigate("MainPage")
        }}
      />
    </View>
  );
};

export default UserButton;
