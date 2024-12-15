import React, { useEffect } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useSession } from "../src/SessionContext"; // Import session context
import { View } from "react-native";
import StudentHomePage from "../src/screens/Student/Student";
import FeedbackForm from "../src/screens/Student/FeedbackScreen";
import ReportIssue from "../src/screens/Student/IssueReportScreen";
import IssueHistory from "../src/screens/Student/HistoryScreen";
import AllIssues from "../src/screens/Student/AllIssuesScreen";
import RepresentativePage from "../src/screens/Representative/RepresentativePage";
import QualityInspection from "../src/screens/Representative/QualityInspection";
import ViewIssues from "../src/screens/Coordinator/ViewIssues";import { Ionicons, MaterialIcons } from "@expo/vector-icons";


const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { logout } = useSession();
  const { navigation } = props;

  const handleLogout = () => {
    logout();
    navigation.replace("Login");
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

type StudentPageProps = {
  navigation: DrawerNavigationProp<any>;
};

const MRPage = ({ navigation }: StudentPageProps) => {
  const { user } = useSession();

  useEffect(() => {
    if (!user) {
      navigation.replace("Login");
    }
  }, [user, navigation]);

  return (
    <Drawer.Navigator
      initialRouteName="RepresentativePage"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitle: 'Menu', // Set header title as 'Menu' for each screen
        drawerStyle: {
          backgroundColor: "#fff",
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
    >
      <Drawer.Screen name="RepresentativePage" component={RepresentativePage} />
      <Drawer.Screen name="QualityInspection" component={QualityInspection} />
      <Drawer.Screen name="Feedback" component={FeedbackForm} />
      <Drawer.Screen name="Report Issue" component={ReportIssue} />
      <Drawer.Screen name="View History" component={IssueHistory} />
      <Drawer.Screen name="View Issues" component={ViewIssues} />
    </Drawer.Navigator>
  );
};

export default MRPage;
