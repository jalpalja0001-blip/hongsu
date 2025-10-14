// 테스트 사용자 생성 스크립트
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

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

// 테스트 사용자 생성 함수
async function createTestUser() {
  try {
    console.log('테스트 사용자 생성 시작...');
    
    const email = 'sprince1004@naver.com';
    const password = 'password123';
    
    // 사용자 생성 시도
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ 사용자 생성 성공:', userCredential.user.email);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('ℹ️ 사용자가 이미 존재합니다. 로그인 시도...');
        try {
          const signInCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log('✅ 로그인 성공:', signInCredential.user.email);
        } catch (signInError) {
          console.error('❌ 로그인 실패:', signInError.message);
        }
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
  createTestUser()
    .then(() => {
      console.log('✅ 스크립트 실행 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 스크립트 실행 실패:', error);
      process.exit(1);
    });
}

module.exports = { createTestUser };
