import { auth } from "./firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

// Custom Hook to track user auth state
export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? { name: user.displayName, email: user.email } : null);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return { user, logout };
};
