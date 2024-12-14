import React, { useState } from "react";
import { View, Text, TextInput, Button, Picker } from "react-native";

const ProvideUpdates = () => {
  const [updateType, setUpdateType] = useState("General");
  const [message, setMessage] = useState("");

  const handleSendUpdate = () => {
    console.log(`Sending ${updateType} update: ${message}`);
    // Add logic to send the update
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Send an Update</Text>
      <Picker
        selectedValue={updateType}
        onValueChange={(itemValue) => setUpdateType(itemValue)}
      >
        <Picker.Item label="General" value="General" />
        <Picker.Item label="Menu Update" value="Menu" />
        <Picker.Item label="Event Update" value="Event" />
      </Picker>
      <TextInput
        placeholder="Write your message here..."
        value={message}
        onChangeText={setMessage}
        style={{
          borderColor: "#ccc",
          borderWidth: 1,
          marginTop: 10,
          marginBottom: 20,
          padding: 10,
          borderRadius: 5,
        }}
      />
      <Button title="Send Update" onPress={handleSendUpdate} />
    </View>
  );
};

export default ProvideUpdates;
