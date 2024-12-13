import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StudentHomePage from './screens/Student/Student'; // Adjust the path as needed

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="StudentHomePage">
                {/* Student Home Page */}
                <Stack.Screen
                    name="StudentHomePage"
                    component={StudentHomePage}
                    options={{ headerShown: false }} // Hide the header for a cleaner look
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
