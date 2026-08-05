# 10 · 개발 환경 세팅 — 코딩 시작 전에 이대로 한 번만

작성 2026-08-05. 대상은 **코드를 작성하는 팀원**.
구조와 규칙은 `09-implementation-spec.md`에 있다. 이 문서는 **환경 준비**만 다룬다.

> **주의 — 아직 코딩 시작 시점이 아니다.** 강사가 **피그마 디자인 확정 후 코딩**을
> 지시했다. 이 문서대로 환경만 미리 만들어 두고, 화면 구현은 와이어프레임·디자인이
> 끝난 뒤에 시작한다.

## 1. 미리 깔아야 하는 것

| 도구 | 버전 | 확인 |
| --- | --- | --- |
| **Node.js** | **20.19 이상 또는 22.12 이상** (Vite 8 요구사항) | `node -v` |
| npm | Node에 딸려 옴 | `npm -v` |
| Git | 아무 최신 버전 | `git --version` |
| 에디터 | VS Code 권장 | |
| 브라우저 | 크롬 (개발) + **실제 안드로이드 폰** (매일 확인) | |

- Node는 **짝수 LTS**를 쓴다. 홀수 버전은 수명이 짧다
- 버전이 낮으면 Vite가 아예 안 뜬다. **가장 먼저 확인할 것**

### VS Code 확장 (선택)

- ESLint · Prettier
- **Tailwind CSS IntelliSense** — shadcn이 Tailwind 기반이라 이건 실제로 도움이 된다

## 2. 프로젝트 생성

`team-project/` 안에서 실행한다. **저장소 루트가 아니다.**

```bash
cd team-project
npm create vite@latest .
# 프레임워크: React
# 변형: JavaScript          ← TypeScript 아님. 09가 .jsx 기준이다
npm install
```

- **JavaScript를 고른다.** 4일짜리 일정에 타입까지 얹지 않는다.
  shadcn은 JS를 정식 지원한다 (§4)

## 3. Tailwind CSS

shadcn은 Tailwind 위에서 돈다. 먼저 깐다.

```bash
npm install tailwindcss @tailwindcss/vite
```

`src/index.css`의 내용을 **전부 지우고** 아래 한 줄로 바꾼다.

```css
@import "tailwindcss";
```

## 4. 경로 별칭 — shadcn이 요구한다

`@/components` 같은 경로를 쓰려면 별칭 설정이 필요하다.
JS 프로젝트이므로 **`jsconfig.json`** 을 만든다.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

`vite.config.js`에도 같은 별칭과 Tailwind 플러그인을 넣는다.

```js
import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  base: "./",                                   // §7 — 이거 빼면 배포가 깨진다
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
})
```

## 5. shadcn 초기화

```bash
npx shadcn@latest init
```

- 물어보는 것 중 **base color**는 `08`의 무드보드 결정을 따른다. 아직 못 정했으면
  `Neutral`로 두고 나중에 토큰만 바꾼다 — 나중에 바꿔도 안 깨진다
- `components.json`이 생기면 **`"tsx": false`** 인지 확인한다.
  이래야 컴포넌트가 `.jsx`로 들어온다 (공식 지원 옵션)

## 6. 가져올 shadcn 컴포넌트

**한 번에 다 깔지 말 것.** 쓸 때 하나씩 추가한다. 안 쓰는 컴포넌트는 그냥 빚이다.

```bash
npx shadcn@latest add button input textarea card badge slider sheet dialog sonner tabs toggle-group dropdown-menu switch avatar
```

| 컴포넌트 | 어디에 쓰나 |
| --- | --- |
| `button` | 전부 |
| `input` | 탐색 검색 · 제목/아티스트 수정 · 플레이리스트 이름 |
| `textarea` | 일기 본문 |
| `card` | 트랙 행 · 일기 카드 |
| `badge` | 기분 태그 |
| **`slider`** | **재생 위치 스크러버** |
| **`sheet`** | **전역 플레이어 시트** · 곡 추가 시트 |
| `dialog` | 전체 삭제 확인 |
| `sonner` | 오류 알림 (재생 실패 등) |
| `tabs` | **일기 화면 안의** `날짜별 / 기분별` 전환 |
| `toggle-group` | 기분 선택 (5개 중 하나) |
| `dropdown-menu` | 트랙 행의 `⋮` 메뉴 |
| `switch` | 자동 재생 등 on/off |
| `avatar` | 트랙·플레이리스트 썸네일 폴백 |

### 쓰지 않는 것

- **하단 5탭에 `tabs`를 쓰지 않는다.** 목적지 이동이지 패널 전환이 아니므로
  `<nav>` + 버튼으로 직접 만든다 — `NavFooter.jsx` (`09` §6).
  단 **화면 안의 필터 전환(전체/노래/…)에는 `tabs`가 맞다**
- **`drawer`** — `vaul` 의존이라 스와이프 닫기·드래그 핸들이 기본이다. 제스처 금지 규칙과
  충돌하므로 **`sheet`를 쓴다** (sol 검토 08-05, `11` §2)
- `sidebar` · `navigation-menu` — 데스크톱용
- `table` · `chart` — 이 앱에 표도 차트도 없다

## 7. 배포 설정 — 지금 해두면 나중에 안 터진다

GitHub Pages 프로젝트 사이트는 `/<저장소이름>/` 아래에서 서비스된다.
그래서 **`base: "./"`** 가 필요하고, 자산 경로도 전부 상대 경로여야 한다.

```js
// 안 됨 — 배포에서 404
<audio src="/audio/track.mp3" />
// 됨
<audio src="./audio/track.mp3" />
```

- 번들 음원은 `public/audio/`에 둔다. Vite가 그대로 복사해 준다
- **`public/audio/CREDITS.md`를 커밋 전에 채운다.** 저장소는 공개다 (`08`)

## 8. 실행

```bash
npm run dev      # 개발 서버
npm run build    # dist/ 생성
npm run preview  # 빌드 결과를 로컬에서 확인
```

### 실제 폰에서 보기 — 매일 할 것

```bash
npm run dev -- --host
```

- 터미널에 뜨는 `Network:` 주소를 **같은 와이파이의 폰 브라우저**에 입력
- 데스크톱 크롬 반응형 모드는 **진짜 폰이 아니다.** 오디오 자동재생 정책,
  터치 타깃, safe-area는 실제 기기에서만 드러난다
- iOS는 팀에 아이폰이 없어 확인 불가 → "아이폰에서 됩니다"라고 말하지 않는다 (`07`)

## 9. 깔지 말 것

| 안 됨 | 이유 |
| --- | --- |
| 상태 관리 라이브러리 (Redux · Zustand 등) | 이 규모에 필요 없다. `player.js` + `useSyncExternalStore` (`09` §1) |
| 라우터 (react-router) | 탭 4개는 상태 하나로 충분하다 |
| 오디오 라이브러리 (Howler 등) | `<audio>` 하나면 된다. 라이브러리가 엘리먼트를 감추면 `09` §1을 못 지킨다 |
| 분석·트래킹 스크립트 | "파일이 업로드되지 않는다"는 약속이 깨진다 (`08`) |
| UI 라이브러리 추가 (MUI 등) | shadcn과 겹친다 |

## 10. 막히면

- **명세에 없는 구조 결정이 필요하면 만들지 말고 스릿에게 물어본다** (`09` §0)
- 설치가 안 되면 **Node 버전부터** 확인 (§1)

## Related

- `09-implementation-spec.md` — 구조 · 인터페이스 · 규칙
- `../Eng/08-concept-music-diary.md` — 제품 결정 · 자료 구조
