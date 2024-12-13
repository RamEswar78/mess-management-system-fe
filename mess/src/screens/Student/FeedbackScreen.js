import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    surroundings: null,
    timings: null,
    taste: null,
  });

  const handleFeedbackChange = (category, rating) => {
    setFeedback({ ...feedback, [category]: rating });
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Feedback submitted:', feedback);
    alert("Successfully Submitted");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Feedback</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Mess Surroundings</Text>
          <View style={styles.ratingContainer}>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleFeedbackChange('surroundings', 'Ex')}
            >
              <Text style={styles.ratingText}>Ex</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleFeedbackChange('surroundings', 'Good')}
            >
              <Text style={styles.ratingText}>Good</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleFeedbackChange('surroundings', 'Poor')}
            >
              <Text style={styles.ratingText}>Poor</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Timings</Text>
          <View style={styles.ratingContainer}>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleFeedbackChange('timings', 'Ex')}
            >
              <Text style={styles.ratingText}>Ex</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleFeedbackChange('timings', 'Good')}
            >
              < Text style={styles.ratingText}>Good</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleFeedbackChange('timings', 'Poor')}
            >
              <Text style={styles.ratingText}>Poor</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Taste</Text>
          <View style={styles.ratingContainer}>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleFeedbackChange('taste', 'Ex')}
            >
              <Text style={styles.ratingText}>Ex</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleFeedbackChange('taste', 'Good')}
            >
              <Text style={styles.ratingText}>Good</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() => handleFeedbackChange('taste', 'Poor')}
            >
              <Text style={styles.ratingText}>Poor</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCEEFF',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#228B22',
  },
  form: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  category: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    color: '#228B22',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingButton: {
    padding: 10,
    borderColor: '#228B22',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  ratingText: {
    color: '#228B22',
  },
  submitButton: {
    backgroundColor: '#228B22',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default FeedbackForm;