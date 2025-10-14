// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase SDK 로딩 확인
console.log('Firebase SDK loaded successfully');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD8AG4WZT-XjFQaX5WcQOLs80XEcTThi4",
  authDomain: "jalpalja.firebaseapp.com",
  projectId: "jalpalja",
  storageBucket: "jalpalja.firebasestorage.app",
  messagingSenderId: "875140863009",
  appId: "1:875140863009:web:6828a1b6b414ca794e3f60",
  measurementId: "G-NNG7P8ZY5F"
};

// 디버깅을 위한 로그
console.log('Firebase Config:', firebaseConfig);
console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL: process.env.VERCEL,
  VERCEL_ENV: process.env.VERCEL_ENV
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
