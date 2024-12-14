import React from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CoordinatorHome from "../src/screens/Coordinator/Coordinator";
import ViewIssues from "../src/screens/Coordinator/ViewIssues";
import RequestInspections from "../src/screens/Coordinator/RequestInspections";
import ViewInspectionReport from "../src/screens/Coordinator/ViewInspectionReport";
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={CoordinatorHome}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="View Issues"
        component={ViewIssues}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="report-problem" size={size} color={color} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="Request Inspections"
        component={RequestInspections}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="View Inspection Reports"
        component={ViewInspectionReport}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
