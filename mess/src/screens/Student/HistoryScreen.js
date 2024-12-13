import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const IssueHistory = () => {
  const [issueHistory, setIssueHistory] = useState([
    {
      title: 'Late timings',
      status: 'pending...',
      date: '2023-03-08',
    },
    {
      title: 'No egg form',
      status: 'pending...',
      date: '2023-03-07',
    },
    {
      title: 'Rice is not good',
      status: 'Resolved',
      date: '2023-03-06',
    },
  ]);

  const renderIssueItem = (item) => {
    return (
      <View style={styles.issueItem} key={item.title}>
        <View style={styles.issueTitle}>
          <Text style={styles.issueTitleText}>{item.title}</Text>
        </View>
        <View style={styles.issueStatus}>
          <Text style={styles.issueStatusText}>{item.status}</Text>
        </View>
        <View style={styles.issueDate}>
          <Text style={styles.issueDateText}>{item.date}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Issue History</Text>
      {issueHistory.map((item) => renderIssueItem(item))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  issueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  issueTitle: {
    flex: 1,
  },
  issueTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  issueStatus: {
    flex: 1,
  },
  issueStatusText: {
    fontSize: 16,
    color: '#007BFF',
  },
  issueDate: {
    flex: 1,
    alignItems: 'flex-end',
  },
  issueDateText: {
    fontSize: 14,
    color: '#888',
  },
});

export default IssueHistory;