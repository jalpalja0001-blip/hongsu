const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 마이그레이션 설정
const MIGRATION_CONFIG = {
  // 기존 프로젝트 설정
  oldProjectId: 'hongsu-9d9c2',
  oldStorageBucket: 'hongsu-9d9c2.firebasestorage.app',
  
  // 새 프로젝트 설정 (고객이 제공해야 함)
  newProjectId: 'CUSTOMER_PROJECT_ID',
  newStorageBucket: 'CUSTOMER_PROJECT_ID.appspot.com',
  
  // 서비스 계정 키 파일 경로
  oldServiceAccount: './oldServiceAccountKey.json',
  newServiceAccount: './newServiceAccountKey.json'
};

// 전체 마이그레이션 프로세스
async function runFullMigration() {
  console.log('🚀 Firebase 계정 마이그레이션 시작...');
  console.log('='.repeat(60));
  
  try {
    // 1단계: 기존 데이터 백업
    console.log('📦 1단계: 기존 데이터 백업');
    await backupOldData();
    
    // 2단계: 새 프로젝트 설정 확인
    console.log('🔧 2단계: 새 프로젝트 설정 확인');
    await validateNewProject();
    
    // 3단계: 데이터 복원
    console.log('📥 3단계: 데이터 복원');
    await restoreToNewProject();
    
    // 4단계: 설정 파일 업데이트
    console.log('⚙️ 4단계: 설정 파일 업데이트');
    await updateConfigurationFiles();
    
    // 5단계: 검증
    console.log('✅ 5단계: 마이그레이션 검증');
    await validateMigration();
    
    console.log('='.repeat(60));
    console.log('🎉 마이그레이션 완료!');
    console.log('📋 다음 단계:');
    console.log('1. 새 Firebase 프로젝트에서 보안 규칙 설정');
    console.log('2. Vercel 환경 변수 업데이트');
    console.log('3. GitHub 저장소 소유권 이전');
    console.log('4. 도메인 설정 확인');
    
  } catch (error) {
    console.error('❌ 마이그레이션 실패:', error);
    throw error;
  }
}

// 기존 데이터 백업
async function backupOldData() {
  console.log('📦 기존 Firebase 데이터 백업 중...');
  
  // 기존 프로젝트로 초기화
  const oldServiceAccount = require(MIGRATION_CONFIG.oldServiceAccount);
  admin.initializeApp({
    credential: admin.credential.cert(oldServiceAccount),
    projectId: MIGRATION_CONFIG.oldProjectId,
    storageBucket: MIGRATION_CONFIG.oldStorageBucket
  });
  
  const db = admin.firestore();
  const bucket = admin.storage().bucket();
  
  // 백업 디렉토리 생성
  const backupDir = path.join(__dirname, '../backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  // Firestore 데이터 백업
  const collections = ['users', 'experiences', 'instagram_experiences', 'applications', 'userRoles'];
  const firestoreData = {};
  
  for (const collectionName of collections) {
    try {
      console.log(`📁 ${collectionName} 백업 중...`);
      const snapshot = await db.collection(collectionName).get();
      firestoreData[collectionName] = [];
      
      snapshot.forEach(doc => {
        const data = doc.data();
        // Date 객체 처리
        const processedData = JSON.parse(JSON.stringify(data, (key, value) => {
          if (value && value.toDate && typeof value.toDate === 'function') {
            return value.toDate().toISOString();
          }
          return value;
        }));
        
        firestoreData[collectionName].push({
          id: doc.id,
          data: processedData
        });
      });
      
      console.log(`✅ ${collectionName}: ${firestoreData[collectionName].length}개 문서`);
    } catch (error) {
      console.error(`❌ ${collectionName} 백업 실패:`, error.message);
    }
  }
  
  // Storage 파일 목록 백업
  console.log('📦 Storage 파일 목록 백업 중...');
  const [files] = await bucket.getFiles();
  const storageData = files.map(file => ({
    name: file.name,
    size: file.metadata.size,
    contentType: file.metadata.contentType,
    timeCreated: file.metadata.timeCreated,
    downloadURL: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`
  }));
  
  // 사용자 인증 정보 백업
  console.log('👥 사용자 인증 정보 백업 중...');
  const listUsersResult = await admin.auth().listUsers();
  const authData = listUsersResult.users.map(user => ({
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
  
  // 백업 파일 저장
  fs.writeFileSync(
    path.join(backupDir, 'firestore_backup.json'),
    JSON.stringify(firestoreData, null, 2)
  );
  
  fs.writeFileSync(
    path.join(backupDir, 'storage_backup.json'),
    JSON.stringify(storageData, null, 2)
  );
  
  fs.writeFileSync(
    path.join(backupDir, 'auth_backup.json'),
    JSON.stringify(authData, null, 2)
  );
  
  console.log('✅ 백업 완료');
}

// 새 프로젝트 설정 확인
async function validateNewProject() {
  console.log('🔧 새 Firebase 프로젝트 설정 확인 중...');
  
  // 새 프로젝트로 초기화
  const newServiceAccount = require(MIGRATION_CONFIG.newServiceAccount);
  admin.initializeApp({
    credential: admin.credential.cert(newServiceAccount),
    projectId: MIGRATION_CONFIG.newProjectId,
    storageBucket: MIGRATION_CONFIG.newStorageBucket
  });
  
  try {
    // 프로젝트 접근 가능한지 확인
    const db = admin.firestore();
    await db.collection('_test').doc('_test').get();
    console.log('✅ 새 Firebase 프로젝트 접근 가능');
  } catch (error) {
    throw new Error(`새 Firebase 프로젝트 접근 실패: ${error.message}`);
  }
}

// 새 프로젝트로 데이터 복원
async function restoreToNewProject() {
  console.log('📥 새 Firebase 프로젝트로 데이터 복원 중...');
  
  const backupDir = path.join(__dirname, '../backup');
  
  // 백업 데이터 로드
  const firestoreData = JSON.parse(
    fs.readFileSync(path.join(backupDir, 'firestore_backup.json'), 'utf8')
  );
  const storageData = JSON.parse(
    fs.readFileSync(path.join(backupDir, 'storage_backup.json'), 'utf8')
  );
  const authData = JSON.parse(
    fs.readFileSync(path.join(backupDir, 'auth_backup.json'), 'utf8')
  );
  
  // Firestore 데이터 복원
  const db = admin.firestore();
  for (const [collectionName, documents] of Object.entries(firestoreData)) {
    console.log(`📁 ${collectionName} 복원 중...`);
    
    for (const docData of documents) {
      try {
        // Date 문자열을 Timestamp로 변환
        const processedData = JSON.parse(JSON.stringify(docData.data, (key, value) => {
          if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
            return admin.firestore.Timestamp.fromDate(new Date(value));
          }
          return value;
        }));
        
        await db.collection(collectionName).doc(docData.id).set(processedData);
      } catch (error) {
        console.error(`❌ ${collectionName}/${docData.id} 복원 실패:`, error.message);
      }
    }
    
    console.log(`✅ ${collectionName}: ${documents.length}개 문서 복원 완료`);
  }
  
  // Storage 파일 복원
  const bucket = admin.storage().bucket();
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
            migratedAt: new Date().toISOString()
          }
        }
      });
      
      console.log(`✅ ${fileInfo.name} 복원 완료`);
    } catch (error) {
      console.error(`❌ ${fileInfo.name} 복원 실패:`, error.message);
    }
  }
  
  // 사용자 인증 정보 복원
  for (const userInfo of authData) {
    try {
      console.log(`👤 ${userInfo.email} 복원 중...`);
      
      await admin.auth().createUser({
        uid: userInfo.uid,
        email: userInfo.email,
        displayName: userInfo.displayName,
        phoneNumber: userInfo.phoneNumber,
        emailVerified: userInfo.emailVerified,
        disabled: userInfo.disabled
      });
      
      if (userInfo.customClaims) {
        await admin.auth().setCustomUserClaims(userInfo.uid, userInfo.customClaims);
      }
      
      console.log(`✅ ${userInfo.email} 복원 완료`);
    } catch (error) {
      console.error(`❌ ${userInfo.email} 복원 실패:`, error.message);
    }
  }
  
  console.log('✅ 데이터 복원 완료');
}

// 설정 파일 업데이트
async function updateConfigurationFiles() {
  console.log('⚙️ 설정 파일 업데이트 중...');
  
  // 새 Firebase 설정 (고객이 제공해야 함)
  const newConfig = {
    apiKey: "CUSTOMER_API_KEY",
    authDomain: `${MIGRATION_CONFIG.newProjectId}.firebaseapp.com`,
    projectId: MIGRATION_CONFIG.newProjectId,
    storageBucket: MIGRATION_CONFIG.newStorageBucket,
    messagingSenderId: "CUSTOMER_SENDER_ID",
    appId: "CUSTOMER_APP_ID",
    measurementId: "CUSTOMER_MEASUREMENT_ID"
  };
  
  // firebase.ts 업데이트
  const firebaseConfigPath = path.join(__dirname, '../src/lib/firebase.ts');
  let firebaseContent = fs.readFileSync(firebaseConfigPath, 'utf8');
  
  const newFirebaseConfig = `const firebaseConfig = {
  apiKey: "${newConfig.apiKey}",
  authDomain: "${newConfig.authDomain}",
  projectId: "${newConfig.projectId}",
  storageBucket: "${newConfig.storageBucket}",
  messagingSenderId: "${newConfig.messagingSenderId}",
  appId: "${newConfig.appId}",
  measurementId: "${newConfig.measurementId}"
};`;
  
  firebaseContent = firebaseContent.replace(
    /const firebaseConfig = \{[\s\S]*?\};/,
    newFirebaseConfig
  );
  
  fs.writeFileSync(firebaseConfigPath, firebaseContent);
  console.log('✅ firebase.ts 업데이트 완료');
  
  // firebase-admin.ts 업데이트
  const firebaseAdminPath = path.join(__dirname, '../src/lib/firebase-admin.ts');
  let firebaseAdminContent = fs.readFileSync(firebaseAdminPath, 'utf8');
  
  firebaseAdminContent = firebaseAdminContent.replace(
    /projectId: '[^']*'/g,
    `projectId: '${newConfig.projectId}'`
  );
  
  firebaseAdminContent = firebaseAdminContent.replace(
    /storageBucket: '[^']*'/g,
    `storageBucket: '${newConfig.storageBucket}'`
  );
  
  fs.writeFileSync(firebaseAdminPath, firebaseAdminContent);
  console.log('✅ firebase-admin.ts 업데이트 완료');
  
  // 환경 변수 파일 생성
  const envContent = `# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=${newConfig.apiKey}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${newConfig.authDomain}
NEXT_PUBLIC_FIREBASE_PROJECT_ID=${newConfig.projectId}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${newConfig.storageBucket}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${newConfig.messagingSenderId}
NEXT_PUBLIC_FIREBASE_APP_ID=${newConfig.appId}
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=${newConfig.measurementId}

# Firebase Admin SDK
GOOGLE_APPLICATION_CREDENTIALS=./newServiceAccountKey.json
`;
  
  fs.writeFileSync(path.join(__dirname, '../.env.local'), envContent);
  console.log('✅ .env.local 파일 생성 완료');
  
  // Vercel 환경 변수 파일 업데이트
  const vercelEnvContent = `Vercel 환경 변수 설정용

다음 환경 변수들을 Vercel 대시보드에서 설정하세요:

변수명: NEXT_PUBLIC_FIREBASE_API_KEY
값: ${newConfig.apiKey}

변수명: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
값: ${newConfig.authDomain}

변수명: NEXT_PUBLIC_FIREBASE_PROJECT_ID
값: ${newConfig.projectId}

변수명: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
값: ${newConfig.storageBucket}

변수명: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
값: ${newConfig.messagingSenderId}

변수명: NEXT_PUBLIC_FIREBASE_APP_ID
값: ${newConfig.appId}

변수명: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
값: ${newConfig.measurementId}

설정 방법:
1. https://vercel.com/dashboard 접속
2. 프로젝트 클릭
3. Settings → Environment Variables
4. 위의 변수들을 하나씩 추가
5. 모든 변수 추가 후 Redeploy 실행

마이그레이션 완료일: ${new Date().toISOString()}
`;
  
  fs.writeFileSync(path.join(__dirname, '../vercel_env_variables.txt'), vercelEnvContent);
  console.log('✅ vercel_env_variables.txt 업데이트 완료');
}

// 마이그레이션 검증
async function validateMigration() {
  console.log('✅ 마이그레이션 검증 중...');
  
  const db = admin.firestore();
  
  // 각 컬렉션의 문서 수 확인
  const collections = ['users', 'experiences', 'instagram_experiences', 'applications', 'userRoles'];
  
  for (const collectionName of collections) {
    try {
      const snapshot = await db.collection(collectionName).get();
      console.log(`✅ ${collectionName}: ${snapshot.size}개 문서 확인`);
    } catch (error) {
      console.error(`❌ ${collectionName} 검증 실패:`, error.message);
    }
  }
  
  console.log('✅ 마이그레이션 검증 완료');
}

// 스크립트 실행
if (require.main === module) {
  console.log('🚀 Firebase 계정 마이그레이션 도구');
  console.log('='.repeat(60));
  console.log('⚠️  주의사항:');
  console.log('1. 고객의 Firebase 프로젝트가 이미 생성되어 있어야 합니다');
  console.log('2. 서비스 계정 키 파일이 준비되어 있어야 합니다');
  console.log('3. 충분한 권한이 있는 계정이어야 합니다');
  console.log('='.repeat(60));
  
  runFullMigration().catch(console.error);
}

module.exports = {
  runFullMigration,
  backupOldData,
  validateNewProject,
  restoreToNewProject,
  updateConfigurationFiles,
  validateMigration
};
