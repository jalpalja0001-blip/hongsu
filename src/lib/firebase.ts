// Firebase v9+ 모듈 방식으로 복원
// CDN 방식에서 문제가 발생하여 안정적인 모듈 방식으로 되돌립니다.

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// 환경 변수 확인
if (!firebaseConfig.apiKey) {
  console.error('Firebase API Key가 설정되지 않았습니다.');
}
if (!firebaseConfig.projectId) {
  console.error('Firebase Project ID가 설정되지 않았습니다.');
}

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스들 초기화
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// 기본 export
export default { auth, db, storage, analytics };