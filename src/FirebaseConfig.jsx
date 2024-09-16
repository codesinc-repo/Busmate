// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvqUHysbjYNn3nAg8pNhD8eA0LmbSOlX0",
  authDomain: "bus-driver-navigation.firebaseapp.com",
  databaseURL: "https://bus-driver-navigation-default-rtdb.firebaseio.com",
  projectId: "bus-driver-navigation",
  storageBucket: "bus-driver-navigation.appspot.com",
  messagingSenderId: "649443007271",
  appId: "1:649443007271:web:edfa5fc2853891f63fe702",
  measurementId: "G-HGBFY01SR1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore and assign it to db
const auth = getAuth();
export { app, db, auth };
