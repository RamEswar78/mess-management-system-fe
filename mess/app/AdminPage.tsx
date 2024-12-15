import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Admin from "../src/screens/Admin/Admin";
import ViewMessRepresentative from "../src/screens/Admin/ViewMessRepresentative";
import ViewMessSupervisor from "../src/screens/Admin/ViewSupervisors";
import ViewStudents from "../src/screens/Admin/ViewStudents";
import { useSession } from "../src/SessionContext";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import AssignMess from '../src/screens/Admin/AssignMess'

const Drawer = createDrawerNavigator();

type AdminPageNavigationProp = DrawerNavigationProp<any>; 

const CustomDrawerContent = (props: any) => {
  const { logout } = useSession();
  const { navigation }: { navigation: AdminPageNavigationProp } = props;

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

const AdminPage = () => {
  const { user, logout } = useSession();
  console.log(user);

  useEffect(() => {
    if (!user) {
      console.log("User is not logged in.");
    }
  }, [user]);

  return (
    <Drawer.Navigator
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
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Admin}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="View Mess Representative"
        component={ViewMessRepresentative}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="View Supervisors"
        component={ViewMessSupervisor}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="View Students"
        component={ViewStudents}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="school-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="AssingnMess"
        component={AssignMess}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="school-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AdminPage;
