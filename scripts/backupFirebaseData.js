const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Firebase Admin SDK 초기화
const serviceAccount = require('../serviceAccountKey.json'); // 서비스 계정 키 파일 필요

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'hongsu-9d9c2',
  storageBucket: 'hongsu-9d9c2.firebasestorage.app'
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// 백업 데이터를 저장할 디렉토리
const backupDir = path.join(__dirname, '../backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Firestore 컬렉션 백업
async function backupFirestoreCollections() {
  console.log('🔥 Firestore 데이터 백업 시작...');
  
  const collections = [
    'users',
    'experiences', 
    'instagram_experiences',
    'applications',
    'userRoles'
  ];

  const backupData = {};

  for (const collectionName of collections) {
    try {
      console.log(`📁 ${collectionName} 컬렉션 백업 중...`);
      const snapshot = await db.collection(collectionName).get();
      
      backupData[collectionName] = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        // Date 객체를 문자열로 변환
        const processedData = JSON.parse(JSON.stringify(data, (key, value) => {
          if (value && value.toDate && typeof value.toDate === 'function') {
            return value.toDate().toISOString();
          }
          return value;
        }));
        
        backupData[collectionName].push({
          id: doc.id,
          data: processedData
        });
      });
      
      console.log(`✅ ${collectionName}: ${backupData[collectionName].length}개 문서 백업 완료`);
    } catch (error) {
      console.error(`❌ ${collectionName} 백업 실패:`, error.message);
    }
  }

  // 백업 데이터를 파일로 저장
  const backupFile = path.join(backupDir, 'firestore_backup.json');
  fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
  console.log(`💾 Firestore 백업 파일 저장: ${backupFile}`);
  
  return backupData;
}

// Firebase Storage 파일 목록 백업
async function backupStorageFiles() {
  console.log('📦 Firebase Storage 파일 목록 백업 중...');
  
  try {
    const [files] = await bucket.getFiles();
    const fileList = files.map(file => ({
      name: file.name,
      size: file.metadata.size,
      contentType: file.metadata.contentType,
      timeCreated: file.metadata.timeCreated,
      updated: file.metadata.updated,
      downloadURL: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`
    }));

    const storageBackupFile = path.join(backupDir, 'storage_backup.json');
    fs.writeFileSync(storageBackupFile, JSON.stringify(fileList, null, 2));
    console.log(`💾 Storage 백업 파일 저장: ${storageBackupFile}`);
    
    return fileList;
  } catch (error) {
    console.error('❌ Storage 백업 실패:', error.message);
    return [];
  }
}

// Firestore 보안 규칙 백업
async function backupSecurityRules() {
  console.log('🔒 Firestore 보안 규칙 백업 중...');
  
  try {
    // 현재 보안 규칙을 가져오는 방법은 Firebase CLI를 사용해야 함
    // 여기서는 규칙 파일이 있다고 가정
    const rulesFile = path.join(__dirname, '../firestore.rules');
    if (fs.existsSync(rulesFile)) {
      const rules = fs.readFileSync(rulesFile, 'utf8');
      const rulesBackupFile = path.join(backupDir, 'firestore_rules.txt');
      fs.writeFileSync(rulesBackupFile, rules);
      console.log(`💾 보안 규칙 백업 파일 저장: ${rulesBackupFile}`);
    } else {
      console.log('⚠️ firestore.rules 파일을 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('❌ 보안 규칙 백업 실패:', error.message);
  }
}

// 사용자 인증 정보 백업 (제한적)
async function backupUserAuth() {
  console.log('👥 사용자 인증 정보 백업 중...');
  
  try {
    // Firebase Admin SDK로 사용자 목록 가져오기
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      emailVerified: user.emailVerified,
      disabled: user.disabled,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime
      },
      customClaims: user.customClaims
    }));

    const authBackupFile = path.join(backupDir, 'auth_users.json');
    fs.writeFileSync(authBackupFile, JSON.stringify(users, null, 2));
    console.log(`💾 사용자 인증 정보 백업 파일 저장: ${authBackupFile}`);
    
    return users;
  } catch (error) {
    console.error('❌ 사용자 인증 정보 백업 실패:', error.message);
    return [];
  }
}

// 전체 백업 실행
async function runBackup() {
  console.log('🚀 Firebase 데이터 백업 시작...');
  console.log('='.repeat(50));
  
  try {
    const firestoreData = await backupFirestoreCollections();
    const storageFiles = await backupStorageFiles();
    const authUsers = await backupUserAuth();
    await backupSecurityRules();
    
    // 백업 요약 생성
    const summary = {
      timestamp: new Date().toISOString(),
      firestore: {
        collections: Object.keys(firestoreData),
        totalDocuments: Object.values(firestoreData).reduce((sum, docs) => sum + docs.length, 0)
      },
      storage: {
        totalFiles: storageFiles.length,
        totalSize: storageFiles.reduce((sum, file) => sum + parseInt(file.size || 0), 0)
      },
      auth: {
        totalUsers: authUsers.length
      }
    };
    
    const summaryFile = path.join(backupDir, 'backup_summary.json');
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
    
    console.log('='.repeat(50));
    console.log('✅ 백업 완료!');
    console.log(`📊 Firestore: ${summary.firestore.totalDocuments}개 문서`);
    console.log(`📦 Storage: ${summary.storage.totalFiles}개 파일`);
    console.log(`👥 Auth: ${summary.auth.totalUsers}명 사용자`);
    console.log(`📁 백업 위치: ${backupDir}`);
    
  } catch (error) {
    console.error('❌ 백업 실패:', error);
  } finally {
    process.exit(0);
  }
}

// 스크립트 실행
if (require.main === module) {
  runBackup();
}

module.exports = {
  backupFirestoreCollections,
  backupStorageFiles,
  backupUserAuth,
  backupSecurityRules,
  runBackup
};
