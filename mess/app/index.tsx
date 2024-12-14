import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // This is correct
import { createStackNavigator } from '@react-navigation/stack';
import { SessionProvider } from '../src/SessionContext';
import LoginPage from '../src/screens/Auth/LoginScreen';
import RegisterPage from '../src/screens/Auth/RegisterScreen';
import StudentPage from '../app/StudentPage';
import MRPage from '../app/MRPage';
import CoordinatorPage from '../app/CoordinatorPage'
import Admin from '../src/screens/Admin'

import RepresentativePage from '@/src/screens/Representative/RepresentativePage';

import {PermissionsAndroid} from 'react-native';

async function requestStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to upload files.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access the storage');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

requestStoragePermission();

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
