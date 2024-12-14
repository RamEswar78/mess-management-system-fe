import React, { useState, useEffect } from "react";
import { View, Text, Button, Dimensions, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Updated Picker import
import { PieChart } from "react-native-chart-kit";

const FeedbackScreen = () => {
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
    <ScrollView style={{ flex: 1, padding: 20 }}>
      {/* <Text>Select Date:</Text>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={(event, date) => setSelectedDate(date || selectedDate)}
      /> */}

      <Text>Select Mess:</Text>
      <Picker
        selectedValue={selectedMess}
        onValueChange={(itemValue) => setSelectedMess(itemValue)}
      >
        <Picker.Item label="Mess 1" value="Mess 1" />
        <Picker.Item label="Mess 2" value="Mess 2" />
        <Picker.Item label="Mess 3" value="Mess 3" />
      </Picker>

      <Text>Select Rating:</Text>
      <Picker
        selectedValue={selectedRating}
        onValueChange={(itemValue) => setSelectedRating(itemValue)}
      >
        <Picker.Item label="All Ratings" value="All" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
      </Picker>

      <Text>Select Feedback Type:</Text>
      <Picker
        selectedValue={selectedFeedbackType}
        onValueChange={(itemValue) => setSelectedFeedbackType(itemValue)}
      >
        <Picker.Item label="All Feedback Types" value="All" />
        <Picker.Item label="Positive" value="Positive" />
        <Picker.Item label="Negative" value="Negative" />
        <Picker.Item label="Neutral" value="Neutral" />
      </Picker>

      <Button
        title="View Feedback"
        onPress={() => processChartData(sampleFeedbackData)}
      />

      {chartData.length > 0 ? (
        chartData.map((categoryData, index) => (
          <View key={index} style={{ marginTop: 20 }}>
            <Text>{categoryData.category} Feedback:</Text>
            <PieChart
              data={categoryData.data}
              width={Dimensions.get("window").width - 40} // Chart width
              height={220} // Chart height
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ff9800",
                decimalPlaces: 2, // Optional, set the decimal places for values
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              accessor="feedbackCount"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>
        ))
      ) : (
        <Text>No feedback data available for the selected filters.</Text>
      )}
    </ScrollView>
  );
};

export default FeedbackScreen;
