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
import ViewIssues from "../src/screens/Coordinator/ViewIssues";

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
      <View style={{ flexGrow: 1, justifyContent: "flex-end" }}>
        <DrawerItem label="Logout" onPress={handleLogout} />
      </View>
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
        drawerType: "slide",
        drawerStyle: {
          backgroundColor: "#fff",
          width: 240,
          shadowColor: "#000",
          shadowOpacity: 0.8,
          shadowRadius: 8,
          elevation: 5, // Android-specific shadow
        },
        overlayColor: "rgba(0,0,0,0.5)",
        drawerPosition: "left",
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
