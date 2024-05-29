import { Button, View } from 'react-native';
import { useState } from 'react';

const UserButton = (props) => {
  const [userState, setUserState] = useState("");

  console.log({ userState });

  return (
    <View>
      <Button
        title="일반 노인"
        onPress={() => {
          setUserState("common");
          props.onSelectUser("common");
          props.navigation.navigate("MainPage", { userState: "common" });
        }}
      />

      <Button
        title="맹인"
        onPress={() => {
          setUserState("blind");
          props.onSelectUser("blind");
          props.navigation.navigate("MainPage", { userState: "blind" });
        }}
      />
    </View>
  );
};

export default UserButton;
