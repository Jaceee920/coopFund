import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Member = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Member List</Text>
      {/* Add your member list UI here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8F9FA" },
  title: { fontSize: 24, fontWeight: "bold" },
});

export default Member;
