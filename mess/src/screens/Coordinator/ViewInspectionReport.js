import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList, Alert } from "react-native";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import { Picker } from "@react-native-picker/picker"; // Updated Picker

const ViewInspectionReports = () => {
  const [dates, setDates] = useState([]);
  const [messNumbers, setMessNumbers] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMess, setSelectedMess] = useState("");
  const [inspectionReports, setInspectionReports] = useState([]);

  // Mock API response for dates and mess numbers
  useEffect(() => {
    const mockDates = ["2024-12-10", "2024-12-11", "2024-12-12", "2024-12-13"];
    const mockMessNumbers = ["1", "2", "3"];

    setDates(mockDates);
    setMessNumbers(mockMessNumbers);
  }, []);

  // Mock API response for fetching reports based on selected date and mess number
  const fetchReports = () => {
    if (!selectedDate || !selectedMess) {
      Alert.alert("Please select both date and mess number.");
      return;
    }

    const mockReports = [
      {
        messNumber: selectedMess,
        date: selectedDate,
        details:
          "Report details for mess " + selectedMess + " on " + selectedDate,
      },
      {
        messNumber: selectedMess,
        date: selectedDate,
        details:
          "Additional report for mess " + selectedMess + " on " + selectedDate,
      },
    ];

    setInspectionReports(mockReports);
  };

  // Generate PDF from the reports using expo-print
  const generatePDF = async () => {
    if (inspectionReports.length === 0) {
      Alert.alert("No reports available to download.");
      return;
    }

    // Create HTML content for the PDF
    const htmlContent = `
      <h1>Inspection Reports</h1>
      ${inspectionReports
        .map(
          (report) => `
          <h2>Report for Mess ${report.messNumber} on ${report.date}</h2>
          <p><strong>Details:</strong> ${report.details}</p>
        `
        )
        .join("")}
    `;

    try {
      // Create a PDF from the HTML content
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
      });

      // Save the file to the device file system
      const fileUri = FileSystem.documentDirectory + "inspection_reports.pdf";
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      Alert.alert("Download Complete!", `PDF saved at: ${fileUri}`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert("Error", "Failed to generate PDF.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>View Inspection Reports</Text>

      <Picker
        selectedValue={selectedMess}
        onValueChange={(itemValue) => setSelectedMess(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Mess Number" value="" />
        {messNumbers.map((messNumber, index) => (
          <Picker.Item
            key={index}
            label={`Mess ${messNumber}`}
            value={messNumber}
          />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedDate}
        onValueChange={(itemValue) => setSelectedDate(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Date" value="" />
        {dates.map((date, index) => (
          <Picker.Item key={index} label={date} value={date} />
        ))}
      </Picker>

      <Button title="Fetch Reports" onPress={fetchReports} />

      {inspectionReports.length > 0 && (
        <FlatList
          data={inspectionReports}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.reportCard}>
              <Text>Mess: {item.messNumber}</Text>
              <Text>Date: {item.date}</Text>
              <Text>Details: {item.details}</Text>
            </View>
          )}
        />
      )}

      {inspectionReports.length > 0 && (
        <Button title="Download Reports as PDF" onPress={generatePDF} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  picker: { height: 50, width: "100%", marginBottom: 16 },
  reportCard: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
  },
});

export default ViewInspectionReports;
