import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

const ViewStudents = () => {
  const [selectedMess, setSelectedMess] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendURL = "https://your-backend-url/render/api"; // Replace with your backend URL

  const fetchStudents = async (mess) => {
    setLoading(true);
    setStudents([]);
    setSelectedMess(mess);

    try {
      const response = await fetch(`${backendURL}/students?mess=${mess}`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data); // Assuming the API returns an array of student objects
      } else {
        console.error("Failed to fetch students:", response.status);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>View Students</Text>

      <View style={styles.messContainer}>
        {Array.from({ length: 8 }, (_, i) => `mess${i + 1}`).map((mess) => (
          <TouchableOpacity
            key={mess}
            style={styles.messBlock}
            onPress={() => fetchStudents(mess)}
          >
            <Text style={styles.messText}>{mess.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.studentsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#1E7C2F" />
        ) : (
          <>
            {selectedMess && (
              <Text style={styles.selectedMessText}>
                Students in {selectedMess.toUpperCase()}
              </Text>
            )}
            {students.length > 0 ? (
              students.map((student, index) => (
                <View key={index} style={styles.studentCard}>
                  <Text style={styles.studentText}>
                    Name: {student.name}
                  </Text>
                  <Text style={styles.studentText}>
                    Email: {student.email}
                  </Text>
                  <Text style={styles.studentText}>
                    Role: {student.role}
                  </Text>
                </View>
              ))
            ) : (
              selectedMess && !loading && (
                <Text style={styles.noDataText}>No students found.</Text>
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
  studentsContainer: {
    marginTop: 20,
  },
  selectedMessText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E7C2F",
    marginBottom: 10,
  },
  studentCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1E7C2F",
  },
  studentText: {
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

export default ViewStudents;
