import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import StudentHomePage from "../src/screens/Student/Student"; // Adjust the path as needed

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator initialRouteName="StudentHomePage">
      <Stack.Screen
        name="StudentHomePage"
        component={StudentHomePage}
        options={{ headerShown: false }} // Customize header options
      />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
});
