import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Updated Picker

const RequestInspection = () => {
  const [selectedMess, setSelectedMess] = useState("");
  const [description, setDescription] = useState("");

  const messOptions = ["Mess 1", "Mess 2", "Mess 3"]; // Example mess options

  const handleRequestInspection = () => {
    if (selectedMess && description) {
      alert(
        `Inspection requested for ${selectedMess} with description: ${description}`
      );
      // Add further logic to notify mess representatives or update the backend
    } else {
      alert("Please select a mess and enter a description.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Inspection</Text>

      <Picker
        selectedValue={selectedMess}
        onValueChange={(itemValue) => setSelectedMess(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Mess" value="" />
        {messOptions.map((mess, index) => (
          <Picker.Item key={index} label={mess} value={mess} />
        ))}
      </Picker>

      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description here"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <Button
        title="Request Inspection"
        onPress={handleRequestInspection}
        color="blue"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  picker: { height: 50, width: "100%", marginBottom: 16 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
});

export default RequestInspection;
