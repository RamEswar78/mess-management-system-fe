import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    timeliness: null,
    cleanliness: null,
    qualityFood: null,
    tasteCurries: null,
    snacks: null,
    quantity: null,
    courtesy: null,
    uniforms: null,
    cookingMenu: null,
    cleanlinessWashArea: null,
  });

  const categories = [
    { key: "timeliness", title: "Timeliness of the service:" },
    {
      key: "cleanliness",
      title:
        "Neatness/ Cleanliness of the surroundings:",
    },
    {
      key: "qualityFood",
      title: "Quality of food:",
    },
    { key: "tasteCurries", title: "Taste of Curries:" },
    { key: "snacks", title: "Snacks, Tea, Coffee, and Breakfast:" },
    {
      key: "quantity",
      title:
        "Quantity of food:",
    },
    {
      key: "courtesy",
      title: "Courtesy of services:",
    },
    {
      key: "uniforms",
      title:
        "Employee Dress Code:",
    },
    { key: "cookingMenu", title: "Cooking and Serving of food as per Menu" },
    {
      key: "cleanlinessWashArea",
      title: "Cleanliness of wash basins and wash area",
    },
  ];

  const handleFeedbackChange = (category, rating) => {
    setFeedback((prev) => ({
      ...prev,
      [category]: prev[category] === rating ? null : rating, // Toggle selection
    }));
  };

  const isSelected = (category, rating) => feedback[category] === rating;

  const isFormComplete = () => {
    return Object.values(feedback).every((value) => value !== null);
  };

  const handleSubmit = () => {
    if (!isFormComplete()) {
      Alert.alert(
        "Incomplete Form",
        "Please provide feedback for all categories before submitting."
      );
      return;
    }

    console.log("Feedback submitted:", feedback);
    Alert.alert("Success", "Feedback successfully submitted!");
  };

  const deselectAll = () => {
    setFeedback({
      timeliness: null,
      cleanliness: null,
      qualityFood: null,
      tasteCurries: null,
      snacks: null,
      quantity: null,
      courtesy: null,
      uniforms: null,
      cookingMenu: null,
      cleanlinessWashArea: null,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Feedback Form</Text>
      </View>
      {/* Wrap the form in a ScrollView */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.form}>
          {categories.map((category) => (
            <View style={styles.category} key={category.key}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <View style={styles.ratingContainer}>
                {["Ex", "Good", "Poor"].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    style={[
                      styles.ratingButton,
                      isSelected(category.key, rating) && styles.selectedButton,
                    ]}
                    onPress={() => handleFeedbackChange(category.key, rating)}
                  >
                    <Text
                      style={[
                        styles.ratingText,
                        isSelected(category.key, rating) && styles.selectedText,
                      ]}
                    >
                      {rating}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: "#0D47A1",
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
  },
  form: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 25,
    shadowColor: "#0D47A1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  category: {
    marginBottom: 25,
  },
  categoryTitle: {
    fontSize: 18,
    color: "#0D47A1",
    fontWeight: "600",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ratingButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderColor: "#0D47A1",
    borderWidth: 1.5,
    borderRadius: 25,
    backgroundColor: "#BBDEFB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0D47A1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ratingText: {
    color: "#0D47A1", // Reduced color darkness
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedButton: {
    backgroundColor: "#0D47A1",
  },
  selectedText: {
    color: "#FFF",
  },
  deselectButton: {
    backgroundColor: "#FFCDD2", // Light red background to indicate caution
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30, // Rounded corners for a more modern look
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#D32F2F", // Red border for better visibility
    elevation: 5, // Slight shadow for depth
  },
  deselectButtonText: {
    color: "#D32F2F", // Red text color to match the button theme
    fontSize: 16,
    fontWeight: "600", // Slightly bold text for emphasis
  },
  submitButton: {
    backgroundColor: "#0D47A1", // Highlighted color for submission
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#0D47A1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FeedbackForm;
