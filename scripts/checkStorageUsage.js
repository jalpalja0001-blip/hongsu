const { initializeApp } = require('firebase/app')
const { getStorage, ref, listAll, getMetadata } = require('firebase/storage')

// 현재 프로젝트 Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDD8AG4WZT-XjFQaX5WcQOLs80XEcTThi4",
  authDomain: "jalpalja.firebaseapp.com",
  projectId: "jalpalja",
  storageBucket: "jalpalja.firebasestorage.app",
  messagingSenderId: "875140863009",
  appId: "1:875140863009:web:6828a1b6b414ca794e3f60",
  measurementId: "G-NNG7P8ZY5F"
}

// Firebase 초기화
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

async function checkStorageUsage() {
  try {
    console.log('=== Firebase Storage 용량 확인 ===')
    console.log('프로젝트:', firebaseConfig.projectId)
    console.log('Storage Bucket:', firebaseConfig.storageBucket)
    console.log('')
    
    let totalSize = 0
    let fileCount = 0
    let folderCount = 0
    
    // Storage 루트에서 모든 파일 재귀적으로 확인
    async function scanFolder(folderPath = '') {
      const folderRef = ref(storage, folderPath)
      const result = await listAll(folderRef)
      
      // 폴더 처리
      for (const folder of result.prefixes) {
        folderCount++
        console.log(`📁 폴더: ${folderPath}/${folder.name}`)
        await scanFolder(`${folderPath}/${folder.name}`)
      }
      
      // 파일 처리
      for (const file of result.items) {
        try {
          const metadata = await getMetadata(file)
          const size = parseInt(metadata.size) || 0
          totalSize += size
          fileCount++
          
          console.log(`📄 파일: ${file.name}`)
          console.log(`   크기: ${formatBytes(size)}`)
          console.log(`   타입: ${metadata.contentType}`)
          console.log(`   생성일: ${metadata.timeCreated}`)
          console.log('')
        } catch (error) {
          console.log(`❌ 파일 메타데이터 읽기 실패: ${file.name}`)
          console.log(`   오류: ${error.message}`)
        }
      }
    }
    
    console.log('Storage 스캔 시작...')
    await scanFolder()
    
    console.log('=== Storage 사용량 요약 ===')
    console.log(`📁 총 폴더 수: ${folderCount}`)
    console.log(`📄 총 파일 수: ${fileCount}`)
    console.log(`💾 총 사용 용량: ${formatBytes(totalSize)}`)
    console.log('')
    
    // Firebase Storage 무료 한도 확인
    const freeLimit = 1 * 1024 * 1024 * 1024 // 1GB
    const usagePercent = (totalSize / freeLimit) * 100
    
    console.log('=== Firebase Storage 한도 ===')
    console.log(`🆓 무료 한도: ${formatBytes(freeLimit)}`)
    console.log(`📊 사용률: ${usagePercent.toFixed(2)}%`)
    
    if (totalSize > freeLimit) {
      console.log('⚠️  무료 한도 초과! 유료 플랜이 필요합니다.')
    } else if (usagePercent > 80) {
      console.log('⚠️  무료 한도의 80% 이상 사용 중입니다.')
    } else if (usagePercent > 50) {
      console.log('💡 무료 한도의 50% 이상 사용 중입니다.')
    } else {
      console.log('✅ 용량 사용량이 적습니다.')
    }
    
  } catch (error) {
    console.error('❌ Storage 확인 실패:', error)
    console.error('오류 코드:', error.code)
    console.error('오류 메시지:', error.message)
    
    if (error.code === 'storage/unauthorized') {
      console.log('💡 Storage 규칙 문제입니다.')
      console.log('   Firebase Console에서 Storage 규칙을 확인하세요.')
    }
  }
}

// 바이트를 읽기 쉬운 형태로 변환
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

checkStorageUsage()
