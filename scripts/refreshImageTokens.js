const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc } = require('firebase/firestore');
const { getStorage, ref, getDownloadURL } = require('firebase/storage');

// 현재 Firebase 프로젝트 설정
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
const storage = getStorage(app);

// URL에서 파일 경로 추출
function extractPathFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const pathMatch = urlObj.pathname.match(/\/o\/(.+)$/);
    if (pathMatch) {
      return decodeURIComponent(pathMatch[1]);
    }
  } catch (error) {
    console.error('URL 파싱 오류:', error);
  }
  return null;
}

// 이미지 URL 토큰 갱신
async function refreshImageToken(oldUrl) {
  try {
    const filePath = extractPathFromUrl(oldUrl);
    if (!filePath) {
      console.error('파일 경로 추출 실패:', oldUrl);
      return null;
    }
    
    const fileRef = ref(storage, filePath);
    const newUrl = await getDownloadURL(fileRef);
    return newUrl;
  } catch (error) {
    console.error('토큰 갱신 실패:', error.message);
    return null;
  }
}

// 컬렉션의 이미지 URL 토큰 갱신
async function refreshCollectionTokens(collectionName) {
  console.log(`\n=== ${collectionName} 컬렉션 토큰 갱신 시작 ===`);
  
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    console.log(`총 ${snapshot.size}개의 문서를 확인합니다.`);
    
    let updatedCount = 0;
    let errorCount = 0;
    
    for (const docSnapshot of snapshot.docs) {
      const data = docSnapshot.data();
      let needsUpdate = false;
      const updateData = {};
      
      // image 필드 확인 및 갱신
      if (data.image && typeof data.image === 'string' && data.image.includes('firebasestorage.googleapis.com')) {
        const newUrl = await refreshImageToken(data.image);
        if (newUrl && newUrl !== data.image) {
          updateData.image = newUrl;
          needsUpdate = true;
          console.log(`  [${docSnapshot.id}] image URL 토큰 갱신`);
        }
      }
      
      // images 배열 확인 및 갱신
      if (data.images && Array.isArray(data.images)) {
        const updatedImages = await Promise.all(
          data.images.map(async (img) => {
            if (typeof img === 'string' && img.includes('firebasestorage.googleapis.com')) {
              const newUrl = await refreshImageToken(img);
              if (newUrl && newUrl !== img) {
                needsUpdate = true;
                console.log(`  [${docSnapshot.id}] images 배열 URL 토큰 갱신`);
                return newUrl;
              }
            }
            return img;
          })
        );
        
        if (needsUpdate) {
          updateData.images = updatedImages;
        }
      }
      
      // 업데이트가 필요한 경우
      if (needsUpdate) {
        try {
          const docRef = doc(db, collectionName, docSnapshot.id);
          await updateDoc(docRef, updateData);
          updatedCount++;
          console.log(`  ✓ [${docSnapshot.id}] 업데이트 완료`);
        } catch (error) {
          errorCount++;
          console.error(`  ✗ [${docSnapshot.id}] 업데이트 실패:`, error.message);
        }
      }
    }
    
    console.log(`\n${collectionName} 컬렉션 토큰 갱신 완료:`);
    console.log(`  - 총 문서 수: ${snapshot.size}`);
    console.log(`  - 업데이트된 문서: ${updatedCount}`);
    console.log(`  - 오류 발생: ${errorCount}`);
    
    return { total: snapshot.size, updated: updatedCount, errors: errorCount };
  } catch (error) {
    console.error(`${collectionName} 컬렉션 토큰 갱신 오류:`, error);
    throw error;
  }
}

// 메인 실행 함수
async function main() {
  console.log('=== Firebase 이미지 URL 토큰 갱신 시작 ===');
  
  try {
    // experiences 컬렉션 토큰 갱신
    const experiencesResult = await refreshCollectionTokens('experiences');
    
    // instagram_experiences 컬렉션 토큰 갱신
    const instagramResult = await refreshCollectionTokens('instagram_experiences');
    
    // 전체 결과 출력
    console.log('\n=== 전체 토큰 갱신 결과 ===');
    console.log(`총 문서 수: ${experiencesResult.total + instagramResult.total}`);
    console.log(`업데이트된 문서: ${experiencesResult.updated + instagramResult.updated}`);
    console.log(`오류 발생: ${experiencesResult.errors + instagramResult.errors}`);
    
    console.log('\n✓ 토큰 갱신 완료!');
    process.exit(0);
  } catch (error) {
    console.error('\n✗ 토큰 갱신 실패:', error);
    process.exit(1);
  }
}

main();

