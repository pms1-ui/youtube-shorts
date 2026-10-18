// ============================================================
//  헬마드 — 달리기(러닝) 페이스 개빨라지는 법 편  [headline 레이아웃]
//  결과물 폴더: out/헬마드/<오늘날짜>_<순번>/ (261017_05)
//
//  ★ 헤드라인 = 인트로 (동일 문구 케이스)
//     - 헤드라인(상단 고정) = 인트로(흰 카드/낭독):
//       "러닝 페이스를 폭발적으로 / 증가시키는 가장 빠른 방법"
//
//  자막 타이밍은 녹음 전사(narration.generated.ts)의 타임코드 기준.
//  텍스트는 STT 오인식을 원본 대본으로 교정해 아래에 직접 둔다.
//  오디오: public/audio/261024.mp3 (57.6초)
//  인트로 문구는 녹음 0~2.7초에 낭독 → 그 구간엔 하단 자막 없음.
//    (STT 오인식 교정: "떨거나야"→"떨궈놔야", "포미고"→"폼이고", "내리 꽂는"→"내리꽂는")
// ============================================================
import type { StoryScript } from "../../types";
import { AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";

export const helmadScript: StoryScript = {
  title: "달리기(러닝) 페이스 개빨라지는 법 (효과 직빵)",
  views: "0",
  comments: "0",

  // 상단 고정 헤드라인 (= 인트로 동일 문구)
  headline: {
    line1: "러닝 페이스를 폭발적으로",
    line2: "증가시키는 가장 빠른 방법",
  },

  // 흰 카드 인트로 (녹음 맨 앞 낭독) — 헤드라인과 동일 문구
  intro: {
    lines: ["러닝 페이스를 폭발적으로", "증가시키는 가장 빠른 방법"],
    durationSec: 2.7, // 녹음에서 인트로 낭독이 끝나는 시점(전사 기준). 이 구간엔 자막 없음.
    sfx: "s11",
  },

  // 녹음 오디오 — 영상 길이를 이 오디오에 맞춤
  audioFile: AUDIO_FILE,
  audioDurationSec: AUDIO_DURATION_SEC,

  // ── 자막 트랙: 전사 타임코드 기준으로 문장/구 단위로 묶음. 텍스트는 원본 대본으로 교정. ──
  narration: [
    { start: 2.7, text: "헬스나 근력운동 좋아하시는 분들은" },
    { start: 4.4, text: "러닝할 때 1km당 평균 페이스를 6분 또는" },
    { start: 7.14, text: "5분 이내로 줄이기 정말 힘드실 겁니다" },

    { start: 8.92, text: "유튜브 보면서 폼 교정하고 호흡법 배우고" },
    { start: 11.28, text: "비싼 신발까지 샀는데" },
    { start: 12.4, text: "기록이 정체되시는 분들도 정말 많습니다" },

    { start: 14.4, text: "경험상, 이러한 현상의 진짜 장애물은 따로 있습니다" },
    { start: 17.2, text: "절반 이상은 여기에 해당되는데," },
    { start: 18.78, text: "바로 몸무게, 체중입니다" },

    { start: 20.12, text: "러닝은 체중을 공중에 띄웠다 내리꽂는 운동이라," },
    { start: 22.52, text: "1kg만 더 쪄 있어도 한 걸음마다 3kg 넘는 충격이" },
    { start: 25.56, text: "발목 무릎 허리에 반복해서 꽂힙니다" },

    { start: 27.5, text: "따라서 체중이 뒤에 말씀드릴 해당 기준 이상이면" },
    { start: 30.1, text: "부상의 위험도 기하급수적으로 높아지는데요," },
    { start: 32.3, text: "무거운 몸으로 억지로 페이스 올리는 건" },
    { start: 34, text: "사실상 굉장히 어렵기도 하고," },
    { start: 35.5, text: "하더라도 관절 수명이 저하됩니다" },

    { start: 37.1, text: "그래서 러닝을 정말 잘 하고 싶다면," },
    { start: 38.39, text: "체중 감량이 필수인 건데," },
    { start: 40, text: "언덕 걷기나 가벼운 조깅을 추천드리고," },

    { start: 42.1, text: "놀라운 건, 딱 5kg만 빼도" },
    { start: 43.81, text: "평균 페이스가 20초에서 50초까지 단축될 수 있습니다" },

    { start: 46.6, text: "남자는 175cm 기준 70kg 미만," },
    { start: 49.1, text: "여자는 160cm 기준 50kg 미만으로는 떨궈놔야" },
    { start: 52.4, text: "페이스 올릴 준비가 된 거라 볼 수 있습니다" },

    { start: 54.3, text: "폼이고 영양제고, 그냥 살을 빼세요" },
    { start: 56.21, text: "그게 제일 빠릅니다" },
  ],

  // ── 효과음 전환 타이밍(주제 전환점에 맞춤). photo는 폴백값(main엔 미표시) ──
  cuts: [
    { start: 2.7, photo: "", zoom: "in", sfxOnEnter: "s08", lines: [], source: "" }, // 서론(헬스인 공감 훅)
    { start: 8.92, photo: "", zoom: "in", sfxOnEnter: "s01", lines: [], source: "" }, // 폼·호흡·신발 다 해봤는데
    { start: 14.4, photo: "", zoom: "out", sfxOnEnter: "s09", lines: [], source: "" }, // 진짜 장애물 = 체중
    { start: 20.12, photo: "", zoom: "in", sfxOnEnter: "s02", lines: [], source: "" }, // 충격·관절
    { start: 27.5, photo: "", zoom: "out", sfxOnEnter: "s06", lines: [], source: "" }, // 부상 위험·제자리걸음
    { start: 37.1, photo: "", zoom: "in", sfxOnEnter: "s07", lines: [], source: "" }, // 감량이 답·처방
    { start: 42.1, photo: "", zoom: "out", sfxOnEnter: "s04", lines: [], source: "" }, // 5kg면 20~50초
    { start: 46.6, photo: "", zoom: "in", sfxOnEnter: "s05", lines: [], source: "" }, // 목표 체중 기준
  ],
};
