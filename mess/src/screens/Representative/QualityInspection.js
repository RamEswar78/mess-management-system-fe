import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

const QualityInspectionPage = () => {
  const [inspectionData, setInspectionData] = useState([]);
  const [foodItem, setFoodItem] = useState('');
  const [qualityRating, setQualityRating] = useState('');

  const handleAddInspection = () => {
    if (foodItem.trim() === '' || qualityRating.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newInspection = {
      id: Math.random().toString(),
      foodItem,
      qualityRating,
    };

    setInspectionData((prevData) => [...prevData, newInspection]);
    setFoodItem('');
    setQualityRating('');
  };

  const renderInspectionItem = ({ item }) => (
    <View style={styles.inspectionItem}>
      <Text style={styles.inspectionText}>Food Item: {item.foodItem}</Text>
      <Text style={styles.inspectionText}>Quality Rating: {item.qualityRating}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quality Inspection</Text>
      <TextInput
        style={styles.input}
        placeholder="Food Item"
        value={foodItem}
        onChangeText={setFoodItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Quality Rating (1-5)"
        value={qualityRating}
        onChangeText={setQualityRating}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddInspection}>
        <Text style={styles.buttonText}>Add Inspection</Text>
      </TouchableOpacity>
      <FlatList
        data={inspectionData}
        renderItem={renderInspectionItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E7C2F',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1E7C2F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  list: {
    marginTop: 20,
  },
  inspectionItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  inspectionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default QualityInspectionPage;