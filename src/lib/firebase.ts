// Firebase v9+ 모듈 방식
import { initializeApp } from 'firebase/app';
import { getAuth as firebaseGetAuth } from 'firebase/auth';
import { getFirestore as firebaseGetFirestore } from 'firebase/firestore';
import { getStorage as firebaseGetStorage } from 'firebase/storage';
import { getAnalytics as firebaseGetAnalytics } from 'firebase/analytics';

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDD8AG4WZT-XjFQaX5WcQOLs80XEcTThi4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "jalpalja.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "jalpalja",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "jalpalja.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "875140863009",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:875140863009:web:6828a1b6b414ca794e3f60",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-NNG7P8ZY5F"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스들
export const auth = firebaseGetAuth(app);
export const db = firebaseGetFirestore(app);
export const storage = firebaseGetStorage(app);
export const analytics = typeof window !== 'undefined' ? firebaseGetAnalytics(app) : null;

// 기존 코드와 호환성을 위한 함수들
export const getAuth = () => auth;
export const getFirestore = () => db;
export const getStorage = () => storage;
export const getAnalytics = () => analytics;

export default app;