import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useSession } from "../src/SessionContext"; // Import session context
import CoordinatorHome from "../src/screens/Coordinator/Coordinator";
import ViewIssues from "../src/screens/Coordinator/ViewIssues";
import Director from "../src/screens/Director/Director"
import Feedback from '../src/screens/Director/Feedback'
import { DrawerNavigationProp } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

type AppNavigatorNavigationProp = DrawerNavigationProp<any>; // Define navigation prop type for AppNavigator

const CustomDrawerContent = (props: any) => {
  const { logout } = useSession(); // Access logout function from session context
  const { navigation }: { navigation: AppNavigatorNavigationProp } = props; // Type the navigation prop

  const handleLogout = () => {
    logout(); // Clear session data
    navigation.replace('Login'); // Prevent going back to previous screens
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        style={{
          marginTop: 'auto', 
          backgroundColor: '#007BFF', // Highlight with blue background
          borderRadius: 5, // Rounded corners
        }}
        labelStyle={{
          color: 'white', // White text color for contrast
          fontWeight: 'bold', // Bold text for emphasis
        }}
        icon={() => (
          <Ionicons name="log-out-outline" size={24} color="white" /> // Custom logout icon
        )}
      />
    </DrawerContentScrollView>
  );
};

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Custom Drawer Content
      screenOptions={{
        headerTitle: 'Menu', // Set header title as 'Menu' for each screen
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
        },
        drawerLabelStyle: {
          fontWeight: 'bold', // Bold labels in the drawer
        },
        drawerHeaderStyle: {
          backgroundColor: '#007BFF', // Set background color for drawer header
          height: 120, // Set height of the header
        },
        drawerHeaderTitleStyle: {
          color: 'white', // Set color of the title text to white
          fontSize: 22, // Increase font size for the title
          fontWeight: 'bold', // Make title bold
        },
      }}
    >
      
      <Drawer.Screen
        name="Issues"
        component={Director}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="report-problem" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={Feedback}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
