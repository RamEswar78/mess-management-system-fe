import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import axios from "axios";
import { useSession } from "../../SessionContext"; // Adjust the path as necessary

const QualityInspectionPage = () => {
  const { user } = useSession(); // Access the session context
  const [ratings, setRatings] = useState({
    QualityAndExpiry: 2.5,
    StandardsOfMaterials: 2.5,
    StaffAndFoodAdequacy: 2.5,
    MenuDiscrepancies: 2.5,
    SupervisorUpdates: 2.5,
    FoodTasteAndQuality: 2.5,
    KitchenHygiene: 2.5,
    UtensilCleanliness: 2.5,
    ServiceTimingsAdherence: 2.5,
  });
  const [comments, setComments] = useState("");
  const [messNo, setMessNo] = useState("");

  const handleRatingChange = (category, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!messNo) {
      Alert.alert("Error", "Please fill in the Mess Number.");
      return;
    }

    if (!user || !user.id) {
      Alert.alert("Error", "User not logged in.");
      return;
    }

    const payload = {
      messNo: messNo,
      mrId: 5, // Use the logged-in user's ID
      ...ratings,
      Comments: comments,
    };
    console.log(payload);
    try {
      const response = await axios.post(
        "https://mess-management-system-be-1.onrender.com/complaints/inspection",
        payload
      );

      if (response.data) {
        Alert.alert("Success", "Quality inspection submitted successfully!");
        setRatings({
          QualityAndExpiry: 2.5,
          StandardsOfMaterials: 2.5,
          StaffAndFoodAdequacy: 2.5,
          MenuDiscrepancies: 2.5,
          SupervisorUpdates: 2.5,
          FoodTasteAndQuality: 2.5,
          KitchenHygiene: 2.5,
          UtensilCleanliness: 2.5,
          ServiceTimingsAdherence: 2.5,
        });
        setComments("");
        setMessNo("");
      } else {
        Alert.alert("Error", "Failed to submit the quality inspection.");
      }
    } catch (error) {
      console.error("Error submitting quality inspection:", error);
      Alert.alert("Error", "An error occurred while submitting the data.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quality Inspection</Text>

      <TextInput
        style={styles.input}
        placeholder="Mess Number"
        value={messNo}
        onChangeText={setMessNo}
      />

      {Object.keys(ratings).map((category) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryText}>
            {category.replace(/([A-Z])/g, " $1")}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={5}
            step={0.1}
            value={ratings[category]}
            onValueChange={(value) => handleRatingChange(category, value)}
          />
          <Text style={styles.ratingValue}>Rating: {ratings[category]}</Text>
        </View>
      ))}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Comments"
        value={comments}
        onChangeText={setComments}
        multiline
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  ratingValue: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QualityInspectionPage;
