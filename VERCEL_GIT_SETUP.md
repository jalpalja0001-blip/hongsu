# Vercel Git 연결 설정 가이드

## 방법 1: Vercel 대시보드에서 Git 연결 (권장)

### 1단계: Vercel 대시보드 접속
1. https://vercel.com/dashboard 접속
2. 로그인 (GitHub 계정으로 로그인 권장)

### 2단계: 기존 프로젝트에 Git 연결
1. 프로젝트 목록에서 `jalpahongsu` 프로젝트 클릭
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Git** 클릭
4. **Connect Git Repository** 버튼 클릭
5. Git 제공업체 선택 (GitHub, GitLab, Bitbucket 등)
6. 저장소 선택:
   - 저장소 이름: `jalpahongsu` 또는 `seobaejun/jalpahongsu`
   - 브랜치: `master` (또는 `main`)
7. **Connect** 버튼 클릭

### 3단계: 배포 설정 확인
1. **Settings** → **Git**에서 연결된 저장소 확인
2. **Production Branch**: `master`로 설정
3. **Deploy Hooks**: 필요시 설정

### 4단계: 자동 배포 테스트
1. Git에 푸시:
   ```bash
   git push origin master
   ```
2. Vercel 대시보드의 **Deployments** 탭에서 자동 배포 확인

---

## 방법 2: Vercel CLI를 통한 Git 연결

### 1단계: Vercel CLI 설치 및 로그인
```bash
npm install -g vercel
vercel login
```

### 2단계: 프로젝트 연결
```bash
cd C:\jalpahongsu-master
vercel link
```

### 3단계: Git 저장소 연결
```bash
vercel git connect
```

### 4단계: 배포 설정 확인
```bash
vercel inspect
```

---

## 방법 3: 새 프로젝트로 Git 연결

### 1단계: Vercel 대시보드에서 새 프로젝트 생성
1. https://vercel.com/dashboard 접속
2. **Add New...** → **Project** 클릭
3. **Import Git Repository** 클릭
4. Git 제공업체 선택 (GitHub 권장)
5. 저장소 선택: `seobaejun/jalpahongsu`
6. **Import** 클릭

### 2단계: 프로젝트 설정
- **Project Name**: `jalpahongsu`
- **Framework Preset**: Next.js (자동 감지)
- **Root Directory**: `./` (기본값)
- **Build Command**: `npm run build` (기본값)
- **Output Directory**: `.next` (기본값)
- **Install Command**: `npm install` (기본값)

### 3단계: 환경 변수 설정
**Settings** → **Environment Variables**에서 다음 변수들 추가:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

(자세한 값은 `vercel_env_variables.txt` 파일 참고)

### 4단계: 배포
1. **Deploy** 버튼 클릭
2. 배포 완료 후 자동 배포 활성화 확인

---

## 문제 해결

### Git 연결이 안 될 때
1. **Vercel 계정과 Git 계정이 같은지 확인**
   - Vercel → Settings → Connected Accounts
   - GitHub 계정이 연결되어 있는지 확인

2. **저장소 권한 확인**
   - GitHub 저장소가 Private인 경우, Vercel에 권한 부여 필요
   - Vercel → Settings → Git → Repository Access

3. **기존 프로젝트 삭제 후 재연결**
   - Settings → General → Delete Project
   - 새로 프로젝트 생성하여 Git 연결

### 자동 배포가 안 될 때
1. **Git Webhook 확인**
   - GitHub 저장소 → Settings → Webhooks
   - Vercel webhook이 있는지 확인

2. **브랜치 설정 확인**
   - Vercel → Settings → Git
   - Production Branch가 올바른지 확인

3. **배포 로그 확인**
   - Vercel → Deployments
   - 실패한 배포의 로그 확인

---

## 현재 프로젝트 정보
- **프로젝트 이름**: jalpahongsu
- **Git 저장소**: seobaejun/jalpahongsu (추정)
- **브랜치**: master
- **배포 URL**: https://jalpahongsu-ezyc80n53-skybj1004-3272s-projects.vercel.app

---

## 참고 사항
- Git 연결 후에는 `git push`만 하면 자동으로 배포됩니다
- Pull Request 생성 시 Preview 배포가 자동으로 생성됩니다
- 환경 변수는 각 환경(Production, Preview, Development)별로 설정 가능합니다

