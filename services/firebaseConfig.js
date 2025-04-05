import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMaA3mZkpS6vp05MOlxddrXQlPcZUwMZo",
  authDomain: "coop-8a66b.firebaseapp.com",
  projectId: "coop-8a66b",
  storageBucket: "coop-8a66b.appspot.com",
  messagingSenderId: "201417468119",
  appId: "1:201417468119:web:94aba0888342154a4b6892",
  measurementId: "G-3F9B01W4GK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth (without `firebase/auth/react-native`)
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
