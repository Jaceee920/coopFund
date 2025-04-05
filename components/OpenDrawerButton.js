import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

const OpenDrawerButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Image
        source={require('../assets/app.png')} // Ensure this path is correct
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  );
};

export default OpenDrawerButton;
