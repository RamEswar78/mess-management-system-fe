import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "user_session";

const SessionManager = {
  saveSession: async (sessionData) => {
    try {
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      return true;
    } catch (error) {
      console.error("Error saving session:", error);
      return false;
    }
  },

  getSession: async () => {
    try {
      const session = await AsyncStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch (error) {
      console.error("Error retrieving session:", error);
      return null;
    }
  },

  clearSession: async () => {
    try {
      await AsyncStorage.removeItem(SESSION_KEY);
      return true;
    } catch (error) {
      console.error("Error clearing session:", error);
      return false;
    }
  },
};

export default SessionManager;
