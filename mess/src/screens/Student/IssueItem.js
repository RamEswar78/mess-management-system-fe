import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const IssueItem = ({ id, title, status, upvotes, isUpvoted, onLike }) => {
  return (
    <View style={styles.issueItem}>
      <View style={styles.issueHeader}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={onLike} style={styles.likeButton}>
          <Icon
            name={isUpvoted ? "thumb-up" : "thumb-up-off-alt"}
            size={24}
            color={isUpvoted ? "#007bff" : "#000"}
          />
          <Text style={styles.likeText}>{upvotes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  issueItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3, // For Android shadow
  },
  issueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  status: {
    fontSize: 14,
    color: "#007bff",
    alignSelf: "flex-end",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#000",
  },
});

export default IssueItem;
