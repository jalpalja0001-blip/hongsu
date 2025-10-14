// 모든 사용자에게 임시 비밀번호 설정하는 스크립트
const admin = require('firebase-admin');
const path = require('path');

// Firebase 설정 (jalpalja 프로젝트)
const serviceAccount = require(path.join(__dirname, '../newServiceAccountKey.json'));

// Firebase Admin 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'jalpalja'
});

// 모든 사용자에게 임시 비밀번호 설정
async function setAllUserPasswords() {
  try {
    console.log('🔐 모든 사용자에게 임시 비밀번호 설정 시작...');
    
    const auth = admin.auth();
    const listUsersResult = await auth.listUsers();
    const users = listUsersResult.users;
    
    console.log(`👥 총 ${users.length}명의 사용자 발견`);
    
    const tempPassword = 'password123';
    let updatedCount = 0;
    
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      console.log(`👤 사용자 ${i + 1}/${users.length}: ${user.email || user.uid} 비밀번호 설정 중...`);
      
      try {
        // 사용자 비밀번호 업데이트
        await auth.updateUser(user.uid, {
          password: tempPassword
        });
        
        console.log(`  ✅ ${user.email || user.uid} 비밀번호 설정 완료`);
        updatedCount++;
        
      } catch (error) {
        console.error(`  ❌ ${user.email || user.uid} 비밀번호 설정 실패:`, error.message);
      }
    }
    
    console.log(`\n🎉 총 ${updatedCount}명의 사용자 비밀번호가 설정되었습니다!`);
    console.log(`📝 임시 비밀번호: ${tempPassword}`);
    console.log('⚠️ 사용자들에게 새 비밀번호로 로그인하도록 안내해주세요.');
    
  } catch (error) {
    console.error('❌ 비밀번호 설정 실패:', error);
  } finally {
    process.exit(0);
  }
}

// 스크립트 실행
if (require.main === module) {
  setAllUserPasswords();
}

module.exports = { setAllUserPasswords };
