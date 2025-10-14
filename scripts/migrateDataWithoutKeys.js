const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 마이그레이션 설정
const OLD_PROJECT_CONFIG = {
  projectId: 'hongsu-9d9c2',
  storageBucket: 'hongsu-9d9c2.firebasestorage.app',
  apiKey: 'AIzaSyBozZHNiZa7m_MznFzzcj-xRxf2J7bjeOo',
  authDomain: 'hongsu-9d9c2.firebaseapp.com',
  messagingSenderId: '102045054206',
  appId: '1:102045054206:web:1f060f9e06af0b7e6fe1af',
  measurementId: 'G-2SDG086GFP'
};

const NEW_PROJECT_CONFIG = {
  projectId: 'jalpalja',
  storageBucket: 'jalpalja.firebasestorage.app',
  apiKey: 'AIzaSyDD8AG4WZT-XjFQaX5WcQOLs80XEcTThi4',
  authDomain: 'jalpalja.firebaseapp.com',
  messagingSenderId: '875140863009',
  appId: '1:875140863009:web:6828a1b6b414ca794e3f60',
  measurementId: 'G-NNG7P8ZY5F'
};

// 백업 디렉토리 생성
const backupDir = path.join(__dirname, '../backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// 기존 프로젝트에서 데이터 백업 (환경 변수 사용)
async function backupOldData() {
  console.log('📦 기존 Firebase 프로젝트에서 데이터 백업 중...');
  
  try {
    // 기존 프로젝트 초기화 (환경 변수 사용)
    const oldApp = admin.initializeApp({
      projectId: OLD_PROJECT_CONFIG.projectId,
      storageBucket: OLD_PROJECT_CONFIG.storageBucket
    }, 'oldApp');
    
    const oldDb = admin.firestore(oldApp);
    const oldStorage = admin.storage(oldApp);
    
    const backupData = {
      firestore: {},
      storage: [],
      auth: [],
      rules: {}
    };
    
    // Firestore 컬렉션 백업
    console.log('🔥 Firestore 데이터 백업 중...');
    const collections = ['users', 'experiences', 'instagram_experiences', 'applications', 'userRoles'];
    
    for (const collectionName of collections) {
      console.log(`  📁 ${collectionName} 컬렉션 백업 중...`);
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
    console.log('📁 Storage 파일 목록 백업 중...');
    const [files] = await oldStorage.bucket().getFiles();
    backupData.storage = files.map(file => ({
      name: file.name,
      size: file.metadata.size,
      contentType: file.metadata.contentType,
      timeCreated: file.metadata.timeCreated
    }));
    
    console.log(`  ✅ Storage: ${files.length}개 파일 목록 백업 완료`);
    
    // 백업 데이터 저장
    const backupFile = path.join(backupDir, 'firebase_backup.json');
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
    
    console.log(`💾 백업 완료: ${backupFile}`);
    
    // 기존 앱 정리
    await oldApp.delete();
    
    return backupData;
    
  } catch (error) {
    console.error('❌ 백업 중 오류 발생:', error.message);
    throw error;
  }
}

// 새 프로젝트로 데이터 복원
async function restoreToNewProject(backupData) {
  console.log('📥 새 Firebase 프로젝트로 데이터 복원 중...');
  
  try {
    // 새 프로젝트 초기화 (환경 변수 사용)
    const newApp = admin.initializeApp({
      projectId: NEW_PROJECT_CONFIG.projectId,
      storageBucket: NEW_PROJECT_CONFIG.storageBucket
    }, 'newApp');
    
    const newDb = admin.firestore(newApp);
    const newStorage = admin.storage(newApp);
    
    // Firestore 데이터 복원
    console.log('🔥 Firestore 데이터 복원 중...');
    for (const [collectionName, documents] of Object.entries(backupData.firestore)) {
      console.log(`  📁 ${collectionName} 컬렉션 복원 중...`);
      
      for (const doc of documents) {
        await newDb.collection(collectionName).doc(doc.id).set(doc.data);
      }
      
      console.log(`  ✅ ${collectionName}: ${documents.length}개 문서 복원 완료`);
    }
    
    // Storage 파일 복원 (목록만 저장)
    console.log('📁 Storage 파일 목록 복원 중...');
    const storageFile = path.join(backupDir, 'storage_files.json');
    fs.writeFileSync(storageFile, JSON.stringify(backupData.storage, null, 2));
    
    console.log(`  ✅ Storage 파일 목록 저장: ${storageFile}`);
    
    // 새 앱 정리
    await newApp.delete();
    
    console.log('🎉 데이터 복원 완료!');
    
  } catch (error) {
    console.error('❌ 복원 중 오류 발생:', error.message);
    throw error;
  }
}

// 전체 마이그레이션 실행
async function runMigration() {
  console.log('🚀 Firebase 데이터 마이그레이션 시작...');
  console.log('='.repeat(60));
  
  try {
    // 1단계: 기존 데이터 백업
    console.log('📦 1단계: 기존 데이터 백업');
    const backupData = await backupOldData();
    
    // 2단계: 새 프로젝트로 복원
    console.log('📥 2단계: 새 프로젝트로 복원');
    await restoreToNewProject(backupData);
    
    console.log('='.repeat(60));
    console.log('🎉 마이그레이션 완료!');
    console.log('📁 백업 파일 위치:', backupDir);
    
  } catch (error) {
    console.error('❌ 마이그레이션 실패:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  runMigration();
}

module.exports = { runMigration, backupOldData, restoreToNewProject };
