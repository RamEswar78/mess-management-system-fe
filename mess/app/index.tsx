import { AppRegistry } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import StudentHomePage from '../src/screens/Student/Student'; // Ensure the correct path to StudentHomePage
import FeedbackForm from '../src/screens/Student/FeedbackScreen'; // Ensure the correct path to StudentHomePage
import { expo } from '../app.json';  // Import the entire expo configuration from app.json
import ReportIssue from '../src/screens/Student/IssueReportScreen';
import IssueHistory from '../src/screens/Student/HistoryScreen';
import AllIssues from '../src/screens/Student/AllIssuesScreen';

// Extract the app name from the expo configuration
const { name: appName } = expo;

// Create a Drawer Navigator
const Drawer = createDrawerNavigator();


// Main App Component with Drawer Navigator
const App = () => {
  return (
    <Drawer.Navigator
      initialRouteName="StudentHome"
      screenOptions={{
        drawerType: 'slide', // Use 'slide' to animate the drawer opening/closing
        drawerStyle: {
          backgroundColor: '#fff', // Customize the drawer background
          width: 240, // Set the width of the drawer
            shadowColor: '#000', // Shadow for the drawer
            shadowOpacity: 0.8, 
            shadowRadius: 8,
        },
        overlayColor: 'rgba(0,0,0,0.5)', // Make the overlay semi-transparent
        drawerPosition: 'left', // Position of the drawer (left or right)
      }}
    >
      <Drawer.Screen name="StudentHome" component={StudentHomePage} />
      <Drawer.Screen name="Feedback" component={FeedbackForm} />
      <Drawer.Screen name="Report Issue" component={ReportIssue} />
      <Drawer.Screen name="View History" component={IssueHistory} />
      <Drawer.Screen name="Similar Issues" component={AllIssues} />
    </Drawer.Navigator>
  );
};

// Wrapping Drawer Navigator inside NavigationContainer (Only in root, no other containers)

// Register the main App component
export default App;
