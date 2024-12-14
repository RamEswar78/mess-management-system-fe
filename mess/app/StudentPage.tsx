import React, { useEffect } from 'react';
import { useSession } from '../src/SessionContext'; // Import session context
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { DrawerNavigationProp } from '@react-navigation/drawer'; // Importing for typing the navigation prop
import StudentHomePage from '../src/screens/Student/Student';
import FeedbackForm from '../src/screens/Student/FeedbackScreen';
import ReportIssue from '../src/screens/Student/IssueReportScreen';
import IssueHistory from '../src/screens/Student/HistoryScreen';
import AllIssues from '../src/screens/Student/AllIssuesScreen';

const Drawer = createDrawerNavigator();

type StudentPageNavigationProp = DrawerNavigationProp<any>; // Define navigation prop type for StudentPage

const CustomDrawerContent = (props: any) => {
  const { logout } = useSession(); // Access logout function from session context
  const { navigation }: { navigation: StudentPageNavigationProp } = props; // Type the navigation prop

  const handleLogout = () => {
    logout(); // Clear session data
    navigation.replace('Login'); // Use replace to prevent going back to the previous screen
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} /> {/* Default Drawer Items */}
      
      {/* Add a Logout button at the bottom */}
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        style={{ marginTop: 'auto' }} // Position the logout button at the bottom
      />
    </DrawerContentScrollView>
  );
};

type StudentPageProps = {
  navigation: StudentPageNavigationProp;
};

const StudentPage = ({ navigation }: StudentPageProps) => {
  const { user } = useSession(); // Access session data

  useEffect(() => {
    if (!user) {
      navigation.replace('Login'); // Redirect to Login if not authenticated and replace to prevent back navigation
    }
  }, [user, navigation]);

  return (
    <Drawer.Navigator
      initialRouteName="StudentHome"
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Custom Drawer Content
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
          shadowColor: '#000',
          shadowOpacity: 0.8,
          shadowRadius: 8,
        },
        overlayColor: 'rgba(0,0,0,0.5)',
        drawerPosition: 'left',
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

export default StudentPage;
