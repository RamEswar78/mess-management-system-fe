import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useUserRole } from "../context/UserContext";

import HomeScreen from "../screens/HomeScreen";
import MenuScreen from "../screens/MenuScreen";
import ReportsScreen from "../screens/ReportsScreen";

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  const { userRole } = useUserRole();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      {userRole === "admin" && (
        <Tab.Screen name="Menu" component={MenuScreen} />
      )}
      {userRole !== "student" && (
        <Tab.Screen name="Reports" component={ReportsScreen} />
      )}
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
