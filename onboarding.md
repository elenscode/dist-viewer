# Plotly-React-POC Onboarding Guide

이 문서(`plotly-react-thumbnail-modal-poc`)는 신규 합류자를 위한 프로젝트 전반적인 구조와 주요 특징을 설명하는 온보딩 가이드입니다. 이 프로젝트는 **Plotly.js와 React를 활용하여 대량의 차트를 성능 저하 없이 보여주기 위한 Proof of Concept (PoC, 개념 증명)** 형태의 프론트엔드 프로젝트입니다.

## 1. 기술 스택 (Tech Stack)

* **Core Framework:** React 18, TypeScript
* **Build Tool:** Vite (빠른 개발 환경 및 빌드 제공)
* **Styling:** Tailwind CSS v4 (유틸리티 클래스 기반 스타일링)
* **Charting:** Plotly.js, `react-plotly.js` (인터랙티브 웹 차트 구현, 특히 `scattergl`과 같은 WebGL 기반 렌더링에 특화)

## 2. 핵심 아키텍처 및 특징 (Architecture & Features)

이 프로젝트의 가장 중요한 목적은 **성능 최적화**입니다. Plotly와 같은 무거운 WebGL 차트 수십 개를 한 화면에 동시에 렌더링하면 브라우저에 엄청난 부하가 발생합니다. 이를 해결하기 위해 다음과 같은 아키텍처를 채택했습니다.

* **썸네일 기반 그리드 (Thumbnail Grid):** 메인 화면(`ChartGrid`)에서는 실제 차트를 그리지 않고, **가벼운 정적 이미지(Thumbnail)**만을 렌더링합니다. 이를 통해 아무리 많은 차트 목록이 있더라도 부드러운 스크롤과 빠른 로딩이 가능합니다.
* **지연 로딩 및 모달 렌더링 (Lazy Mounting in Modal):** 사용자가 특정 차트 썸네일을 클릭했을 때만 `ChartModal`이 열리면서 해당 차트에 대한 실제 `PlotlyChart` 컴포넌트가 마운트(렌더링)됩니다. 즉, 사용자가 활성화한 단 1개의 차트만 메모리와 GPU를 사용하게 됩니다.
* **검색 필터 기능:** `App.tsx`에 차트 제목을 검색할 수 있는 간단한 필터링 기능이 내장되어 있습니다.

## 3. 프로젝트 폴더 구조 (Project Structure)

주요 코드는 `src/` 디렉토리 내에 관심사별로 분리되어 있습니다.

```text
src/
├── api/
│   └── mockCharts.ts    # 백엔드 API를 모방(Mock)하여 썸네일 이미지 URL 및 차트 메타데이터를 비동기적으로 제공하는 로직
├── components/
│   ├── ChartGrid.tsx    # 썸네일 카드들을 그리드 레이아웃(다단 배치)으로 나열하는 래퍼 컴포넌트
│   ├── ChartCard.tsx    # 개별 썸네일 이미지를 보여주고, 클릭 이벤트를 처리하는 카드 컴포넌트
│   ├── ChartModal.tsx   # 카드를 클릭했을 때 화면 중앙에 뜨는 팝업창(모달)
│   └── PlotlyChart.tsx  # react-plotly.js를 감싸서 실제 인터랙티브 차트(scattergl 등)를 그리는 컴포넌트
├── types/
│   └── chart.ts         # TypeScript 인터페이스 및 타입 정의 (ChartThumbnail 등)
├── App.tsx              # 메인 애플리케이션 컴포넌트 (상태 관리, 검색 레이아웃, 모달 띄우기 제어)
├── index.css            # 글로벌 스타일 및 Tailwind CSS 진입점
└── main.tsx             # React 앱을 DOM에 마운트하는 진입 파일
```

## 4. 요약

**`plotly-react-thumbnail-modal-poc`** 프로젝트는 대규모 데이터 시각화 대시보드를 구축할 때 흔히 마주치는 성능 문제를 **"목록은 가벼운 썸네일 이미지로, 상세 보기는 모달 내 실제 차트 렌더링으로"** 해결하는 모범적인 패턴을 구현해 놓은 스타터 템플릿입니다. 현재는 Mock API를 사용하고 있지만, 추후 실제 백엔드 API를 연결하여 사용하기 좋게 설계되어 있습니다.
