import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const IssueItem = React.memo(({ id, title, status, onResolve, onPress }) => {
  return (
    <View style={styles.issueItem}>
      <TouchableOpacity onPress={onPress} style={styles.issueContent}>
        <Text style={styles.issueTitle}>{title}</Text>
        <Text style={styles.issueStatus}>{status}</Text>
      </TouchableOpacity>
      <View style={styles.resolveContainer}>
        <TouchableOpacity onPress={onResolve}>
          <Icon name="checkmark-circle-outline" size={24} color="#28a745" />
        </TouchableOpacity>
        <Text style={styles.resolveText}>Resolve</Text>
      </View>
    </View>
  );
});

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch issues with pagination
  useEffect(() => {
    const fetchIssues = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `https://mess-management-system-be-1.onrender.com/complaints/issues?page=${page}&limit=20`
        );

        const issuesData = response.data.issues;

        if (Array.isArray(issuesData)) {
          const newIssues = issuesData.filter(
            (newIssue) =>
              !issues.some(
                (existingIssue) => existingIssue.issueId === newIssue.issueId
              )
          );

          setIssues((prevIssues) => [...prevIssues, ...newIssues]);
          setHasMore(newIssues.length > 0);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
        Alert.alert("Error", "Failed to fetch issues from the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleResolve = async (id, index) => {
    try {
      const res = await axios.put(
        `https://mess-management-system-be-1.onrender.com/complaints/issues/status/${id}`,
        { status: "resolved" }
      );

      if (res.data.success) {
        setIssues((prevIssues) => {
          const updatedIssues = [...prevIssues];
          updatedIssues[index] = {
            ...updatedIssues[index],
            status: "Resolved",
          };
          return updatedIssues;
        });

        Alert.alert("Success", "Issue marked as resolved.");
      } else {
        Alert.alert("Error", "Failed to resolve the issue. Please try again.");
      }
    } catch (error) {
      console.error("Error updating issue status:", error);
      Alert.alert("Error", "Failed to update the issue status.");
    }
  };

  const openIssueModal = (issue) => {
    setSelectedIssue(issue);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedIssue(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Student</Text>
        <Icon name="ellipsis-vertical" size={24} color="#000" />
      </View>
      <Text style={styles.title}>All Issues</Text>

      <FlatList
        data={issues}
        renderItem={({ item, index }) => (
          <IssueItem
            key={item.issueId}
            id={item.issueId}
            title={item.description}
            status={item.status}
            onResolve={() => handleResolve(item.issueId, index)}
            onPress={() => openIssueModal(item)}
          />
        )}
        keyExtractor={(item) => item.issueId.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#007bff" /> : null
        }
      />

      <Modal
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType="slide"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {selectedIssue && (
                <>
                  <Text style={styles.modalTitle}>Issue Details</Text>
                  <Text style={styles.modalContent}>
                    <Text style={styles.modalSubTitle}>Description: </Text>
                    {selectedIssue.description}
                  </Text>
                  <Text style={styles.modalContent}>
                    <Text style={styles.modalSubTitle}>Status: </Text>
                    {selectedIssue.status}
                  </Text>
                  <TouchableOpacity
                    onPress={closeModal}
                    style={styles.modalCloseButton}
                  >
                    <Text style={styles.modalCloseText}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {hasMore && !loading && (
        <TouchableOpacity
          onPress={handleLoadMore}
          style={styles.loadMoreButton}
        >
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  issueItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
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
    fontWeight: "bold",
  },
  issueStatus: {
    fontSize: 14,
    color: "#888",
  },
  resolveContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resolveText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#28a745",
  },
  loadMoreButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  loadMoreText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalSubTitle: {
    fontWeight: "bold",
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AllIssues;
