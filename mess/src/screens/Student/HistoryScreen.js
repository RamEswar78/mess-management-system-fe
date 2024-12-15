import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useSession } from "../../SessionContext";

const IssueHistory = () => {
  const [issueHistory, setIssueHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null); // State for selected issue
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const { user } = useSession();

  useEffect(() => {
    if (user) {
      console.log("User session loaded:", user);
    } else {
      Alert.alert("Error", "No session found! Please log in again.");
    }
  }, [user]);

  const fetchIssueHistory = async () => {
    if (!user) return;
    try {
      console.log("Fetching issue history for user ID:", user.id);
      const response = await axios.get(
        `https://mess-management-system-be-1.onrender.com/complaints/issues/user/${user.id}`
      );

      console.log("API Response:", JSON.stringify(response.data));

      if (response.data.success && Array.isArray(response.data.issues)) {
        setIssueHistory(response.data.issues);
        console.log("Issue History State Updated:", response.data.issues);
      } else {
        Alert.alert("Error", "No valid issues found.");
      }
    } catch (error) {
      console.error("Error fetching issue history:", error);
      Alert.alert(
        "Error",
        "Unable to fetch issue history. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssueHistory();
  }, [user]);

  const openModal = (issue) => {
    setSelectedIssue(issue); // Set the selected issue
    setIsModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setSelectedIssue(null); // Clear selected issue
    setIsModalVisible(false); // Hide the modal
  };

  const renderIssueItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.issueItem}
        key={index}
        onPress={() => openModal(item)}
      >
        <Text style={styles.issueCategory}>Category: {item.category}</Text>
        <Text style={styles.issueStatus}>Status: {item.status}</Text>
        <Text style={styles.issueDate}>
          Date:{" "}
          {new Date(item.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderModalContent = () => {
    if (!selectedIssue) return null;

    return (
      <ScrollView style={styles.modalContent}>
        <Text style={styles.modalCategory}>
          Category: {selectedIssue.category}
        </Text>
        <Text style={styles.modalDescription}>
          Description: {selectedIssue.description}
        </Text>
        {selectedIssue.image && (
          <Image
            source={{ uri: selectedIssue.image.url }} // Adjust based on your image field structure
            style={styles.issueImage}
          />
        )}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Issue History</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : issueHistory.length > 0 ? (
        issueHistory.map((item, index) => renderIssueItem(item, index))
      ) : (
        <Text style={styles.noIssuesText}>No issues reported yet.</Text>
      )}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            {renderModalContent()}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F8FF",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  issueItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  issueCategory: {
    fontSize: 16,
    fontWeight: "bold",
  },
  issueStatus: {
    fontSize: 14,
    marginTop: 5,
    color: "#007BFF",
  },
  issueDate: {
    fontSize: 12,
    marginTop: 5,
    color: "#888",
  },
  noIssuesText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    elevation: 5,
  },
  modalCategory: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  issueImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default IssueHistory;
