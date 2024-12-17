import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useUserRole } from "../context/UserContext"; // Context to get user role

import BottomTabsNavigator from "./BottomTabsNavigator";
import SessionManager from "../utils/SessionManager";

// Save a user role
const saveSession = async () => {
  await SessionManager.setItem("userRole", "messCoordinator");
};

// Retrieve the user role
const loadSession = async () => {
  const role = await SessionManager.getItem("userRole");
  console.log("User Role:", role);
};

// Remove user role (Logout)
const clearSession = async () => {
  await SessionManager.removeItem("userRole");
};



const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { userRole } = useUserRole(); // Assume userRole is fetched (e.g., 'admin', 'student', 'coordinator')

  // Define screens based on roles
  const getDrawerScreens = () => {
    switch (userRole) {
      case "admin":
        return (
          <>
            {/* <Drawer.Screen name="Dashboard" component={BottomTabsNavigator} />
            <Drawer.Screen name="Attendance" component={AttendanceScreen} />
            <Drawer.Screen name="Reports" component={ReportsScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
          </>
        );
      case "coordinator":
        return (
          <>
            {/* <Drawer.Screen name="Dashboard" component={BottomTabsNavigator} />
            <Drawer.Screen name="Reports" component={ReportsScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
          </>
        );
      case "student":
        return (
          <>
            {/* <Drawer.Screen name="Dashboard" component={BottomTabsNavigator} />
            <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
          </>
        );
      default:
        return (
          <Drawer.Screen name="Dashboard" component={BottomTabsNavigator} />
        );
    }
  };

  return <Drawer.Navigator>{getDrawerScreens()}</Drawer.Navigator>;
};

export default DrawerNavigator;
