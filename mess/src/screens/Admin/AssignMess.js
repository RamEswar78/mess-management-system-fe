import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AssignMess = () => {
  const [mess, setMess] = useState('');
  const [batch, setBatch] = useState('');
  const [assignedMess, setAssignedMess] = useState([]); // To store assigned messes
  const [assignedBatch, setAssignedBatch] = useState([]); // To store assigned batches

  const handleAssign = () => {
    if (!mess || !batch) {
      Alert.alert('Error', 'Please select both Mess and Batch!');
      return;
    }

    
    if (assignedBatch.includes(batch)) {
      Alert.alert('Already Assigned', `Batch ${batch} already has an assigned mess.`);
      return;
    }

    // Assign mess and batch
    setAssignedMess((prevMesses) => [...prevMesses, mess]);
    setAssignedBatch((prevBatches) => [...prevBatches, batch]);
    Alert.alert('Success', `Mess ${mess} assigned to Batch ${batch} successfully!`);
    setMess(''); // Reset mess selection
    setBatch(''); // Reset batch selection
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Assign Mess</Text>

      {/* Mess Dropdown */}
      <Text style={styles.label}>Select Mess:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={mess}
          onValueChange={(itemValue) => setMess(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Mess" value="" />
          <Picker.Item label="Mess 1" value="Mess1" />
          <Picker.Item label="Mess 2" value="Mess2" />
          <Picker.Item label="Mess 3" value="Mess3" />
          <Picker.Item label="Mess 4" value="Mess4" />
          <Picker.Item label="Mess 5" value="Mess5" />
          <Picker.Item label="Mess 6" value="Mess6" />
          <Picker.Item label="Mess 7" value="Mess7" />
          <Picker.Item label="Mess 8" value="Mess8" />
        </Picker>
      </View>

      {/* Batch Dropdown */}
      <Text style={styles.label}>Select Batch:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={batch}
          onValueChange={(itemValue) => setBatch(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Batch" value="" />
          <Picker.Item label="R19" value="R19" />
          <Picker.Item label="R20" value="R20" />
          <Picker.Item label="R21" value="R21" />
          <Picker.Item label="R22" value="R22" />
          <Picker.Item label="R23" value="R23" />
          <Picker.Item label="R24" value="R24" />
        </Picker>
      </View>

      {/* Assign Mess Button */}
      <TouchableOpacity style={styles.button} onPress={handleAssign}>
        <Text style={styles.buttonText}>Assign Mess</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#004d40',
    marginVertical: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#004d40',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#00796b',
  },
  button: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AssignMess;
