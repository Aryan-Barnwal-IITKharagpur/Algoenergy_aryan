// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPpYsnwErxSPsumPGrQnYtVjTPym6xV_U",
  authDomain: "cdcalgoenergy.firebaseapp.com",
  projectId: "cdcalgoenergy",
  storageBucket: "cdcalgoenergy.appspot.com",
  messagingSenderId: "165584956351",
  appId: "1:165584956351:web:d4ed03a63d8d0caaa4cf0a"
};

// Initialize Firebase
export const  FIREBASE_APP = initializeApp(firebaseConfig);
export const  FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const  FIREBASE_DB = getFirestore(FIREBASE_APP);
