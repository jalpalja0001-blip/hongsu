// Firebase SDK를 CDN에서 동적으로 로드하는 방식
declare global {
  interface Window {
    firebase: any;
  }
}

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

// Firebase SDK 로드 함수
async function loadFirebaseSDK() {
  if (typeof window === 'undefined') return null;
  
  if (window.firebase) {
    return window.firebase;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
    script.onload = () => {
      const authScript = document.createElement('script');
      authScript.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js';
      authScript.onload = () => {
        const firestoreScript = document.createElement('script');
        firestoreScript.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js';
        firestoreScript.onload = () => {
          const storageScript = document.createElement('script');
          storageScript.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js';
          storageScript.onload = () => {
            const analyticsScript = document.createElement('script');
            analyticsScript.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics-compat.js';
            analyticsScript.onload = () => {
              window.firebase.initializeApp(firebaseConfig);
              resolve(window.firebase);
            };
            analyticsScript.onerror = reject;
            document.head.appendChild(analyticsScript);
          };
          storageScript.onerror = reject;
          document.head.appendChild(storageScript);
        };
        firestoreScript.onerror = reject;
        document.head.appendChild(firestoreScript);
      };
      authScript.onerror = reject;
      document.head.appendChild(authScript);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Firebase 인스턴스들
let firebase: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let analytics: any = null;

// Firebase 초기화 함수
export async function initializeFirebase() {
  if (firebase) return firebase;
  
  firebase = await loadFirebaseSDK();
  if (firebase) {
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();
    analytics = firebase.analytics();
  }
  return firebase;
}

// Firebase 서비스들 가져오기 함수
export async function getAuth() {
  if (!auth) await initializeFirebase();
  return auth;
}

export async function getFirestore() {
  if (!db) await initializeFirebase();
  return db;
}

export async function getStorage() {
  if (!storage) await initializeFirebase();
  return storage;
}

export async function getAnalytics() {
  if (!analytics) await initializeFirebase();
  return analytics;
}

// 직접 export (기존 코드와 호환성을 위해)
export { auth, db, storage, analytics };

// 기본 export
export default { initializeFirebase, getAuth, getFirestore, getStorage, getAnalytics };