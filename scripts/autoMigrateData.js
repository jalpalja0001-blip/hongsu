const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 마이그레이션 설정
const OLD_PROJECT_CONFIG = {
  projectId: 'hongsu-9d9c2',
  storageBucket: 'hongsu-9d9c2.firebasestorage.app',
  serviceAccountPath: './oldServiceAccountKey.json'
};

const NEW_PROJECT_CONFIG = {
  projectId: 'jalpalja',
  storageBucket: 'jalpalja.firebasestorage.app',
  serviceAccountPath: './newServiceAccountKey.json'
};

// 백업 디렉토리 생성
const backupDir = path.join(__dirname, '../backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// 기존 프로젝트에서 데이터 백업
async function backupOldData() {
  console.log('📦 기존 Firebase 프로젝트에서 데이터 백업 중...');
  
  try {
    // 기존 프로젝트 서비스 계정 키 로드
    const oldServiceAccount = require(OLD_PROJECT_CONFIG.serviceAccountPath);
    
    // 기존 프로젝트 초기화
    const oldApp = admin.initializeApp({
      credential: admin.credential.cert(oldServiceAccount),
      projectId: OLD_PROJECT_CONFIG.projectId,
      storageBucket: OLD_PROJECT_CONFIG.storageBucket
    }, 'oldApp');
    
    const oldDb = admin.firestore(oldApp);
    const oldStorage = admin.storage(oldApp);
    
    const backupData = {
      firestore: {},
      storage: [],
      auth: []
    };
    
    // Firestore 컬렉션 백업
    const collections = ['users', 'experiences', 'instagram_experiences', 'applications', 'userRoles'];
    
    for (const collectionName of collections) {
      console.log(`  📄 ${collectionName} 컬렉션 백업 중...`);
      const snapshot = await oldDb.collection(collectionName).get();
      backupData.firestore[collectionName] = [];
      
      snapshot.forEach(doc => {
        backupData.firestore[collectionName].push({
          id: doc.id,
          data: doc.data()
        });
      });
      
      console.log(`  ✅ ${collectionName}: ${snapshot.size}개 문서 백업 완료`);
    }
    
    // Storage 파일 목록 백업
    console.log('  📁 Storage 파일 목록 백업 중...');
    const [files] = await oldStorage.bucket().getFiles();
    backupData.storage = files.map(file => ({
      name: file.name,
      size: file.metadata.size,
      contentType: file.metadata.contentType,
      timeCreated: file.metadata.timeCreated
    }));
    console.log(`  ✅ Storage: ${files.length}개 파일 목록 백업 완료`);
    
    // 사용자 인증 정보 백업 (제한적)
    console.log('  👥 사용자 인증 정보 백업 중...');
    const listUsersResult = await admin.auth(oldApp).listUsers();
    backupData.auth = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      disabled: user.disabled,
      customClaims: user.customClaims
    }));
    console.log(`  ✅ Auth: ${listUsersResult.users.length}명 사용자 백업 완료`);
    
    // 백업 데이터 저장
    const backupFile = path.join(backupDir, 'firebase_backup.json');
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
    console.log(`  💾 백업 데이터 저장: ${backupFile}`);
    
    await admin.app('oldApp').delete();
    return backupData;
    
  } catch (error) {
    console.error('❌ 백업 중 오류 발생:', error);
    throw error;
  }
}

// 새 프로젝트로 데이터 복원
async function restoreToNewProject(backupData) {
  console.log('📥 새 Firebase 프로젝트로 데이터 복원 중...');
  
  try {
    // 새 프로젝트 서비스 계정 키 로드
    const newServiceAccount = require(NEW_PROJECT_CONFIG.serviceAccountPath);
    
    // 새 프로젝트 초기화
    const newApp = admin.initializeApp({
      credential: admin.credential.cert(newServiceAccount),
      projectId: NEW_PROJECT_CONFIG.projectId,
      storageBucket: NEW_PROJECT_CONFIG.storageBucket
    }, 'newApp');
    
    const newDb = admin.firestore(newApp);
    const newStorage = admin.storage(newApp);
    
    // Firestore 데이터 복원
    console.log('  📄 Firestore 데이터 복원 중...');
    for (const [collectionName, documents] of Object.entries(backupData.firestore)) {
      console.log(`    📄 ${collectionName} 컬렉션 복원 중...`);
      const batch = newDb.batch();
      
      documents.forEach((doc, index) => {
        if (index % 500 === 0) {
          batch.commit();
        }
        const docRef = newDb.collection(collectionName).doc(doc.id);
        batch.set(docRef, doc.data());
      });
      
      await batch.commit();
      console.log(`    ✅ ${collectionName}: ${documents.length}개 문서 복원 완료`);
    }
    
    // 사용자 인증 정보 복원
    console.log('  👥 사용자 인증 정보 복원 중...');
    for (const userData of backupData.auth) {
      try {
        await admin.auth(newApp).createUser({
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          emailVerified: userData.emailVerified,
          disabled: userData.disabled
        });
        
        if (userData.customClaims) {
          await admin.auth(newApp).setCustomUserClaims(userData.uid, userData.customClaims);
        }
      } catch (error) {
        console.log(`    ⚠️ 사용자 ${userData.email} 복원 실패: ${error.message}`);
      }
    }
    console.log(`  ✅ Auth: ${backupData.auth.length}명 사용자 복원 완료`);
    
    // Storage 파일 복원 (URL만 생성, 실제 파일은 수동 업로드 필요)
    console.log('  📁 Storage 파일 정보 복원 중...');
    const storageInfo = {
      totalFiles: backupData.storage.length,
      files: backupData.storage
    };
    const storageFile = path.join(backupDir, 'storage_files.json');
    fs.writeFileSync(storageFile, JSON.stringify(storageInfo, null, 2));
    console.log(`  ✅ Storage: ${backupData.storage.length}개 파일 정보 저장 완료`);
    console.log(`  📝 실제 파일은 수동으로 업로드해야 합니다: ${storageFile}`);
    
    await admin.app('newApp').delete();
    console.log('🎉 데이터 복원 완료!');
    
  } catch (error) {
    console.error('❌ 복원 중 오류 발생:', error);
    throw error;
  }
}

// 전체 마이그레이션 실행
async function runMigration() {
  console.log('🚀 Firebase 데이터 마이그레이션 시작...');
  console.log('='.repeat(60));
  
  try {
    // 1단계: 기존 데이터 백업
    console.log('1️⃣ 기존 데이터 백업');
    const backupData = await backupOldData();
    
    // 2단계: 새 프로젝트로 데이터 복원
    console.log('\n2️⃣ 새 프로젝트로 데이터 복원');
    await restoreToNewProject(backupData);
    
    console.log('\n🎉 마이그레이션 완료!');
    console.log('='.repeat(60));
    console.log('📊 마이그레이션 결과:');
    console.log(`  - Firestore: ${Object.keys(backupData.firestore).length}개 컬렉션`);
    console.log(`  - 사용자: ${backupData.auth.length}명`);
    console.log(`  - Storage: ${backupData.storage.length}개 파일`);
    console.log('\n📝 참고사항:');
    console.log('  - Storage 파일들은 수동으로 업로드해야 합니다');
    console.log('  - 사용자 비밀번호는 복원되지 않으므로 재설정이 필요합니다');
    
  } catch (error) {
    console.error('❌ 마이그레이션 실패:', error);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  runMigration();
}

module.exports = { runMigration, backupOldData, restoreToNewProject };
