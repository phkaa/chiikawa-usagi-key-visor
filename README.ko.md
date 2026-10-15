<div align="right">
  <a href="README.md"><img src="https://img.shields.io/badge/lang-English-gray.svg" alt="English"></a>
  <a href="README.ko.md"><img src="https://img.shields.io/badge/lang-한국어-blue.svg" alt="Korean"></a>
</div>

# Chiikawa Usagi Key Visor

어떤 프로그램을 실행하더라도 항상 최상위에 떠 있으며, 테두리와 타이틀바가 없는 투명한 창에서 키보드 입력에 따라 캐릭터 이미지가 역동적으로 변하는 데스크톱 오버레이 프로그램입니다.

![screenshot](./docs/screenshot.png)

## ✨ 주요 기능

- **항상 최상위 유지 (Always on Top):** 어떤 게임이나 프로그램 위에서도 항상 떠 있습니다.
- **투명 오버레이:** 타이틀바와 테두리가 없는 투명한 배경으로 제공됩니다.
- **동적 캐릭터 애니메이션:**
  - 키를 누를 때마다 `left.png`와 `right.png`가 번갈아 나타납니다.
  - 입력이 없은 지 0.5초가 지나면 `idle.png` (대기 상태)로 돌아갑니다.
  - 키 입력이 3초 이상 없으면 `fire.png` (화염 상태)로 변신합니다.
- **시스템 트레이 연동:** 작업표시줄에 아이콘을 남기지 않고 시스템 트레이(우측 하단)를 통해 백그라운드에서 조용히 실행 및 종료를 관리합니다.

## 🛠️ 사용 기술 및 라이브러리

- **프레임워크:** [Electron](https://www.electronjs.org/)
- **글로벌 키 훅:** [uiohook-napi](https://www.npmjs.com/package/uiohook-napi) (시스템 전역 `keydown` 이벤트 감지)
- **런타임 환경:** Node.js

## 📥 설치 방법 (Installation)

1. **프로젝트 클론 또는 다운로드:**

   ```bash
   git clone <repository-url>
   cd key-visor
   ```

2. **필수 패키지 설치:**

   ```bash
   npm install
   ```

3. **네이티브 모듈 리빌드 (`uiohook-napi` 구동 필수):**
   ```bash
   npx electron-rebuild -f -w uiohook-napi
   ```

## 🚀 실행 방법 (How to Run)

1. 개발 모드로 애플리케이션을 실행합니다:
   ```bash
   npm start
   ```

## ❌ 종료 방법 (How to Quit)

- 본 프로그램은 작업표시줄에 아이콘이 표시되지 않도록(`skipTaskbar: true`) 설정된 투명 오버레이 앱이므로, **시스템 트레이**를 통해 안전하게 종료해야 합니다:
  1. 윈도우 우측 하단 시계 옆의 **시스템 트레이(숨겨진 아이콘 표시)** 영역을 확인합니다.
  2. **Key Visor** 트레이 아이콘(`icon.png`)을 마우스 **우클릭**합니다.
  3. **Quit** 메뉴를 클릭하여 프로그램을 완전히 종료합니다.
