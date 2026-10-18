// ============================================================
//  헬마드 — 전신운동 버피할 때 허리 박살 안 나는 법 편  [headline 레이아웃]
//  결과물 폴더: out/헬마드/<오늘날짜>_<순번>/ (261017_06)
//
//  ★ 헤드라인 = 인트로 (동일 문구 케이스)
//     - 헤드라인(상단 고정) = 인트로(흰 카드/낭독):
//       "버피할 때 이거 모르면 / 허리 박살납니다"
//
//  자막 타이밍은 녹음 전사(narration.generated.ts)의 타임코드 기준.
//  텍스트는 STT 오인식을 원본 대본으로 교정해 아래에 직접 둔다.
//  오디오: public/audio/261026.mp3 (40.66초)
//  인트로 문구는 녹음 0~2.14초에 낭독 → 그 구간엔 하단 자막 없음.
//    (STT 오인식 교정: "디스크의 부담이"→"디스크에 부담이")
// ============================================================
import type { StoryScript } from "../../types";
import { AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";

export const helmadScript: StoryScript = {
  title: "전신운동 버피할 때 이거 모르면 허리 박살납니다!!!",
  views: "0",
  comments: "0",

  // 상단 고정 헤드라인 (= 인트로 동일 문구)
  headline: {
    line1: "버피할 때 이거 모르면",
    line2: "허리 박살납니다",
  },

  // 흰 카드 인트로 (녹음 맨 앞 낭독) — 헤드라인과 동일 문구
  intro: {
    lines: ["버피할 때 이거 모르면", "허리 박살납니다"],
    durationSec: 2.14, // 녹음에서 인트로 낭독이 끝나는 시점(전사 기준). 이 구간엔 자막 없음.
    sfx: "s11",
  },

  // 녹음 오디오 — 영상 길이를 이 오디오에 맞춤
  audioFile: AUDIO_FILE,
  audioDurationSec: AUDIO_DURATION_SEC,

  // ── 자막 트랙: 전사 타임코드 기준으로 문장/구 단위로 묶음. 텍스트는 원본 대본으로 교정. ──
  narration: [
    { start: 2.14, text: "버피는 전신 근육은 늘려주면서" },
    { start: 3.84, text: "체지방은 폭파시키는 최고의 운동이죠." },

    { start: 5.76, text: "근데 버피를 하다 보면 허리 아프다는 분들 가끔 있습니다." },
    { start: 8.4, text: "과연 버피가 허리에 안 좋은 운동일까요?" },
    { start: 10.24, text: "진짜 원인은 따로 있습니다." },

    { start: 11.56, text: "첫째, 허리가 뻣뻣한 겁니다." },
    { start: 13.04, text: "요추는 원래 부드럽게 굽혀지고 움직여야 하는데," },
    { start: 15.12, text: "굳어 있으면 작은 동작에도 삐끗합니다." },
    { start: 17.46, text: "운동 전에 고양이 자세로 요추부터 부드럽게 풀어주세요." },

    { start: 20.16, text: "둘째, 골반은 안 쓰고 허리만 구부리는 겁니다." },
    { start: 22.36, text: "가장 중요한 얘긴데," },
    { start: 23.43, text: "허리만 말면 디스크에 부담이 그대로 꽂힙니다." },
    { start: 25.56, text: "내려갈 땐 골반과 함께 무릎을 접어 상체가 숙여져야 하고," },
    { start: 28.08, text: "다리를 당겨 올라올 땐 상체를 즉각 같이 세워줘야 합니다." },

    { start: 31.26, text: "셋째, 다리를 뒤로 뻗을 때 배에 힘이 빠지는 겁니다." },
    { start: 33.66, text: "그 순간 골반이 아래로 푹 꺼지면서 허리가 꺾이는 거죠." },
    { start: 36.36, text: "그러니 다리를 뻗기 직전엔 배에 힘을 꽉 줘서," },
    { start: 38.28, text: "허리가 아래로 처지지 않게 해야 합니다." },
  ],

  // ── 효과음 전환 타이밍(주제 전환점에 맞춤). photo는 폴백값(main엔 미표시) ──
  cuts: [
    { start: 2.14, photo: "", zoom: "in", sfxOnEnter: "s08", lines: [], source: "" }, // 서론(버피 = 최고 운동)
    { start: 5.76, photo: "", zoom: "in", sfxOnEnter: "s09", lines: [], source: "" }, // 허리 아픈 사람 많다 / 진짜 원인
    { start: 11.56, photo: "", zoom: "out", sfxOnEnter: "s01", lines: [], source: "" }, // 원인1: 뻣뻣한 허리
    { start: 17.46, photo: "", zoom: "in", sfxOnEnter: "s02", lines: [], source: "" }, // 해결1: 고양이 자세
    { start: 20.16, photo: "", zoom: "out", sfxOnEnter: "s06", lines: [], source: "" }, // 원인2: 허리만 구부림(힙힌지)
    { start: 25.56, photo: "", zoom: "in", sfxOnEnter: "s04", lines: [], source: "" }, // 해결2: 골반+무릎 접기
    { start: 31.26, photo: "", zoom: "out", sfxOnEnter: "s07", lines: [], source: "" }, // 원인3: 다리 뻗을 때 코어 빠짐
    { start: 36.36, photo: "", zoom: "in", sfxOnEnter: "s05", lines: [], source: "" }, // 해결3: 배 브레이싱
  ],
};
