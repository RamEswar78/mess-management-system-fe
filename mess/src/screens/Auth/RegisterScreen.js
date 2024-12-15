import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";

const RegisterPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    // Input validation
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://mess-management-system-be-1.onrender.com/auth/register",
        {
          name: name,
          email: email,
          password: password,
          role: "student",
        }
      );

      if (response.status === 200) {
        alert("Success", "Registration successful!", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        Alert.alert("Error", "Unable to register. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Image
            source={require("../../../assets/images/rgulogo2.png")}
            style={styles.logoImage}
          />
        </View>
        <Text style={styles.title}>Mess Complaint Management System</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.heading}>Create New Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f2f1",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#1E7C2F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#1E7C2F",
    fontSize: 24,
    marginTop: 10,
  },
  formContainer: {
    alignItems: "center",
  },
  heading: {
    color: "#1E7C2F",
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1E7C2F",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  linkText: {
    color: "#1E7C2F",
    textDecorationLine: "underline",
  },
});

export default RegisterPage;
