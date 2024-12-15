import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SessionProvider } from '../src/SessionContext';
import LoginPage from '../src/screens/Auth/LoginScreen';
import RegisterPage from '../src/screens/Auth/RegisterScreen';
import StudentPage from '../app/StudentPage';
import MRPage from '../app/MRPage';
import CoordinatorPage from '../app/CoordinatorPage'
import AdminPage from '../app/AdminPage'
import Director from '../app/Director'
import AdministrativeOfficer from '../src/screens/AdministrativeOfficer/AdministrativeOfficer'

const Stack = createStackNavigator();

const App = () => {

  return (
    <SessionProvider>
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
            component={AdminPage} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Coordinator" 
            component={CoordinatorPage} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Director" 
            component={Director} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="AO" 
            component={AdministrativeOfficer} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
    </SessionProvider>
  );
};

export default App;
