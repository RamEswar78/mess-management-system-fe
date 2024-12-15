import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Updated Picker import
import { PieChart } from "react-native-chart-kit";

const Feedback = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMess, setSelectedMess] = useState("Mess 1");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedFeedbackType, setSelectedFeedbackType] = useState("All");
  const [feedbackData, setFeedbackData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const feedbackCategories = ["Cleanliness", "Food Quality", "Service"]; // Example categories

  // Sample feedback data
  const sampleFeedbackData = [
    {
      category: "Cleanliness",
      option: "Good",
      mess: "Mess 1",
      rating: 4,
      feedbackType: "Positive",
    },
    {
      category: "Food Quality",
      option: "Poor",
      mess: "Mess 1",
      rating: 2,
      feedbackType: "Negative",
    },
    {
      category: "Service",
      option: "Excellent",
      mess: "Mess 2",
      rating: 5,
      feedbackType: "Positive",
    },
    {
      category: "Cleanliness",
      option: "Good",
      mess: "Mess 2",
      rating: 3,
      feedbackType: "Neutral",
    },
    {
      category: "Food Quality",
      option: "Worst",
      mess: "Mess 3",
      rating: 1,
      feedbackType: "Negative",
    },
    {
      category: "Service",
      option: "Poor",
      mess: "Mess 3",
      rating: 2,
      feedbackType: "Negative",
    },
    {
      category: "Cleanliness",
      option: "Excellent",
      mess: "Mess 1",
      rating: 5,
      feedbackType: "Positive",
    },
  ];

  // Function to process the sample feedback data
  const processChartData = (data) => {
    const processedData = feedbackCategories.map((category) => {
      const categoryFeedback = data.filter(
        (feedback) => feedback.category === category
      );

      // Count the occurrences for each feedback option (e.g., "Good", "Poor", etc.)
      const feedbackCounts = ["Good", "Poor", "Worst", "Excellent"].map(
        (option) => {
          const count = categoryFeedback.filter(
            (feedback) => feedback.option === option
          ).length;
          return {
            name: option,
            feedbackCount: count,
            color: getColorForOption(option),
          };
        }
      );

      return {
        category,
        data: feedbackCounts,
      };
    });

    setChartData(processedData);
  };

  const getColorForOption = (option) => {
    // Assign colors based on option
    switch (option) {
      case "Good":
        return "#32cd32"; // Green for Good
      case "Poor":
        return "#ff6347"; // Red for Poor
      case "Worst":
        return "#ff4500"; // Dark Red for Worst
      case "Excellent":
        return "#1e90ff"; // Blue for Excellent
      default:
        return "#000000"; // Black default
    }
  };

  useEffect(() => {
    // Use sample data for now
    processChartData(sampleFeedbackData);
  }, [selectedDate, selectedMess, selectedRating, selectedFeedbackType]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Feedback Analysis</Text>

      {/* Mess Selection */}
      <Text style={styles.label}>Select Mess:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMess}
          onValueChange={(itemValue) => setSelectedMess(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Mess 1" value="Mess 1" />
          <Picker.Item label="Mess 2" value="Mess 2" />
          <Picker.Item label="Mess 3" value="Mess 3" />
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => processChartData(sampleFeedbackData)}
      >
        <Text style={styles.buttonText}>View Feedback</Text>
      </TouchableOpacity>

      {/* Pie Chart Display */}
      {chartData.length > 0 ? (
        chartData.map((categoryData, index) => (
          <View key={index} style={styles.chartContainer}>
            <Text style={styles.chartTitle}>{categoryData.category} Feedback</Text>
            <PieChart
              data={categoryData.data}
              width={Dimensions.get("window").width - 40} // Chart width
              height={220} // Chart height
              chartConfig={{
                backgroundColor: "#f4f4f4",
                backgroundGradientFrom: "#f4f4f4",
                backgroundGradientTo: "#f4f4f4",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="feedbackCount"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>
          No feedback data available for the selected filters.
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
    marginVertical: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#333",
  },
  button: {
    backgroundColor: "#00796b",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  chartContainer: {
    marginTop: 20,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
    marginBottom: 10,
  },
  noDataText: {
    textAlign: "center",
    color: "#888",
    marginVertical: 20,
  },
});

export default Feedback;
