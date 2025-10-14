// 특정 사용자에게 관리자 권한을 부여하는 스크립트
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where, updateDoc, doc } = require('firebase/firestore');

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
const db = getFirestore(app);

// 관리자 권한 부여 함수
async function grantAdminAccess() {
  try {
    console.log('관리자 권한 부여 시작...');
    
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    let updatedCount = 0;
    
    for (const userDoc of snapshot.docs) {
      const userData = userDoc.data();
      
      // sprince1004@naver.com 사용자에게 관리자 권한 부여
      if (userData.email === 'sprince1004@naver.com') {
        await updateDoc(doc(db, 'users', userDoc.id), {
          role: 'admin',
          updatedAt: new Date()
        });
        console.log(`✅ 관리자 권한 부여: ${userData.email}`);
        updatedCount++;
      } else if (!userData.role) {
        // 다른 사용자들에게는 기본 역할 부여
        await updateDoc(doc(db, 'users', userDoc.id), {
          role: 'user',
          updatedAt: new Date()
        });
        console.log(`✅ 기본 역할 부여: ${userData.email}`);
        updatedCount++;
      }
    }
    
    console.log(`🎉 총 ${updatedCount}명의 사용자 권한이 업데이트되었습니다!`);
    
  } catch (error) {
    console.error('❌ 권한 부여 중 오류:', error);
  }
}

// 스크립트 실행
if (require.main === module) {
  grantAdminAccess()
    .then(() => {
      console.log('✅ 스크립트 실행 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 스크립트 실행 실패:', error);
      process.exit(1);
    });
}

module.exports = { grantAdminAccess };
