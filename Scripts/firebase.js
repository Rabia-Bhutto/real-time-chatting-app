import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import {
  // authenticaion
  createUserWithEmailAndPassword,
  // sigin
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  // Change Detection
  onAuthStateChanged,
  // Email Verification
  sendEmailVerification,
  // google
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  // manage users
  signOut,
  updateProfile,
  deleteUser,

} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  // database
  where,
  limit,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getFirestore,
  setDoc,
  doc,
  collection,
  addDoc
}
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYbBhe1yiyyjmLsKxY-gYkoGAJAzi4LN4",
  authDomain: "real-time-chatting-app-7d3f7.firebaseapp.com",
  projectId: "real-time-chatting-app-7d3f7",
  storageBucket: "real-time-chatting-app-7d3f7.firebasestorage.app",
  messagingSenderId: "306585372519",
  appId: "1:306585372519:web:af03e2493cb0dbd41cd1c2",
  measurementId: "G-2E5GMQ463J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {
  // authenticaion
  createUserWithEmailAndPassword,
  // sigin
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  // Change Detection
  onAuthStateChanged,
  // Email Verification
  sendEmailVerification,
  // google
  auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  // manage users
  signOut,
  updateProfile,
  deleteUser,

  // Database
  where,
  limit,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getFirestore,
  setDoc,
  doc,
  collection,
  addDoc,
  db
}
