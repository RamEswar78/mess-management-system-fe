import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

const backgroundImage = require('../../../assets/images/background.png'); // Local image

const RepresentativePage = () => {
  const messTimetable = [
    { day: 'Monday', breakfast: '8:00 AM', lunch: '1:00 PM', dinner: '8:00 PM' },
    { day: 'Tuesday', breakfast: '8:00 AM', lunch: '1:00 PM', dinner: '8:00 PM' },
    { day: 'Wednesday', breakfast: '8:00 AM', lunch: '1:00 PM', dinner: '8:00 PM' },
    { day: 'Thursday', breakfast: '8:00 AM', lunch: '1:00 PM', dinner: '8:00 PM' },
    { day: 'Friday', breakfast: '8:00 AM', lunch: '1:00 PM', dinner: '8:00 PM' },
    { day: 'Saturday', breakfast: '8:00 AM', lunch: '1:00 PM', dinner: '8:00 PM' },
    { day: 'Sunday', breakfast: '8:00 AM', lunch: '1:00 PM', dinner: '8:00 PM' },
  ];

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.day}</Text>
      <Text style={styles.cell}>{item.breakfast}</Text>
      <Text style={styles.cell}>{item.lunch}</Text>
      <Text style={styles.cell}>{item.dinner}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Logo and Title Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Image source={require('../../../assets/images/rgulogo2.png')} style={styles.logoImage} />
        </View>
        <Text style={styles.title}>Mess Complaint Management System</Text>
      </View>

      {/* Welcome Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello, Mess Representative</Text>
      </View>

      {/* Mess Timetable Section */}
      <View style={styles.tableContainer}>
        <Text style={styles.tableHeader}>Mess Timetable</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.row}>
            <Text style={styles.headerCell}>Day</Text>
            <Text style={styles.headerCell}>Breakfast</Text>
            <Text style={styles.headerCell}>Lunch</Text>
            <Text style={styles.headerCell}>Dinner</Text>
          </View>
          {/* Table Data */}
          <FlatList
            data={messTimetable}
            renderItem={renderRow}
            keyExtractor={(item) => item.day}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, // Reduced padding for better fit on the screen
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderRadius: 10,
    margin: 10,
  },
  logoContainer: {
    flexDirection: 'column', // Align logo and text vertically
    alignItems: 'center', // Center vertically
    marginTop: 0, // Added margin to space out from top
    marginBottom: 15, // Added margin between logo and title
  },
  logo: {
    width: 90, // Reduced width for logo background circle
    height: 90, // Reduced height for logo background circle
    backgroundColor: '#1E7C2F',
    borderRadius: 45, // Circular background for the logo
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Space between logo and text
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoImage: {
    width: 60, // Reduced size for logo image
    height: 60,
    borderRadius: 30, // Circular logo image
  },
  title: {
    color: '#1E7C2F',
    fontSize: 20, // Reduced font size for title
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20, // Adjusted font size for welcome message
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 10,
  },
  tableContainer: {
    marginTop: 15,
  },
  tableHeader: {
    fontSize: 18, // Adjusted font size for timetable header
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  cell: {
    flex: 1,
    padding: 12, // Reduced padding for better fit
    textAlign: 'center',
    fontSize: 14, // Reduced font size
    color: '#333',
  },
  headerCell: {
    flex: 1,
    padding: 12,
    textAlign: 'center',
    fontSize: 14, // Adjusted font size for header cells
    fontWeight: 'bold',
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
});

export default RepresentativePage;
