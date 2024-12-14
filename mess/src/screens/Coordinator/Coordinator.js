import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FeedbackScreen from "./ViewFeedBack";

const CoordinatorHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, Coordinator</Text>
      <View>
        <FeedbackScreen />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  text: { fontSize: 16, color: "#555" },
});

export default CoordinatorHome;
