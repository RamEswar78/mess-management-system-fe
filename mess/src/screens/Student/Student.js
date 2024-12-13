import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const StudentHomePage = () => {
  // Example mess timetable data
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, Ram</Text>
      </View>
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
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
});

export default StudentHomePage;
