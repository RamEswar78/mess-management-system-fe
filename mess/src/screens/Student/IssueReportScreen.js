import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useSession } from "../../SessionContext";
import axios from "axios";

const ReportIssue = () => {
  const { user } = useSession(); // Access session data
  const [role, setRole] = useState(null);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to upload images.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // Permission is automatically granted on iOS
  };
  

  const handleImageUpload = async () => {
    const permissionGranted = await requestStoragePermission();
    if (!permissionGranted) {
      Alert.alert('Permission Denied', 'Storage access is required to upload images.');
  useEffect(() => {
    if (user) {
      setRole(user.role);
      console.log("User session loaded:", user); // Log session data
    } else {
      Alert.alert("Error", "No session found! Please log in again.");
    }
  }, [user]);

  // Function to handle image upload using expo-image-picker and compress it
  const handleImageUpload = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access media library is required to upload images."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only images
        allowsEditing: true, // Enable cropping
        quality: 1, // Maximum image quality
      });

      if (!result.canceled) {
        // Compress the image
        const compressedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 800 } }], // Resize the image to a max width of 800px
          { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG } // Compress to 50% quality
        );

        setImage(compressedImage.uri); // Set the compressed image URI
      }
    } catch (error) {
      console.error("Image upload error:", error);
      Alert.alert("Error", "Failed to upload image.");
    }
  };

  const handleSubmit = async () => {
    if (!issueType || !description) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("category", issueType);
      formData.append("userId", user.id);
      if (image) {
        formData.append("image", {
          uri: image,
          name: "uploaded_image.jpg",
          type: "image/jpeg",
        });
      }

      const response = await axios.post(
        "https://mess-management-system-be-1.onrender.com/student/issues",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      Alert.alert("Success", "Your issue has been reported.");
    } catch (error) {
      console.error("API error:", error);
      Alert.alert("Error", "Failed to report the issue. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Issue</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Issue Type</Text>
        <TextInput
          style={styles.input}
          onChangeText={setIssueType}
          value={issueType}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          onChangeText={setDescription}
          value={description}
        />
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.uploadedImage} />}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  uploadButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#28A745",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ReportIssue;
