import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { PieChart } from "react-native-chart-kit";
import axios from "axios";

const FeedbackScreen = () => {
  // State to store filter values and feedback data
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [feedbackDurations, setFeedbackDurations] = useState([]); // Added state for feedback duration
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedFeedbackDuration, setSelectedFeedbackDuration] =
    useState("All"); // Added state for feedback duration
  const [feedbackData, setFeedbackData] = useState([]);
  const [chartData, setChartData] = useState([]);

  // API URL for fetching feedback data (replace with your actual URL)
  const apiUrl =
    "https://mess-management-system-be-1.onrender.com/complaints/feedback";

  // Function to fetch feedback data
  const fetchFeedbackData = async () => {
    try {
      const feedbackResponse = await axios.get(apiUrl);
      console.log(feedbackResponse.data);

      // Check if feedback data is an array and set it
      if (Array.isArray(feedbackResponse.data)) {
        setFeedbackData(feedbackResponse.data);
        extractCategoriesAndRatings(feedbackResponse.data);
        extractFeedbackDurations(feedbackResponse.data); // Extract feedback durations
      } else {
        setFeedbackData([]);
      }
    } catch (error) {
      console.error("Error fetching feedback data", error);
      Alert.alert("Error", "Failed to load feedback data.");
    }
  };

  // Function to extract unique categories, ratings, and feedback durations from the feedback data
  const extractCategoriesAndRatings = (data) => {
    const extractedCategories = Array.from(
      new Set(data.map((item) => item.category))
    );
    const extractedRatings = Array.from(
      new Set(data.map((item) => item.rating))
    );

    setCategories(extractedCategories);
    setRatings(extractedRatings);
  };

  const extractFeedbackDurations = (data) => {
    const extractedDurations = Array.from(
      new Set(data.map((item) => item.FeedbackDuration))
    );
    setFeedbackDurations(extractedDurations);
  };

  // Function to process feedback data for chart representation
  const processChartData = (data) => {
    const processedData = categories.map((category) => {
      const categoryFeedback = data.filter(
        (feedback) => feedback.category === category
      );

      const feedbackCounts = ratings.map((rating) => {
        const count = categoryFeedback.filter(
          (feedback) => feedback.rating === rating
        ).length;
        return {
          name: rating,
          feedbackCount: count,
          color: getColorForRating(rating),
        };
      });

      return {
        category,
        data: feedbackCounts,
      };
    });

    setChartData(processedData);
  };

  // Function to return color based on the feedback rating
  const getColorForRating = (rating) => {
    switch (rating) {
      case "1":
        return "#ff6347"; // Red
      case "2":
        return "#ff4500"; // Dark Red
      case "3":
        return "#ff9800"; // Orange
      case "4":
        return "#32cd32"; // Green
      case "5":
        return "#1e90ff"; // Blue
      default:
        return "#000000";
    }
  };

  // Fetch feedback data when the component is mounted or filters change
  useEffect(() => {
    fetchFeedbackData();
  }, []); // Empty dependency array ensures the fetch happens only once when the component is mounted

  useEffect(() => {
    if (feedbackData.length > 0) {
      processChartData(feedbackData);
    }
  }, [
    feedbackData,
    selectedCategory,
    selectedRating,
    selectedFeedbackDuration,
  ]); // Re-run when feedbackData, filters change

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Select Category:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))
        ) : (
          <Picker.Item label="No Categories Available" value="" />
        )}
      </Picker>

      <Text style={{ fontSize: 18 }}>Select Rating:</Text>
      <Picker
        selectedValue={selectedRating}
        onValueChange={(itemValue) => setSelectedRating(itemValue)}
      >
        <Picker.Item label="All Ratings" value="All" />
        {ratings.length > 0 ? (
          ratings.map((rating, index) => (
            <Picker.Item key={index} label={rating} value={rating} />
          ))
        ) : (
          <Picker.Item label="No Ratings Available" value="" />
        )}
      </Picker>

      <Text style={{ fontSize: 18 }}>Select Feedback Duration:</Text>
      <Picker
        selectedValue={selectedFeedbackDuration}
        onValueChange={(itemValue) => setSelectedFeedbackDuration(itemValue)}
      >
        <Picker.Item label="All Durations" value="All" />
        {feedbackDurations.length > 0 ? (
          feedbackDurations.map((duration, index) => (
            <Picker.Item key={index} label={duration} value={duration} />
          ))
        ) : (
          <Picker.Item label="No Feedback Durations Available" value="" />
        )}
      </Picker>

      <Button title="View Feedback" onPress={fetchFeedbackData} />

      {chartData.length > 0 ? (
        chartData.map((categoryData, index) => (
          <View key={index} style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {categoryData.category} Feedback:
            </Text>
            <PieChart
              data={categoryData.data}
              width={Dimensions.get("window").width - 40}
              height={220}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ff9800",
                decimalPlaces: 2,
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
