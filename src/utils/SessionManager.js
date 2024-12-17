// SessionManager.js
import * as SecureStore from "expo-secure-store";

const SessionManager = {
  // Save a key-value pair to SecureStore
  setItem: async (key, value) => {
    try {
      const stringValue = JSON.stringify(value); // Convert value to string
      await SecureStore.setItemAsync(key, stringValue);
      console.log(`${key} saved successfully.`);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  },

  // Retrieve the value for a specific key from SecureStore
  getItem: async (key) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value ? JSON.parse(value) : null; // Parse back to original format
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
      return null;
    }
  },

  // Remove a specific key from SecureStore
  removeItem: async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
      console.log(`${key} removed successfully.`);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  },

  // Clear all session data (Optional: Use with caution)
  clearSession: async () => {
    try {
      await SecureStore.deleteItemAsync("userRole");
      await SecureStore.deleteItemAsync("userToken");
      console.log("Session cleared successfully.");
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  },
};

export default SessionManager;
