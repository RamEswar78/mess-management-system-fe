import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useSession } from "../src/SessionContext"; // Import session context
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { DrawerNavigationProp } from "@react-navigation/drawer"; // Importing for typing the navigation prop
import StudentHomePage from "../src/screens/Student/Student";
import FeedbackForm from "../src/screens/Student/FeedbackScreen";
import ReportIssue from "../src/screens/Student/IssueReportScreen";
import IssueHistory from "../src/screens/Student/HistoryScreen";
import AllIssues from "../src/screens/Student/AllIssuesScreen";

// Create Drawer navigator
const Drawer = createDrawerNavigator();

// Define navigation prop type for StudentPage
type StudentPageNavigationProp = DrawerNavigationProp<any>;

// Custom Drawer Content for Logout
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { logout } = useSession(); // Access logout function from session context

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          logout(); // Clear session data
          props.navigation.replace("Login"); // Use replace to prevent going back to the previous screen
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} /> {/* Default Drawer Items */}
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        style={{ marginTop: "auto" }} // Position the logout button at the bottom
      />
    </DrawerContentScrollView>
  );
};

// Type for StudentPage props
type StudentPageProps = {
  navigation: StudentPageNavigationProp;
};

const StudentPage = ({ navigation }: StudentPageProps) => {
  const { user } = useSession(); // Access session data

  useEffect(() => {
    if (!user) {
      navigation.replace("Login"); // Redirect to Login if not authenticated and replace to prevent back navigation
    }
  }, [user, navigation]);

  const drawerOptions = {
    drawerType: "slide",
    drawerStyle: {
      backgroundColor: "#fff",
      width: 240,
      shadowColor: "#000",
      shadowOpacity: 0.8,
      shadowRadius: 8,
    },
    overlayColor: "rgba(0,0,0,0.5)",
    drawerPosition: "left",
  };

  return (
    <Drawer.Navigator
      initialRouteName="StudentHome"
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Custom Drawer Content
      screenOptions={drawerOptions}
    >
      <Drawer.Screen name="StudentHome" component={StudentHomePage} />
      <Drawer.Screen name="Feedback" component={FeedbackForm} />
      <Drawer.Screen name="Report Issue" component={ReportIssue} />
      <Drawer.Screen name="View History" component={IssueHistory} />
      <Drawer.Screen name="All Issues" component={AllIssues} />
    </Drawer.Navigator>
  );
};

export default StudentPage;
