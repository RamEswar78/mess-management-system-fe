import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const StudentHomePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Student</Text>
      </View>
      <View style={styles.welcomeText}>
        <Text style={styles.welcome}>Welcome Ram</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Feed Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Report an Issue</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Issues History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View-all Issues</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  welcomeText: {
    alignItems: 'center',
    marginTop: 30,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StudentHomePage;