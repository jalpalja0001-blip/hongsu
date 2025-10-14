const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 새 Firebase 프로젝트 설정
const newServiceAccount = require('../newServiceAccountKey.json'); // 새 서비스 계정 키 파일
const newProjectId = 'NEW_PROJECT_ID'; // 새 프로젝트 ID
const newStorageBucket = 'NEW_PROJECT_ID.appspot.com'; // 새 스토리지 버킷

// 새 Firebase Admin SDK 초기화
admin.initializeApp({
  credential: admin.credential.cert(newServiceAccount),
  projectId: newProjectId,
  storageBucket: newStorageBucket
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// 백업 데이터 로드
function loadBackupData() {
  const backupDir = path.join(__dirname, '../backup');
  const firestoreFile = path.join(backupDir, 'firestore_backup.json');
  const storageFile = path.join(backupDir, 'storage_backup.json');
  const authFile = path.join(backupDir, 'auth_users.json');
  
  const firestoreData = JSON.parse(fs.readFileSync(firestoreFile, 'utf8'));
  const storageData = JSON.parse(fs.readFileSync(storageFile, 'utf8'));
  const authData = JSON.parse(fs.readFileSync(authFile, 'utf8'));
  
  return { firestoreData, storageData, authData };
}

// Firestore 데이터 복원
async function restoreFirestoreData(firestoreData) {
  console.log('🔥 Firestore 데이터 복원 시작...');
  
  for (const [collectionName, documents] of Object.entries(firestoreData)) {
    console.log(`📁 ${collectionName} 컬렉션 복원 중...`);
    
    for (const docData of documents) {
      try {
        // Date 문자열을 Date 객체로 변환
        const processedData = JSON.parse(JSON.stringify(docData.data, (key, value) => {
          if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
            return admin.firestore.Timestamp.fromDate(new Date(value));
          }
          return value;
        }));
        
        await db.collection(collectionName).doc(docData.id).set(processedData);
        console.log(`✅ ${collectionName}/${docData.id} 복원 완료`);
      } catch (error) {
        console.error(`❌ ${collectionName}/${docData.id} 복원 실패:`, error.message);
      }
    }
    
    console.log(`✅ ${collectionName}: ${documents.length}개 문서 복원 완료`);
  }
}

// Storage 파일 복원
async function restoreStorageFiles(storageData) {
  console.log('📦 Firebase Storage 파일 복원 시작...');
  
  for (const fileInfo of storageData) {
    try {
      console.log(`📁 ${fileInfo.name} 복원 중...`);
      
      // 원본 파일 다운로드
      const response = await fetch(fileInfo.downloadURL);
      const buffer = await response.buffer();
      
      // 새 Storage에 업로드
      const file = bucket.file(fileInfo.name);
      await file.save(buffer, {
        metadata: {
          contentType: fileInfo.contentType,
          metadata: {
            originalSize: fileInfo.size,
            restoredAt: new Date().toISOString()
          }
        }
      });
      
      console.log(`✅ ${fileInfo.name} 복원 완료`);
    } catch (error) {
      console.error(`❌ ${fileInfo.name} 복원 실패:`, error.message);
    }
  }
}

// 사용자 인증 정보 복원 (제한적)
async function restoreUserAuth(authData) {
  console.log('👥 사용자 인증 정보 복원 시작...');
  
  for (const userInfo of authData) {
    try {
      console.log(`👤 ${userInfo.email} 복원 중...`);
      
      // 새 사용자 생성
      const userRecord = await admin.auth().createUser({
        uid: userInfo.uid,
        email: userInfo.email,
        displayName: userInfo.displayName,
        phoneNumber: userInfo.phoneNumber,
        emailVerified: userInfo.emailVerified,
        disabled: userInfo.disabled
      });
      
      // 커스텀 클레임 설정
      if (userInfo.customClaims) {
        await admin.auth().setCustomUserClaims(userInfo.uid, userInfo.customClaims);
      }
      
      console.log(`✅ ${userInfo.email} 복원 완료`);
    } catch (error) {
      console.error(`❌ ${userInfo.email} 복원 실패:`, error.message);
    }
  }
}

// 보안 규칙 복원
async function restoreSecurityRules() {
  console.log('🔒 Firestore 보안 규칙 복원 중...');
  
  try {
    const rulesFile = path.join(__dirname, '../backup/firestore_rules.txt');
    if (fs.existsSync(rulesFile)) {
      const rules = fs.readFileSync(rulesFile, 'utf8');
      // Firebase CLI를 사용하여 규칙 배포
      console.log('📋 보안 규칙을 수동으로 배포해야 합니다:');
      console.log('firebase deploy --only firestore:rules');
      console.log('규칙 내용:');
      console.log(rules);
    } else {
      console.log('⚠️ 보안 규칙 파일을 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('❌ 보안 규칙 복원 실패:', error.message);
  }
}

// 전체 복원 실행
async function runRestore() {
  console.log('🚀 Firebase 데이터 복원 시작...');
  console.log('='.repeat(50));
  
  try {
    const { firestoreData, storageData, authData } = loadBackupData();
    
    await restoreFirestoreData(firestoreData);
    await restoreStorageFiles(storageData);
    await restoreUserAuth(authData);
    await restoreSecurityRules();
    
    console.log('='.repeat(50));
    console.log('✅ 복원 완료!');
    console.log(`📊 Firestore: ${Object.values(firestoreData).reduce((sum, docs) => sum + docs.length, 0)}개 문서`);
    console.log(`📦 Storage: ${storageData.length}개 파일`);
    console.log(`👥 Auth: ${authData.length}명 사용자`);
    
  } catch (error) {
    console.error('❌ 복원 실패:', error);
  } finally {
    process.exit(0);
  }
}

// 스크립트 실행
if (require.main === module) {
  runRestore();
}

module.exports = {
  restoreFirestoreData,
  restoreStorageFiles,
  restoreUserAuth,
  restoreSecurityRules,
  runRestore
};
