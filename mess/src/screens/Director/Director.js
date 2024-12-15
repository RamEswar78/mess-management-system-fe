import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const IssueItem = ({ title, status, upvotes, onUpvote }) => {
  return (
    <TouchableOpacity onPress={onUpvote} style={styles.issueItem}>
      <View style={styles.issueContent}>
        <Text style={styles.issueTitle}>{title}</Text>
        <Text style={styles.issueStatus}>{status}</Text>
      </View>
      <View style={styles.upvoteContainer}>
        <Icon name="thumbs-up-outline" size={24} color="#007bff" />
        <Text style={styles.upvoteCount}>{upvotes}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Director = () => {
  const [issues, setIssues] = useState([
    { title: 'Late timings', status: 'pending...', upvotes: 0 },
    { title: 'The Dosa Day', status: 'pending...', upvotes: 0 },
    { title: 'Rice is not good', status: 'Resolved', upvotes: 0 },
  ]);

  const handleUpvote = (index) => {
    setIssues((prevIssues) => {
      const updatedIssues = [...prevIssues];
      updatedIssues[index].upvotes += 1;
      return updatedIssues;
    });
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>All Issues</Text>
      <View style={styles.issuesList}>
        {issues.map((issue, index) => (
          <IssueItem
            key={index}
            title={issue.title}
            status={issue.status}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  issuesList: {
    marginTop: 10,
  },
  issueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  issueContent: {
    flex: 1,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  issueStatus: {
    fontSize: 14,
    color: '#888',
  },
  upvoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upvoteCount: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default Director;
