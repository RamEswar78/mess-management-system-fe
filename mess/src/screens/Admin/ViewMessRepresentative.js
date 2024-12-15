import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

const ViewMessRepresentatives = () => {
  const [selectedMess, setSelectedMess] = useState(null);
  const [representatives, setRepresentatives] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendURL = "https://your-backend-url/render/api"; // Replace with your backend URL

  const fetchRepresentatives = async (mess) => {
    setLoading(true);
    setRepresentatives([]);
    setSelectedMess(mess);

    try {
      const response = await fetch(`${backendURL}/messRepresentatives?mess=${mess}`);
      if (response.ok) {
        const data = await response.json();
        setRepresentatives(data); // Assuming the API returns an array of mess representative objects
      } else {
        console.error("Failed to fetch mess representatives:", response.status);
      }
    } catch (error) {
      console.error("Error fetching mess representatives:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>View Mess Representatives</Text>

      <View style={styles.messContainer}>
        {Array.from({ length: 8 }, (_, i) => `mess${i + 1}`).map((mess) => (
          <TouchableOpacity
            key={mess}
            style={styles.messBlock}
            onPress={() => fetchRepresentatives(mess)}
          >
            <Text style={styles.messText}>{mess.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.representativesContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#1E7C2F" />
        ) : (
          <>
            {selectedMess && (
              <Text style={styles.selectedMessText}>
                Mess Representatives in {selectedMess.toUpperCase()}
              </Text>
            )}
            {representatives.length > 0 ? (
              representatives.map((representative, index) => (
                <View key={index} style={styles.representativeCard}>
                  <Text style={styles.representativeText}>
                    Name: {representative.name}
                  </Text>
                  <Text style={styles.representativeText}>
                    Email: {representative.email}
                  </Text>
                  <Text style={styles.representativeText}>
                    Role: {representative.role}
                  </Text>
                </View>
              ))
            ) : (
              selectedMess && !loading && (
                <Text style={styles.noDataText}>No representatives found.</Text>
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
  representativesContainer: {
    marginTop: 20,
  },
  selectedMessText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E7C2F",
    marginBottom: 10,
  },
  representativeCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1E7C2F",
  },
  representativeText: {
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

export default ViewMessRepresentatives;
