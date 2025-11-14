# Vercel 자동 배포 문제 해결 가이드

## 문제: Git이 연결되어 있는데 자동 배포가 안 됨

### 해결 방법 1: Vercel 대시보드에서 Git 연결 재설정

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard
   - `jalpahongsu` 프로젝트 클릭

2. **Git 설정 확인 및 재연결**
   - **Settings** → **Git** 메뉴로 이동
   - 현재 연결된 저장소 확인
   - 문제가 있다면:
     - **Disconnect** 클릭
     - **Connect Git Repository** 클릭
     - 저장소 다시 선택: `seobaejun/jalpahongsu`
     - 브랜치: `master`
     - **Connect** 클릭

3. **Production Branch 확인**
   - **Settings** → **Git** → **Production Branch**
   - `master`로 설정되어 있는지 확인

---

### 해결 방법 2: GitHub Webhook 확인 및 재설정

1. **GitHub 저장소 접속**
   - https://github.com/seobaejun/jalpahongsu
   - **Settings** → **Webhooks** 메뉴로 이동

2. **Vercel Webhook 확인**
   - `api.vercel.com` 또는 `vercel.com`으로 시작하는 webhook이 있는지 확인
   - 없다면 Vercel이 자동으로 생성해야 함

3. **Webhook이 없다면**
   - Vercel 대시보드에서 Git 연결을 다시 해야 함
   - 또는 수동으로 webhook 추가:
     - **Add webhook** 클릭
     - Payload URL: `https://api.vercel.com/v1/integrations/github/...` (Vercel에서 제공)
     - Content type: `application/json`
     - Events: `Just the push event` 선택
     - **Add webhook** 클릭

---

### 해결 방법 3: Vercel CLI로 수동 배포 및 연결 확인

터미널에서 다음 명령어 실행:

```bash
# Vercel CLI 설치 (없다면)
npm install -g vercel

# Vercel 로그인
vercel login

# 프로젝트 디렉토리로 이동
cd C:\jalpahongsu-master

# 프로젝트 연결 확인
vercel link

# Git 연결 확인
vercel git connect

# 수동 배포 (테스트용)
vercel --prod
```

---

### 해결 방법 4: Vercel 프로젝트 설정 확인

1. **Vercel 대시보드** → **Settings** → **General**
   - **Project Name**: `jalpahongsu`
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` 또는 `next build`
   - **Output Directory**: `.next` (기본값)
   - **Install Command**: `npm install`

2. **Settings** → **Git**
   - **Production Branch**: `master`
   - **Auto-deploy from Git**: 활성화되어 있는지 확인
   - **Ignore Build Step**: 비활성화되어 있는지 확인

---

### 해결 방법 5: 배포 로그 확인

1. **Vercel 대시보드** → **Deployments** 탭
2. 최근 배포 내역 확인
3. 실패한 배포가 있다면:
   - 해당 배포 클릭
   - **Build Logs** 확인
   - 에러 메시지 확인

**일반적인 에러:**
- `Build Command failed`: 빌드 명령어 오류
- `Environment Variable missing`: 환경 변수 누락
- `Git repository not found`: Git 연결 문제

---

### 해결 방법 6: GitHub 저장소 권한 확인

1. **GitHub 저장소가 Private인 경우**
   - Vercel → **Settings** → **Git** → **Repository Access**
   - 저장소에 대한 접근 권한이 있는지 확인
   - 없다면 권한 부여 필요

2. **Vercel GitHub App 권한 확인**
   - GitHub → **Settings** → **Applications** → **Installed GitHub Apps**
   - Vercel 앱이 설치되어 있는지 확인
   - 저장소 접근 권한이 있는지 확인

---

### 해결 방법 7: 수동으로 배포 트리거

임시 해결책으로 수동 배포:

1. **Vercel 대시보드** → **Deployments**
2. 최근 배포 옆의 **⋯** 메뉴 클릭
3. **Redeploy** 클릭
4. 또는 **Settings** → **Git** → **Redeploy** 버튼 클릭

---

### 해결 방법 8: Git Push 테스트

터미널에서 테스트:

```bash
# 현재 브랜치 확인
git branch

# 변경사항 커밋 (테스트용)
git add .
git commit -m "test: vercel auto deploy test"

# master 브랜치에 푸시
git push origin master
```

푸시 후 Vercel 대시보드에서 자동 배포가 시작되는지 확인

---

## 체크리스트

자동 배포가 안 될 때 확인할 사항:

- [ ] Vercel → Settings → Git에서 저장소가 연결되어 있는가?
- [ ] Production Branch가 `master`로 설정되어 있는가?
- [ ] Auto-deploy from Git이 활성화되어 있는가?
- [ ] GitHub → Settings → Webhooks에 Vercel webhook이 있는가?
- [ ] GitHub 저장소가 Private인 경우, Vercel에 권한이 있는가?
- [ ] 최근 배포 로그에 에러가 없는가?
- [ ] 환경 변수가 모두 설정되어 있는가?
- [ ] `git push origin master`를 실행했는가?

---

## 추가 도움말

문제가 계속되면:
1. Vercel 지원팀에 문의: https://vercel.com/support
2. Vercel 문서 확인: https://vercel.com/docs/concepts/git
3. GitHub Actions와 충돌하는지 확인 (`.github/workflows` 폴더)

