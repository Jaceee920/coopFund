import React, { useState, useRef, useEffect } from "react";
import { View, Animated, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../services/supabaseClient";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const emailShake = useRef(new Animated.Value(0)).current;
  const passwordShake = useRef(new Animated.Value(0)).current;

  // Shake animation function
  const shakeAnimation = (shakeRef) => {
    shakeRef.setValue(0);
    Animated.sequence([
      Animated.timing(shakeRef, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeRef, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeRef, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeRef, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Login Failed", "Email and password are required.");
      return;
    }
  
    try {
      // Fetch user details from Supabase `admin` table
      const { data: user, error } = await supabase
        .from("admin")
        .select("*")
        .eq("email", email)
        .single();
  
      if (error || !user) {
        Alert.alert("Login Failed", "Invalid email or password.");
        return;
      }
  
      // Compare the entered password with the stored one
      if (user.password !== password) {
        Alert.alert("Login Failed", "Incorrect password.");
        return;
      }
  
      // Check if the admin status is active
      if (user.status !== "Active") {
        Alert.alert("Login Failed", "User is not active.");
        return;
      }
  
      // Store login session in AsyncStorage
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
  
      navigation.reset({
        index: 0,
        routes: [{ name: "Drawer" }], // Make sure "Drawer" exists in Stack Navigation
      });
      
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Login Failed", "An error occurred.");
    }
  };
  
  

  const handleBiometricAuth = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem("userEmail");
      const savedPassword = await AsyncStorage.getItem("userPassword");
  
      if (!savedEmail || !savedPassword) {
        Alert.alert("No saved credentials", "Please login manually first.");
        return;
      }
  
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with your fingerprint",
        fallbackLabel: "Use Password",
      });
  
      if (result.success) {
        const { data: user, error } = await supabase
          .from("admin")
          .select("*")
          .eq("email", savedEmail)
          .single();
  
        if (error || !user) {
          Alert.alert("Authentication Failed", "User not found.");
          return;
        }
  
        if (user.password !== savedPassword) {
          Alert.alert("Authentication Failed", "Incorrect password.");
          return;
        }
  
        if (user.status !== "Active") {
          Alert.alert("Login Failed", "User is not active.");
          return;
        }
  
        navigation.reset({ index: 0, routes: [{ name: "Dashboard" }] });
      } else {
        Alert.alert("Authentication Failed", "Please try again.");
      }
    } catch (error) {
      console.error("Biometric Auth Error:", error);
      Alert.alert("Authentication Error", error.message);
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require("../../assets/logo2.png")} style={styles.logo} />
        <Text style={styles.header}>Welcome Back!</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showButton}>
            <Text style={styles.showButtonText}>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {isBiometricSupported && (
          <TouchableOpacity style={styles.fingerprintButton} onPress={handleBiometricAuth}>
            <Ionicons name="finger-print" size={24} color="#007BFF" style={styles.fingerprintIcon} />
            <Text style={styles.fingerprintButtonText}>Login with Fingerprint</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  innerContainer: {
    width: "90%",
    maxWidth: 400, // Limits width on large screens
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
  },
  showButton: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  showButtonText: {
    color: "#007BFF",
    fontSize: 14,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  fingerprintButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  fingerprintIcon: {
    marginRight: 8,
  },
  fingerprintButtonText: {
    marginLeft: 10,
    color: "#3498db",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: "#007BFF",
    fontSize: 16,
  },
});

export default LoginScreen;
