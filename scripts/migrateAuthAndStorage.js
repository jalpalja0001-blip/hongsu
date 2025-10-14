const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 마이그레이션 설정
const OLD_PROJECT_CONFIG = {
  projectId: 'hongsu-9d9c2',
  storageBucket: 'hongsu-9d9c2.firebasestorage.app',
  serviceAccountPath: path.join(__dirname, '../oldServiceAccountKey.json')
};

const NEW_PROJECT_CONFIG = {
  projectId: 'jalpalja',
  storageBucket: 'jalpalja.firebasestorage.app',
  serviceAccountPath: path.join(__dirname, '../newServiceAccountKey.json')
};

// 사용자 인증 데이터 마이그레이션
async function migrateAuthUsers() {
  console.log('👤 사용자 인증 데이터 마이그레이션 시작...');
  
  try {
    // 기존 프로젝트 초기화
    const oldServiceAccount = require(OLD_PROJECT_CONFIG.serviceAccountPath);
    const oldApp = admin.initializeApp({
      credential: admin.credential.cert(oldServiceAccount),
      projectId: OLD_PROJECT_CONFIG.projectId
    }, 'oldAuthApp');
    
    const oldAuth = admin.auth(oldApp);
    
    // 새 프로젝트 초기화
    const newServiceAccount = require(NEW_PROJECT_CONFIG.serviceAccountPath);
    const newApp = admin.initializeApp({
      credential: admin.credential.cert(newServiceAccount),
      projectId: NEW_PROJECT_CONFIG.projectId
    }, 'newAuthApp');
    
    const newAuth = admin.auth(newApp);
    
    // 기존 사용자 목록 가져오기
    console.log('📋 기존 사용자 목록 조회 중...');
    const listUsersResult = await oldAuth.listUsers();
    const users = listUsersResult.users;
    
    console.log(`👥 총 ${users.length}명의 사용자 발견`);
    
    // 사용자 데이터 마이그레이션
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      console.log(`👤 사용자 ${i + 1}/${users.length}: ${user.email || user.uid} 마이그레이션 중...`);
      
      try {
        // 새 프로젝트에 사용자 생성
        await newAuth.createUser({
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          photoURL: user.photoURL,
          disabled: user.disabled,
          customClaims: user.customClaims
        });
        
        console.log(`  ✅ ${user.email || user.uid} 마이그레이션 완료`);
      } catch (error) {
        if (error.code === 'auth/uid-already-exists') {
          console.log(`  ⚠️ ${user.email || user.uid} 이미 존재함`);
        } else {
          console.error(`  ❌ ${user.email || user.uid} 마이그레이션 실패:`, error.message);
        }
      }
    }
    
    // 앱 정리
    await oldApp.delete();
    await newApp.delete();
    
    console.log('🎉 사용자 인증 데이터 마이그레이션 완료!');
    
  } catch (error) {
    console.error('❌ 사용자 인증 마이그레이션 실패:', error.message);
    throw error;
  }
}

// Storage 파일 마이그레이션
async function migrateStorageFiles() {
  console.log('📁 Storage 파일 마이그레이션 시작...');
  
  try {
    // 기존 프로젝트 초기화
    const oldServiceAccount = require(OLD_PROJECT_CONFIG.serviceAccountPath);
    const oldApp = admin.initializeApp({
      credential: admin.credential.cert(oldServiceAccount),
      projectId: OLD_PROJECT_CONFIG.projectId,
      storageBucket: OLD_PROJECT_CONFIG.storageBucket
    }, 'oldStorageApp');
    
    const oldStorage = admin.storage(oldApp);
    
    // 새 프로젝트 초기화
    const newServiceAccount = require(NEW_PROJECT_CONFIG.serviceAccountPath);
    const newApp = admin.initializeApp({
      credential: admin.credential.cert(newServiceAccount),
      projectId: NEW_PROJECT_CONFIG.projectId,
      storageBucket: NEW_PROJECT_CONFIG.storageBucket
    }, 'newStorageApp');
    
    const newStorage = admin.storage(newApp);
    
    // 기존 Storage 파일 목록 가져오기
    console.log('📋 기존 Storage 파일 목록 조회 중...');
    const [files] = await oldStorage.bucket().getFiles();
    
    console.log(`📁 총 ${files.length}개 파일 발견`);
    
    // 파일 마이그레이션
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`📄 파일 ${i + 1}/${files.length}: ${file.name} 마이그레이션 중...`);
      
      try {
        // 파일 다운로드
        const [fileBuffer] = await file.download();
        
        // 새 프로젝트에 파일 업로드
        const newFile = newStorage.bucket().file(file.name);
        await newFile.save(fileBuffer, {
          metadata: {
            contentType: file.metadata.contentType,
            cacheControl: file.metadata.cacheControl
          }
        });
        
        console.log(`  ✅ ${file.name} 마이그레이션 완료`);
      } catch (error) {
        console.error(`  ❌ ${file.name} 마이그레이션 실패:`, error.message);
      }
    }
    
    // 앱 정리
    await oldApp.delete();
    await newApp.delete();
    
    console.log('🎉 Storage 파일 마이그레이션 완료!');
    
  } catch (error) {
    console.error('❌ Storage 파일 마이그레이션 실패:', error.message);
    throw error;
  }
}

// 전체 마이그레이션 실행
async function runAuthAndStorageMigration() {
  console.log('🚀 사용자 인증 및 Storage 파일 마이그레이션 시작...');
  console.log('='.repeat(60));
  
  try {
    // 1단계: 사용자 인증 마이그레이션
    console.log('👤 1단계: 사용자 인증 데이터 마이그레이션');
    await migrateAuthUsers();
    
    // 2단계: Storage 파일 마이그레이션
    console.log('📁 2단계: Storage 파일 마이그레이션');
    await migrateStorageFiles();
    
    console.log('='.repeat(60));
    console.log('🎉 사용자 인증 및 Storage 파일 마이그레이션 완료!');
    
  } catch (error) {
    console.error('❌ 마이그레이션 실패:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  runAuthAndStorageMigration();
}

module.exports = { runAuthAndStorageMigration, migrateAuthUsers, migrateStorageFiles };
