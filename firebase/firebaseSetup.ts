// Importing necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";  // Initialize Firebase app
import { getFirestore } from "firebase/firestore";  // Get Firestore database instance

// Firebase configuration object with environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_apiKey,  // API key from environment variables
  authDomain: process.env.EXPO_PUBLIC_authDomain,  // Auth domain for Firebase Authentication
  projectId: process.env.EXPO_PUBLIC_projectId,  // Firebase project ID
  storageBucket: process.env.EXPO_PUBLIC_storageBucket,  // Cloud storage bucket for Firebase
  messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,  // Sender ID for Firebase Cloud Messaging
  appId: process.env.EXPO_PUBLIC_appId,  // Firebase application ID
};

// Initializing Firebase app with the above configuration
const app = initializeApp(firebaseConfig);

// Exporting Firestore database instance
export const database = getFirestore(app);  // Firestore instance to interact with Firebase's Firestore
