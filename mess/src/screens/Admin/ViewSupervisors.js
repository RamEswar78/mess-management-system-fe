import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

const ViewMessSupervisor = () => {
  const [selectedMess, setSelectedMess] = useState(null);
  const [Supervisor, setSupervisor] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendURL = "https://your-backend-url/render/api"; // Replace with your backend URL

  const fetchSupervisor = async (mess) => {
    setLoading(true);
    setSupervisor([]);
    setSelectedMess(mess);

    try {
      const response = await fetch(`${backendURL}/messSupervisor?mess=${mess}`);
      if (response.ok) {
        const data = await response.json();
        setSupervisor(data); // Assuming the API returns an array of mess supervisor objects
      } else {
        console.error("Failed to fetch mess Supervisor:", response.status);
      }
    } catch (error) {
      console.error("Error fetching mess Supervisor:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>View Mess Supervisor</Text>

      <View style={styles.messContainer}>
        {Array.from({ length: 8 }, (_, i) => `mess${i + 1}`).map((mess) => (
          <TouchableOpacity
            key={mess}
            style={styles.messBlock}
            onPress={() => fetchSupervisor(mess)}
          >
            <Text style={styles.messText}>{mess.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.SupervisorContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#1E7C2F" />
        ) : (
          <>
            {selectedMess && (
              <Text style={styles.selectedMessText}>
                Mess Supervisor in {selectedMess.toUpperCase()}
              </Text>
            )}
            {Supervisor.length > 0 ? (
              Supervisor.map((supervisor, index) => (
                <View key={index} style={styles.supervisorCard}>
                  <Text style={styles.supervisorText}>
                    Name: {supervisor.name}
                  </Text>
                  <Text style={styles.supervisorText}>
                    Email: {supervisor.email}
                  </Text>
                  <Text style={styles.supervisorText}>
                    Role: {supervisor.role}
                  </Text>
                </View>
              ))
            ) : (
              selectedMess && !loading && (
                <Text style={styles.noDataText}>No Supervisor found.</Text>
              )
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e0f2f1",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E7C2F",
    textAlign: "center",
    marginBottom: 20,
  },
  messContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  messBlock: {
    width: "48%",
    backgroundColor: "#1E7C2F",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  messText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  SupervisorContainer: {
    marginTop: 20,
  },
  selectedMessText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E7C2F",
    marginBottom: 10,
  },
  supervisorCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1E7C2F",
  },
  supervisorText: {
    fontSize: 16,
    color: "#333",
  },
  noDataText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 10,
  },
});

export default ViewMessSupervisor;
