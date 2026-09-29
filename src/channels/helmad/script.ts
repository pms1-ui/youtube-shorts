// ============================================================
//  헬마드 — 대본 (글 3편)  [headline 레이아웃]
//  주제: 요즘 한국인들이 맨몸운동을 선택하는 이유 (가성비·전신운동·홈트)
//
//  자막 타이밍은 녹음 전사(narration.generated.ts)의 타임코드 기준.
//  텍스트는 STT 오인식을 원본 대본으로 교정해 아래에 직접 둔다.
//  오디오: public/audio/260927_2.mp3 (32.6초)
//  인트로 문장("요즘 한국인들이 맨몸운동을 선택하는 이유")은 녹음 0~약2.4초에 포함 → 그 구간 자막 없음.
// ============================================================
import type { StoryScript } from "../../types";
import { AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";

export const helmadScript: StoryScript = {
  title: "요즘 한국인들이 맨몸운동을 선택하는 이유 ㄷㄷ",
  views: "0",
  comments: "0",

  headline: {
    line1: "요즘 한국인들이", // 8자
    line2: "맨몸운동 하는 이유", // 9자
  },

  intro: {
    lines: ["요즘 한국인들이", "맨몸운동 하는 이유"],
    durationSec: 2.4, // 녹음에서 제목 낭독이 끝나는 시점(전사 기준). 이 구간엔 자막 없음.
    sfx: "s11",
  },

  // 녹음 오디오 — 영상 길이를 이 오디오에 맞춤
  audioFile: AUDIO_FILE,
  audioDurationSec: AUDIO_DURATION_SEC,

  // ── 자막 트랙: 원본 대본 그대로, 화면 한 줄에 맞게만 쪼갬. 전사 타임코드 기준. ──
  //    (STT 오인식 교정: 한상→한 쌍, 땅 그 부부→땅끄부부, 굽고→굳고)
  narration: [
    { start: 2.4, text: "요즘 헬스장보다는" },
    { start: 3.54, text: "집에서 맨몸운동 하는" },
    { start: 4.57, text: "사람들이" },
    { start: 5.06, text: "확 늘었습니다" },

    { start: 5.84, text: "왜일까요?" },

    { start: 6.38, text: "일단 푸쉬업, 풀업," },
    { start: 7.22, text: "덤벨 한 쌍 갖다놓고" },
    { start: 8.48, text: "어깨운동, 버피" },
    { start: 9.64, text: "이런 것들만 몇 가지" },
    { start: 10.96, text: "집에서 꾸준히 해도" },
    { start: 11.58, text: "일반인 수준에선" },
    { start: 12.6, text: "차고 넘칩니다" },

    { start: 13.48, text: "당장 땅끄부부 같은" },
    { start: 14.72, text: "홈트 영상 하나만" },
    { start: 15.58, text: "따라 해봐도" },
    { start: 16.22, text: "20분 만에 땀이" },
    { start: 17.15, text: "쭉쭉 나고" },
    { start: 17.73, text: "체지방 불타는 게" },
    { start: 18.44, text: "느껴지죠" },

    { start: 19.12, text: "러닝은 때때로" },
    { start: 19.85, text: "하체에 부담을 준다면" },
    { start: 21.06, text: "이런 영상 보며" },
    { start: 21.58, text: "따라하는 건" },
    { start: 22.35, text: "전신 운동이라" },
    { start: 23.33, text: "건강에도 더 좋습니다" },

    { start: 24.6, text: "특히 회사원이나" },
    { start: 25.44, text: "학생분들은" },
    { start: 26.06, text: "집에서 하는 게" },
    { start: 26.98, text: "시간 대비 가성비가" },
    { start: 27.9, text: "훨씬 좋긴" },
    { start: 28.42, text: "하다고들 말하는데요" },

    { start: 29.6, text: "돈 굳고, 시간 굳고," },
    { start: 31.05, text: "눈치 볼 것도 없죠" },
  ],

  // ── 효과음 전환 타이밍(주제 전환점에 맞춤). photo는 폴백값(main엔 미표시) ──
  cuts: [
    { start: 2.4, photo: "", zoom: "in", sfxOnEnter: "s08", lines: [], source: "" }, // 도입(맨몸운동 증가)
    { start: 5.84, photo: "", zoom: "in", sfxOnEnter: "s10", lines: [], source: "" }, // 왜일까 전환
    { start: 6.38, photo: "", zoom: "out", sfxOnEnter: "s01", lines: [], source: "" }, // 종목 나열
    { start: 13.48, photo: "", zoom: "in", sfxOnEnter: "s02", lines: [], source: "" }, // 땅끄부부 홈트
    { start: 19.12, photo: "", zoom: "out", sfxOnEnter: "s09", lines: [], source: "" }, // 러닝 비교/전신
    { start: 24.6, photo: "", zoom: "in", sfxOnEnter: "s07", lines: [], source: "" }, // 회사원/학생 가성비
    { start: 29.6, photo: "", zoom: "in", sfxOnEnter: "s13", lines: [], source: "" }, // 마무리(돈·시간·눈치)
  ],
};
