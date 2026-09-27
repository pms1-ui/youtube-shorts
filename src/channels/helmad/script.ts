// ============================================================
//  헬마드 — 대본 (글 1편)  [headline 레이아웃]
//  주제: 요즘 대한민국 헬스장 근황 (러닝 열풍 쇠퇴 → 헬스장 회귀 → 소비자 이득)
//
//  자막 타이밍은 녹음 전사(narration.generated.ts)의 타임코드 기준.
//  텍스트는 STT 오인식을 원본 대본으로 교정해 아래에 직접 둔다.
//  오디오: public/audio/260927_hmad.mp3 (47.3초)
//  인트로 문장("요즘 대한민국 헬스장 근황")은 녹음 0~약1.6초에 포함 → 그 구간 자막 없음.
// ============================================================
import type { StoryScript } from "../../types";
import { AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";

export const helmadScript: StoryScript = {
  title: "요즘 대한민국 헬스장 근황 ㄷㄷ",
  views: "0",
  comments: "0",

  headline: {
    line1: "요즘 대한민국", // 7자
    line2: "헬스장 근황 ㄷㄷ", // 9자
  },

  intro: {
    lines: ["요즘 대한민국", "헬스장 근황 ㄷㄷ"],
    durationSec: 1.6, // 녹음에서 제목 낭독이 끝나는 시점(전사 기준). 이 구간엔 자막 없음.
    sfx: "s11",
  },

  // 녹음 오디오 — 영상 길이를 이 오디오에 맞춤
  audioFile: AUDIO_FILE,
  audioDurationSec: AUDIO_DURATION_SEC,

  // ── 자막 트랙: 원본 대본 그대로, 화면 한 줄에 맞게만 쪼갬. 전사 타임코드 기준. ──
  narration: [
    { start: 1.61, text: "러닝 유행이" },
    { start: 2.15, text: "점차 끝나가고 있습니다" },

    { start: 3.4, text: "러닝크루에 대한" },
    { start: 4.01, text: "시민들의 반감도" },
    { start: 5.08, text: "많이 생기고 있고" },

    { start: 5.94, text: "날도 점점 추워지니" },
    { start: 6.82, text: "초겨울엔 사그라들 분위기입니다" },

    { start: 8.52, text: "사실 그동안" },
    { start: 9.16, text: "헬스장 사장님들" },
    { start: 10.1, text: "진짜 힘들었는데요" },

    { start: 11.04, text: "헬스장 차릴 때" },
    { start: 12.22, text: "요즘은 아스널, 파나타," },
    { start: 13.04, text: "해머스트랭스 정도는 깔아야" },
    { start: 14.52, text: "경쟁이 돼서" },

    { start: 15.28, text: "시설 투자만" },
    { start: 15.83, text: "최소 10억이 넘습니다" },

    { start: 17.12, text: "제가 사는 광명만 해도" },
    { start: 18.1, text: "300평, 500평짜리가" },
    { start: 19.62, text: "건물마다 있을 정도죠" },

    { start: 20.72, text: "이러니 12개월 회원권을" },
    { start: 21.53, text: "울며 겨자 먹기로" },
    { start: 22.88, text: "30만 원대까지 내리는데요" },

    { start: 24.34, text: "아무리 좋아도" },
    { start: 24.64, text: "60만 원대 넘기기가 힘듭니다" },

    { start: 26.3, text: "근데 러닝하던 사람들이" },
    { start: 27.49, text: "다시 돌아오기 시작했습니다" },

    { start: 28.92, text: "운동복에 수건, 샴푸까지" },
    { start: 30.07, text: "다 주는 헬스장이" },
    { start: 31.12, text: "사실 개꿀이라는 걸 깨달은 거죠" },

    { start: 32.68, text: "러닝은 러닝화 챙겨," },
    { start: 33.46, text: "먼지 마셔, 와서 또 씻어," },
    { start: 34.62, text: "빨래까지 나와서 개귀찮죠" },

    { start: 36.66, text: "그러나 헬스장은" },
    { start: 37.43, text: "몸만 오면 되기 때문에" },
    { start: 38.43, text: "솔직히 편하긴 편합니다" },

    { start: 39.86, text: "경쟁하느라 시설은 좋아지는데" },
    { start: 41.42, text: "가격은 그대로인 가성비도 있죠" },

    { start: 43.12, text: "결국 소비자 입장에선" },
    { start: 44.7, text: "헬스장이 최고의 절약이자" },
    { start: 45.55, text: "이득인 상황입니다" },
  ],

  // ── 효과음 전환 타이밍(주제 전환점에 맞춤). photo는 폴백값(main엔 미표시) ──
  cuts: [
    { start: 1.61, photo: "", zoom: "in", sfxOnEnter: "s08", lines: [], source: "" }, // 러닝 쇠퇴
    { start: 8.52, photo: "", zoom: "in", sfxOnEnter: "s05", lines: [], source: "" }, // 헬스장 고생
    { start: 12.22, photo: "", zoom: "out", sfxOnEnter: "s01", lines: [], source: "" }, // 장비/투자
    { start: 20.72, photo: "", zoom: "in", sfxOnEnter: "s02", lines: [], source: "" }, // 회원권 출혈
    { start: 26.3, photo: "", zoom: "in", sfxOnEnter: "s09", lines: [], source: "" }, // 회귀 전환
    { start: 32.68, photo: "", zoom: "out", sfxOnEnter: "s07", lines: [], source: "" }, // 러닝 귀찮음
    { start: 43.12, photo: "", zoom: "in", sfxOnEnter: "s13", lines: [], source: "" }, // 마무리
  ],
};
