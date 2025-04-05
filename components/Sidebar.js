import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Sidebar = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        {/* App Logo or Title */}
        <Text style={styles.logo}>Admin Panel</Text>

        {/* Navigation Items */}
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Dashboard")}>
          <Ionicons name="home" size={24} color="#333" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Member")}>
          <Ionicons name="people-outline" size={24} color="#333" />
          <Text style={styles.navText}>Members</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Reports")}>
          <Ionicons name="document" size={24} color="#333" />
          <Text style={styles.navText}>Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Messages")}>
          <Ionicons name="chatbubble" size={24} color="#333" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={[styles.navItem, { marginTop: 20 }]} onPress={() => navigation.navigate("Login")}>
          <Ionicons name="log-out" size={24} color="red" />
          <Text style={[styles.navText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingVertical: 20 },
  logo: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  navItem: { flexDirection: "row", alignItems: "center", padding: 15 },
  navText: { marginLeft: 10, fontSize: 16, color: "#333" },
});

export default Sidebar;
