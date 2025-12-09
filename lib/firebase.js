
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDVjz5ZVpk08yZS12pKWdYkwUiHpNxxMFg",
  authDomain: "zubi-blog-9ebf5.firebaseapp.com",
  projectId: "zubi-blog-9ebf5",
  storageBucket: "zubi-blog-9ebf5.firebasestorage.app",
  messagingSenderId: "873329232736",
  appId: "1:873329232736:web:f9476493f6eaf4c8fbac05",
  measurementId: "G-GZJ7703DTN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);