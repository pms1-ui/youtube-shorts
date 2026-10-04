// ============================================================
//  헬마드 — 대본 (글 6편, 3편 인클라인 워킹)  [headline 레이아웃]
//  주제: 달리지 않고 체지방 빼는 법 (인클라인 워킹 / 관절 부담↓ 지방연소↑)
//
//  자막 타이밍은 녹음 전사(narration.generated.ts)의 타임코드 기준.
//  텍스트는 STT 오인식을 원본(녹음에서 실제 말한 내용)으로 교정해 아래에 직접 둔다.
//  오디오: public/audio/261004.mp3 (36.02초)
//  인트로 문장("달리지 않고 체지방 미친 듯 빼는 법")은 녹음 0~약2.04초에 포함 → 그 구간 자막 없음.
// ============================================================
import type { StoryScript } from "../../types";
import { AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";

export const helmadScript: StoryScript = {
  title: "달리지 않고 체지방 미친 듯 빼는 법",
  views: "0",
  comments: "0",

  headline: {
    line1: "달리지 않고", // 6자
    line2: "체지방 빼는 법", // 7자
  },

  intro: {
    lines: ["달리지 않고", "체지방 미친 듯 빼는 법"],
    durationSec: 2.04, // 녹음에서 제목 낭독이 끝나는 시점(전사 기준). 이 구간엔 자막 없음.
    sfx: "s11",
  },

  // 녹음 오디오 — 영상 길이를 이 오디오에 맞춤
  audioFile: AUDIO_FILE,
  audioDurationSec: AUDIO_DURATION_SEC,

  // ── 자막 트랙: 녹음에서 실제 말한 내용대로, 화면 한 줄에 맞게만 쪼갬. 전사 타임코드 기준. ──
  //    (STT 오인식 교정: "집에서 최대 50%"의 잘못 낀 "집에서" 제거 → "최대 50% 이상")
  narration: [
    { start: 2.04, text: "무릎과 발목에는" },
    { start: 2.92, text: "부담을 거의 안 주면서," },
    { start: 4.06, text: "체지방은 더 잘 태우는" },
    { start: 5.04, text: "운동이 있습니다" },

    { start: 5.94, text: "뛸 필요도 없습니다" },
    { start: 6.86, text: "그냥 걷기만 하면 되죠" },

    { start: 8, text: "비밀은 딱 하나," },
    { start: 8.9, text: "경사입니다" },

    { start: 9.6, text: "뻔한 소리 아니냐구요?" },
    { start: 10.66, text: "아닙니다" },

    { start: 11.16, text: "평지를 오르막으로" },
    { start: 12.04, text: "올리는 순간," },
    { start: 12.64, text: "관절에 실리는 충격은" },
    { start: 13.91, text: "확 줄어드는데," },
    { start: 14.7, text: "하체와 엉덩이 개입도는" },
    { start: 16.43, text: "최대 50% 이상" },
    { start: 17.46, text: "훨씬 강하게 동원됩니다" },

    { start: 18.74, text: "이뿐만이 아닙니다" },
    { start: 19.64, text: "더 놀라운 사실은," },
    { start: 20.6, text: "몸이 이 경사를 오를 때" },
    { start: 21.84, text: "에너지를 지방에서" },
    { start: 23.12, text: "끌어다 쓰는 비율이" },
    { start: 23.74, text: "확 올라갑니다" },

    { start: 24.54, text: "숨차게 뛸 때보다" },
    { start: 25.54, text: "오히려 지방을" },
    { start: 26.21, text: "더 많이 태우는 거죠" },

    { start: 27.16, text: "방법은 간단합니다" },
    { start: 29.6, text: "러닝머신 경사를" },
    { start: 30.3, text: "8에서 12도로" },
    { start: 31.0, text: "설정하고," },
    { start: 31.6, text: "속도는 시속 5 전후로," },
    { start: 32.3, text: "딱 30분 걷는 겁니다" },

    { start: 33.02, text: "관절 아파서 못 뛰던" },
    { start: 34.05, text: "사람도 무리 없이" },
    { start: 34.97, text: "할 수 있죠" },
  ],

  // ── 효과음 전환 타이밍(주제 전환점에 맞춤). photo는 폴백값(main엔 미표시) ──
  cuts: [
    { start: 2.04, photo: "", zoom: "in", sfxOnEnter: "s08", lines: [], source: "" }, // 도입(관절부담↓ 지방↑)
    { start: 5.94, photo: "", zoom: "in", sfxOnEnter: "s01", lines: [], source: "" }, // 그냥 걷기
    { start: 8, photo: "", zoom: "out", sfxOnEnter: "s10", lines: [], source: "" }, // 비밀=경사
    { start: 9.6, photo: "", zoom: "in", sfxOnEnter: "s05", lines: [], source: "" }, // 뻔한 소리? 반전
    { start: 11.16, photo: "", zoom: "in", sfxOnEnter: "s02", lines: [], source: "" }, // 충격↓ 개입↑
    { start: 18.74, photo: "", zoom: "out", sfxOnEnter: "s09", lines: [], source: "" }, // 더 놀라운 사실
    { start: 24.54, photo: "", zoom: "in", sfxOnEnter: "s13", lines: [], source: "" }, // 지방 더 태움
    { start: 27.16, photo: "", zoom: "in", sfxOnEnter: "s06", lines: [], source: "" }, // 방법(이름=인클라인)
    { start: 33.02, photo: "", zoom: "out", sfxOnEnter: "s07", lines: [], source: "" }, // 마무리
  ],
};
