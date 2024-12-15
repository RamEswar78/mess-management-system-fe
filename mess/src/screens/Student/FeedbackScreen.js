import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { useSession } from "../../SessionContext"; // Adjust the path as necessary

const FeedbackForm = () => {
  const categories = [
    "messNo",
    "TimelinessOfService",
    "CleanlinessOfDiningHall",
    "FoodQuality",
    "QuantityOfFood",
    "CourtesyOfStaff",
    "StaffHygiene",
    "MenuAdherence",
    "WashAreaCleanliness",
    "Comments",
  ];

  const [feedback, setFeedback] = useState(
    categories.reduce((acc, category) => {
      acc[category] = null;
      return acc;
    }, {})
  );
  const { user } = useSession(); // Access session data
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) {
      setRole(user.role);
      console.log("User session loaded:", user); // Log session data
    } else {
      Alert.alert("Error", "No session found! Please log in again.");
    }
  }, [user]);

  const handleFeedbackChange = (category, rating) => {
    setFeedback({ ...feedback, [category]: rating });
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert("Error", "User is not logged in. Please login again.");
      return;
    }

    try {
      console.log("Submitting feedback for user ID:", user.id); // Log user ID before sending
      const res = await axios.post(
        "https://mess-management-system-be-1.onrender.com/student/feedback",
        {
          userId: user.id,
          FeedbackDuration: "2024-12-01 to 2024-12-15",
          ...feedback,
        }
      );
      console.log("Feedback submitted:", feedback);
      Alert.alert("Success", "Feedback successfully submitted!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Alert.alert("Error", "There was an issue submitting your feedback.");
    }
  };

  const isSubmitDisabled = Object.values(feedback).includes(null);

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Feedback</Text>
        </View>
        <View style={styles.form}>
          {categories.map((category) => (
            <View style={styles.category} key={category}>
              <Text style={styles.categoryTitle}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    style={[
                      styles.ratingButton,
                      feedback[category] === rating && styles.selectedButton,
                    ]}
                    onPress={() => handleFeedbackChange(category, rating)}
                  >
                    <Text style={styles.ratingText}>{rating}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitDisabled && styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitDisabled}
          >
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    marginTop: 10,
  },
  category: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ratingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#4caf50",
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default FeedbackForm;
