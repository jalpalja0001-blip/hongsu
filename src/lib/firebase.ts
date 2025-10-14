// Firebase SDK를 CDN에서 직접 로드하는 방식
// 이 방법은 Vercel의 모듈 로딩 문제를 우회합니다

// Firebase SDK 로딩 함수
const loadFirebaseSDK = async () => {
  if (typeof window === 'undefined') return null;
  
  // Firebase SDK가 이미 로드되었는지 확인
  if (window.firebase) {
    console.log('Firebase SDK already loaded');
    return window.firebase;
  }

  console.log('Loading Firebase SDK from CDN...');
  
  return new Promise((resolve, reject) => {
    // Firebase App SDK 로드
    const appScript = document.createElement('script');
    appScript.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
    appScript.async = true;
    
    appScript.onload = () => {
      console.log('Firebase App SDK loaded');
      
      // Firebase Auth SDK 로드
      const authScript = document.createElement('script');
      authScript.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
      authScript.async = true;
      
      authScript.onload = () => {
        console.log('Firebase Auth SDK loaded');
        
        // Firebase Firestore SDK 로드
        const firestoreScript = document.createElement('script');
        firestoreScript.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
        firestoreScript.async = true;
        
        firestoreScript.onload = () => {
          console.log('Firebase Firestore SDK loaded');
          
          // Firebase Storage SDK 로드
          const storageScript = document.createElement('script');
          storageScript.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
          storageScript.async = true;
          
          storageScript.onload = () => {
            console.log('Firebase Storage SDK loaded');
            resolve(window.firebase);
          };
          
          storageScript.onerror = (error) => {
            console.error('Firebase Storage SDK load failed:', error);
            reject(error);
          };
          
          document.head.appendChild(storageScript);
        };
        
        firestoreScript.onerror = (error) => {
          console.error('Firebase Firestore SDK load failed:', error);
          reject(error);
        };
        
        document.head.appendChild(firestoreScript);
      };
      
      authScript.onerror = (error) => {
        console.error('Firebase Auth SDK load failed:', error);
        reject(error);
      };
      
      document.head.appendChild(authScript);
    };
    
    appScript.onerror = (error) => {
      console.error('Firebase App SDK load failed:', error);
      reject(error);
    };
    
    document.head.appendChild(appScript);
  });
};

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDD8AG4WZT-XjFQaX5WcQOLs80XEcTThi4",
  authDomain: "jalpalja.firebaseapp.com",
  projectId: "jalpalja",
  storageBucket: "jalpalja.firebasestorage.app",
  messagingSenderId: "875140863009",
  appId: "1:875140863009:web:6828a1b6b414ca794e3f60",
  measurementId: "G-NNG7P8ZY5F"
};

// Firebase 초기화 함수
let firebaseInstance: any = null;

const initializeFirebase = async () => {
  if (firebaseInstance) {
    return firebaseInstance;
  }

  try {
    const firebase = await loadFirebaseSDK();
    if (!firebase) {
      throw new Error('Firebase SDK failed to load');
    }

    console.log('Initializing Firebase with config:', firebaseConfig);
    
    // Firebase 앱 초기화
    const app = firebase.initializeApp(firebaseConfig);
    
    // Firebase 서비스 초기화
    const auth = firebase.auth();
    const db = firebase.firestore();
    const storage = firebase.storage();
    
    firebaseInstance = { app, auth, db, storage, firebase };
    
    console.log('Firebase initialized successfully');
    return firebaseInstance;
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    throw error;
  }
};

// Firebase 서비스들을 가져오는 함수들
export const getAuth = async () => {
  const firebase = await initializeFirebase();
  return firebase?.auth || null;
};

export const getFirestore = async () => {
  const firebase = await initializeFirebase();
  return firebase?.db || null;
};

export const getStorage = async () => {
  const firebase = await initializeFirebase();
  return firebase?.storage || null;
};

export const getAnalytics = async () => {
  if (typeof window === 'undefined') return null;
  
  const firebase = await initializeFirebase();
  if (!firebase?.firebase?.analytics) return null;
  
  return firebase.firebase.analytics();
};

// 기존 호환성을 위한 export (deprecated)
export const auth = null;
export const db = null;
export const storage = null;
export const analytics = null;

export default initializeFirebase;