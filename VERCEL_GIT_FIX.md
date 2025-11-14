# Vercel Git 저장소 연결 수정 가이드

## 현재 상황
- **실제 Git 저장소**: `https://github.com/jalpalja0001-blip/hongsu`
- **로컬 remote**: `seobaejun/jalpahongsu` (잘못된 연결)
- **Vercel 연결**: 확인 필요

## 해결 방법

### 방법 1: Vercel 대시보드에서 저장소 변경 (권장)

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard
   - `jalpahongsu` 프로젝트 클릭

2. **Git 연결 변경**
   - **Settings** → **Git** 메뉴로 이동
   - 현재 연결된 저장소 확인
   - **Disconnect** 클릭 (기존 연결 해제)
   - **Connect Git Repository** 클릭
   - 올바른 저장소 선택: `jalpalja0001-blip/hongsu`
   - 브랜치 선택: `clean-main` (또는 `master`)
   - **Connect** 클릭

3. **Production Branch 확인**
   - **Settings** → **Git** → **Production Branch**
   - `clean-main` 또는 `master`로 설정

### 방법 2: 로컬 Git remote 업데이트 (선택사항)

로컬 저장소의 remote를 새로운 저장소로 변경하려면:

```bash
# 기존 remote 제거
git remote remove origin

# 새로운 remote 추가
git remote add origin https://github.com/jalpalja0001-blip/hongsu.git

# 확인
git remote -v
```

**주의**: 이 작업은 로컬 Git 설정만 변경합니다. Vercel 연결은 별도로 해야 합니다.

### 방법 3: Vercel CLI로 연결

```bash
# Vercel CLI 설치 (없다면)
npm install -g vercel

# 로그인
vercel login

# 프로젝트 디렉토리에서
cd C:\jalpahongsu-master

# Git 연결
vercel git connect
# 저장소 선택: jalpalja0001-blip/hongsu
```

## 확인 사항

연결 후 확인:
- [ ] Vercel → Settings → Git에서 `jalpalja0001-blip/hongsu` 저장소가 연결되어 있는가?
- [ ] Production Branch가 올바른 브랜치(`clean-main` 또는 `master`)로 설정되어 있는가?
- [ ] GitHub → Settings → Webhooks에 Vercel webhook이 있는가?

## 테스트

연결 후 자동 배포 테스트:

```bash
# 변경사항 커밋
git add .
git commit -m "test: vercel auto deploy"

# 푸시
git push origin clean-main
# 또는
git push origin master
```

푸시 후 Vercel 대시보드의 **Deployments** 탭에서 자동 배포가 시작되는지 확인하세요.

