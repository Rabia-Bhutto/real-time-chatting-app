import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";


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
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup}
