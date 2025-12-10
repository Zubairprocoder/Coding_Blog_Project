"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children = null }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Email login
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Email signup
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Google login
  const googleLogin = () => signInWithPopup(auth, new GoogleAuthProvider());

  // Facebook login
  const facebookLogin = () => signInWithPopup(auth, new FacebookAuthProvider());

  // Logout
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        googleLogin,
        facebookLogin,
        logout,
        loading,
      }}
    >
      {!loading ? (
        children
      ) : (
        <div className="text-center py-20">Loading...</div>
      )}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
