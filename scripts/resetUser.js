// 사용자 삭제 후 재생성 스크립트
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, collection, getDocs, query, where, deleteDoc, doc } = require('firebase/firestore');

// Firebase 설정 (jalpalja 프로젝트)
const firebaseConfig = {
  apiKey: "AIzaSyDD8AG4WZT-XjFQaX5WcQOLs80XEcTThi4",
  authDomain: "jalpalja.firebaseapp.com",
  projectId: "jalpalja",
  storageBucket: "jalpalja.firebasestorage.app",
  messagingSenderId: "875140863009",
  appId: "1:875140863009:web:6828a1b6b414ca794e3f60",
  measurementId: "G-NNG7P8ZY5F"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 사용자 재설정 함수
async function resetUser() {
  try {
    console.log('사용자 재설정 시작...');
    
    const email = 'sprince1004@naver.com';
    const password = 'password123';
    
    // 1. Firestore에서 사용자 데이터 삭제
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const snapshot = await getDocs(q);
      
      for (const userDoc of snapshot.docs) {
        await deleteDoc(doc(db, 'users', userDoc.id));
        console.log('✅ Firestore 사용자 데이터 삭제됨');
      }
    } catch (error) {
      console.log('ℹ️ Firestore 사용자 데이터가 없거나 이미 삭제됨');
    }
    
    // 2. 새 사용자 생성 시도
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ 새 사용자 생성 성공:', userCredential.user.email);
      
      // 3. 관리자 권한 부여
      const { grantAdminAccess } = require('./grantAdminAccess');
      await grantAdminAccess();
      
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('ℹ️ 사용자가 여전히 존재합니다. Firebase 콘솔에서 수동으로 삭제해주세요.');
        console.log('1. Firebase 콘솔 → Authentication → Users');
        console.log('2. sprince1004@naver.com 사용자 삭제');
        console.log('3. 다시 이 스크립트 실행');
      } else {
        console.error('❌ 사용자 생성 실패:', error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error);
  }
}

// 스크립트 실행
if (require.main === module) {
  resetUser()
    .then(() => {
      console.log('✅ 스크립트 실행 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 스크립트 실행 실패:', error);
      process.exit(1);
    });
}

module.exports = { resetUser };
