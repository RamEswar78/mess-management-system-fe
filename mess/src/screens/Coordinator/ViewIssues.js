import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Updated Picker
import * as Notifications from "expo-notifications"; // Expo notifications
import * as Device from "expo-device"; // Expo device info

import RequestInspection from "./RequestInspections"; // Import RequestInspection component

const ViewIssues = () => {
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Issue 1",
      description: "Description of Issue 1",
      status: "Open",
      count: 2,
    },
    {
      id: 2,
      title: "Issue 2",
      description: "Description of Issue 2",
      status: "Resolved",
      count: 1,
    },
    {
      id: 3,
      title: "Issue 3",
      description: "Description of Issue 3",
      status: "Open",
      count: 3,
    },
  ]);

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState("All");
  const [notificationCount, setNotificationCount] = useState(0);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // Fetch device information
    const deviceDetails = Device.deviceName;
    setDeviceInfo(deviceDetails);

    // Request notification permissions
    Notifications.requestPermissionsAsync().then((status) =>
      setPermissionGranted(status.granted)
    );
  }, []);

  const openModal = (issue) => {
    setSelectedIssue(issue);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedIssue(null);
    setModalVisible(false);
  };

  const resolveIssue = () => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === selectedIssue.id ? { ...issue, status: "Resolved" } : issue
      )
    );
    sendNotification();
    closeModal();
  };

  // Send notification when an issue is resolved
  const sendNotification = () => {
    if (permissionGranted) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Issue Resolved!",
          body: `The issue '${selectedIssue.title}' has been marked as resolved.`,
        },
        trigger: null,
      });
      setNotificationCount(notificationCount + 1); // Increment notification count
    }
  };

  const filteredIssues = issues
    .filter((issue) => (filter === "All" ? true : issue.status === filter))
    .sort((a, b) => b.count - a.count);

  return (
    <View style={styles.container}>
      <Text>Device: {deviceInfo}</Text>
      <Text>Notification Count: {notificationCount}</Text>

      <Picker
        selectedValue={filter}
        onValueChange={(value) => setFilter(value)}
        style={styles.picker}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Open" value="Open" />
        <Picker.Item label="Resolved" value="Resolved" />
      </Picker>

      <FlatList
        data={filteredIssues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.issueCard}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Count: {item.count}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedIssue && (
              <>
                <Text style={styles.modalTitle}>{selectedIssue.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedIssue.description}
                </Text>
                <Text>Status: {selectedIssue.status}</Text>
                <Text>Count: {selectedIssue.count}</Text>

                {selectedIssue.status === "Open" && (
                  <Button
                    title="Resolve"
                    onPress={resolveIssue}
                    color="green"
                  />
                )}
                <Button title="Close" onPress={closeModal} color="red" />
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Call RequestInspection component without props */}
      <RequestInspection />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  issueCard: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalDescription: { fontSize: 16, marginBottom: 20 },
});

export default ViewIssues;