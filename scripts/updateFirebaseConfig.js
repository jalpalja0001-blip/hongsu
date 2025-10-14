const fs = require('fs');
const path = require('path');

// 새 Firebase 설정으로 코드 업데이트
function updateFirebaseConfig(newConfig) {
  console.log('🔧 Firebase 설정 업데이트 시작...');
  
  // 1. firebase.ts 파일 업데이트
  const firebaseConfigPath = path.join(__dirname, '../src/lib/firebase.ts');
  let firebaseContent = fs.readFileSync(firebaseConfigPath, 'utf8');
  
  // 기존 설정을 새 설정으로 교체
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
  console.log('✅ src/lib/firebase.ts 업데이트 완료');
  
  // 2. firebase-admin.ts 파일 업데이트
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
  console.log('✅ src/lib/firebase-admin.ts 업데이트 완료');
  
  // 3. 환경 변수 파일 생성
  const envContent = `# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=${newConfig.apiKey}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${newConfig.authDomain}
NEXT_PUBLIC_FIREBASE_PROJECT_ID=${newConfig.projectId}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${newConfig.storageBucket}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${newConfig.messagingSenderId}
NEXT_PUBLIC_FIREBASE_APP_ID=${newConfig.appId}
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=${newConfig.measurementId}

# Firebase Admin SDK
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
`;
  
  fs.writeFileSync(path.join(__dirname, '../.env.local'), envContent);
  console.log('✅ .env.local 파일 생성 완료');
  
  // 4. Vercel 환경 변수 파일 업데이트
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

업데이트 완료일: ${new Date().toISOString()}
`;
  
  fs.writeFileSync(path.join(__dirname, '../vercel_env_variables.txt'), vercelEnvContent);
  console.log('✅ vercel_env_variables.txt 업데이트 완료');
}

// 새 Firebase 프로젝트 설정 예시
const newFirebaseConfig = {
  apiKey: "YOUR_NEW_API_KEY",
  authDomain: "your-new-project.firebaseapp.com",
  projectId: "your-new-project",
  storageBucket: "your-new-project.appspot.com",
  messagingSenderId: "YOUR_NEW_SENDER_ID",
  appId: "YOUR_NEW_APP_ID",
  measurementId: "YOUR_NEW_MEASUREMENT_ID"
};

// 스크립트 실행
if (require.main === module) {
  console.log('🔧 Firebase 설정 업데이트 도구');
  console.log('='.repeat(50));
  console.log('새 Firebase 프로젝트 설정을 입력하세요:');
  console.log('1. Firebase Console에서 새 프로젝트 생성');
  console.log('2. 프로젝트 설정 > 일반 > 웹 앱 추가');
  console.log('3. 설정 정보를 복사하여 아래에 입력');
  console.log('='.repeat(50));
  
  // 실제 사용 시에는 사용자 입력을 받아야 함
  updateFirebaseConfig(newFirebaseConfig);
}

module.exports = {
  updateFirebaseConfig
};
