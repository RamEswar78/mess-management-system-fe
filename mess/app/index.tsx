import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SessionProvider } from "../src/SessionContext";
import LoginPage from "../src/screens/Auth/LoginScreen";
import RegisterPage from "../src/screens/Auth/RegisterScreen";
import StudentPage from "../app/StudentPage";
import MRPage from "../app/MRPage";
import CoordinatorPage from "../app/CoordinatorPage";
import Admin from "../src/screens/Admin";
import { usePushNotifications } from "../src/hooks/useFetchNotifications";
import { Text, View } from "react-native";

const Stack = createStackNavigator();

const App = () => {
  const { expoPushToken, notification } = usePushNotifications();

  return (
    <SessionProvider>
      <View>
        <Text>Push Token: {expoPushToken ?? "Fetching token..."}</Text>
        {notification && (
          <Text>
            Notification: {notification.request.content.title} -{" "}
            {notification.request.content.body}
          </Text>
        )}
      </View>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentPage"
          component={StudentPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MRPage"
          component={MRPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Coordinator"
          component={CoordinatorPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SessionProvider>
  );
};

export default App;
