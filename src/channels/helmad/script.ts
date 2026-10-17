// ============================================================
//  헬마드 — 카오스 150개 푸쉬업(미국 길거리 괴물 루틴) 편  [headline 레이아웃]
//  결과물 폴더: out/헬마드/<오늘날짜>_<순번>/
//
//  ★ 헤드라인 ≠ 인트로 (분리 케이스)
//     - 헤드라인(상단 고정): "당신을 xx 해버리는 / 미친 푸쉬업 루틴 ㄷㄷ"
//     - 인트로(흰 카드, 녹음 맨 앞 낭독): "사상 최강이자 최악의 / 고통이라는 푸쉬업 루틴 ㄷㄷ"
//
//  자막 타이밍은 녹음 전사(narration.generated.ts)의 타임코드 기준.
//  텍스트는 STT 오인식을 원본으로 교정해 아래에 직접 둔다.
//  오디오: public/audio/261017.mp3 (51.34초)
//  인트로 문구는 녹음 0~약2.76초에 낭독 → 그 구간 자막 없음.
//    (STT 오인식 교정: 마이클 타이슨→마이크 타이슨, 비오드→비오듯, 집고→짚고)
// ============================================================
import type { StoryScript } from "../../types";
import { AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";

export const helmadScript: StoryScript = {
  title: "카오스 150개 푸쉬업 - 미국 길거리 괴물 루틴",
  views: "0",
  comments: "0",

  // 상단 고정 헤드라인 (인트로 카드와 다름)
  headline: {
    line1: "당신을 xx 해버리는",
    line2: "미친 푸쉬업 루틴 ㄷㄷ",
  },

  // 흰 카드 인트로 (녹음 맨 앞 낭독) — 헤드라인과 다른 문구
  intro: {
    lines: ["사상 최강이자 최악의", "고통이라는 푸쉬업 루틴 ㄷㄷ"],
    durationSec: 2.76, // 녹음에서 인트로 낭독이 끝나는 시점(전사 기준). 이 구간엔 자막 없음.
    sfx: "s11",
  },

  // 녹음 오디오 — 영상 길이를 이 오디오에 맞춤
  audioFile: AUDIO_FILE,
  audioDurationSec: AUDIO_DURATION_SEC,

  // ── 자막 트랙: 녹음에서 실제 말한 내용대로, 화면 한 줄에 맞게만 쪼갬. 전사 타임코드 기준. ──
  narration: [
    { start: 2.76, text: "미국 길거리 운동 괴물들이" },
    { start: 4.33, text: "몸을 만들 때 하는" },
    { start: 4.8, text: "카오스 푸쉬업 루틴입니다" },

    { start: 6.48, text: "온몸이 불타고, 특히 몸통 체지방이" },
    { start: 8.34, text: "증발하면서" },
    { start: 9.06, text: "코어가 아주 돌덩이처럼" },
    { start: 10.26, text: "강해지는 방법이죠" },

    { start: 11.16, text: "일단 엎드려서 손을 짚고 기어나갑니다" },
    { start: 13, text: "그리고 푸쉬업을 한 번 한 뒤," },
    { start: 14.37, text: "손으로 한쪽 어깨를 터치" },
    { start: 15.48, text: "다시 푸쉬업, 반대쪽 어깨 터치" },
    { start: 17.44, text: "다시 푸쉬업, 한쪽 무릎을 터치" },
    { start: 19.36, text: "푸쉬업, 반대쪽 무릎 터치" },
    { start: 20.64, text: "다시 푸쉬업, 한쪽 발 앞꿈치를 터치" },
    { start: 22.6, text: "푸쉬업, 반대쪽 앞꿈치 터치" },
    { start: 24.44, text: "다시 푸쉬업, 몸을 굽혀 앞꿈치 터치" },
    { start: 26.17, text: "푸쉬업, 반대쪽 앞꿈치 터치" },
    { start: 28.02, text: "푸쉬업," },
    { start: 28.43, text: "마지막으로 마이크 타이슨 푸쉬업 하나" },
    { start: 30.72, text: "한 팔 한 팔씩 기어 올라와서" },
    { start: 32.04, text: "발목 터치하고" },
    { start: 32.84, text: "스쿼트 한 번 해주고 올라오면 끝입니다" },

    { start: 34.88, text: "이렇게 하면 한 랩스에 푸쉬업이" },
    { start: 35.79, text: "몇 개나 들어있을까요?" },
    { start: 37.2, text: "그리고 이걸 몇 바퀴 돌리면" },
    { start: 38.01, text: "150개가 될까요?" },

    { start: 39.28, text: "중요한 건 중간에 멈추지 않고" },
    { start: 40.4, text: "리듬을 유지하는 거," },
    { start: 41.6, text: "그리고 마지막 스쿼트를" },
    { start: 42.69, text: "절대 빼먹지 않는 겁니다" },

    { start: 43.84, text: "가슴, 어깨, 코어, 하체까지" },
    { start: 45.32, text: "쉴 틈 없이 털리기 때문에," },
    { start: 46.64, text: "세트가 끝날 때쯤이면" },
    { start: 47.82, text: "전신이 불타고," },
    { start: 48.68, text: "땀이 비오듯 쏟아지는" },
    { start: 49.66, text: "경험을 하게 되실 겁니다" },
  ],

  // ── 효과음 전환 타이밍(주제·동작 전환점에 맞춤). photo는 폴백값(main엔 미표시) ──
  cuts: [
    { start: 2.76, photo: "", zoom: "in", sfxOnEnter: "s08", lines: [], source: "" }, // 도입(소개)
    { start: 6.48, photo: "", zoom: "in", sfxOnEnter: "s01", lines: [], source: "" }, // 효과(체지방·코어)
    { start: 11.16, photo: "", zoom: "out", sfxOnEnter: "s09", lines: [], source: "" }, // 동작 시작(기어나가기)
    { start: 15.48, photo: "", zoom: "in", sfxOnEnter: "s02", lines: [], source: "" }, // 어깨 터치
    { start: 19.36, photo: "", zoom: "out", sfxOnEnter: "s03", lines: [], source: "" }, // 무릎 터치
    { start: 22.6, photo: "", zoom: "in", sfxOnEnter: "s04", lines: [], source: "" }, // 앞꿈치 터치
    { start: 28.43, photo: "", zoom: "out", sfxOnEnter: "s10", lines: [], source: "" }, // 마이크 타이슨~스쿼트
    { start: 34.88, photo: "", zoom: "in", sfxOnEnter: "s13", lines: [], source: "" }, // 질문(개수 퀴즈)
    { start: 39.28, photo: "", zoom: "in", sfxOnEnter: "s06", lines: [], source: "" }, // 핵심 팁(리듬·스쿼트)
    { start: 43.84, photo: "", zoom: "out", sfxOnEnter: "s07", lines: [], source: "" }, // 마무리(전신·땀)
  ],
};
