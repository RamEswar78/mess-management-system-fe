import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useSession } from "../../SessionContext"; 
import { Picker } from "@react-native-picker/picker"; // Updated Picker import
// Import the session context

const Admin = ({ navigation }) => {
  const { user, logout } = useSession(); // Access session data and logout function
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [mess, setMess] = useState("");

 
  const handleRegister = () => {
    if (!name || !email || !password || !role || (role === "Mess Representative" && !mess)) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    const userData = {
      name,
      email,
      password,
      role,
      mess: role === "Mess Representative" ? mess : null,
    };

    console.log("User Registered: ", userData);
    Alert.alert("Success", "User registered successfully!");
    // Reset the form
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    setMess("");
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add User</Text>
        
      </View>

      {/* Name Input */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter Name"
      />

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        keyboardType="email-address"
      />

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
        secureTextEntry={true}
      />

      {/* Role Dropdown */}
      <Text style={styles.label}>Role</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="Select Role" value="" />
          <Picker.Item label="Mess Representative" value="Mess Representative" />
          <Picker.Item label="Coordinator" value="Coordinator" />
          <Picker.Item label="Supervisor" value="Supervisor" />
        </Picker>
      </View>

      {/* Mess Dropdown (Visible Only for Mess Representative) */}
      {role === "Mess Representative" && (
        <>
          <Text style={styles.label}>Mess</Text>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={mess}
              onValueChange={(itemValue) => setMess(itemValue)}
            >
              <Picker.Item label="Select Mess" value="" />
              {Array.from({ length: 8 }, (_, i) => (
                <Picker.Item key={i} label={`Mess ${i + 1}`} value={`Mess ${i + 1}`} />
              ))}
            </Picker>
          </View>
        </>
      )}

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  registerButton: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
  loginButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Admin;
