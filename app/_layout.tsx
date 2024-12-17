import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "../src/navigations/DrawerNavigator";

const RootNavigator = () => {
  return (  
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
  );
};

export default RootNavigator;
