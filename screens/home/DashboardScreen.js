import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useAuth } from "../../services/auth";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DashboardScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isWeb = width > 768;
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(isWeb);

  return (
    <View style={styles.container}>
      {/* Sidebar Navigation */}
      <View style={[styles.sidebar, { width: isSidebarOpen ? 250 : 80 }]}> 
        <TouchableOpacity onPress={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.menuButton}>
          <Ionicons name={isSidebarOpen ? "chevron-back" : "menu"} size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Dashboard")}> 
          <Ionicons name="home" size={24} color="#333" />
          {isSidebarOpen && <Text style={styles.navText}>Dashboard</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Member")}> 
          <Ionicons name="people-outline" size={24} color="#333" />
          {isSidebarOpen && <Text style={styles.navText}>Member</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Reports")}> 
          <Ionicons name="document" size={24} color="#333" />
          {isSidebarOpen && <Text style={styles.navText}>Reports</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Messages")}> 
          <Ionicons name="chatbubble" size={24} color="#333" />
          {isSidebarOpen && <Text style={styles.navText}>Messages</Text>}
        </TouchableOpacity>
        <TouchableOpacity 
  style={styles.navItem} 
  onPress={() => {
    logout();  // Calls logout function
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],  // Ensures user can't go back to Dashboard
    });
  }}
> 
  <Ionicons name="log-out" size={24} color="red" />
  {isSidebarOpen && <Text style={[styles.navText, { color: "red" }]}>Log Out</Text>}
</TouchableOpacity>

      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent}>
        <Text style={styles.header}>Welcome, {user?.name}!</Text>
        {/* Example Dashboard Cards */}
        <View style={styles.card}><Text>Today: 12,584 Steps</Text></View>
        <View style={styles.card}><Text>Resting HR: 62 bpm</Text></View>
        <View style={styles.card}><Text>New Orders: 5</Text></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", flex: 1, backgroundColor: "#F8F9FA" },
  sidebar: { backgroundColor: "#fff", paddingVertical: 20, height: "100%", borderRightWidth: 1, borderColor: "#ddd" },
  menuButton: { padding: 15, alignItems: "center" },
  navItem: { flexDirection: "row", alignItems: "center", padding: 15 },
  navText: { marginLeft: 10, fontSize: 16, color: "#333" },
  mainContent: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 10, marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
});

export default DashboardScreen;
