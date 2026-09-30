// ============================================================
//  헬마드 — 대본 (글 7편, 2편)  [headline 레이아웃]
//  주제: 허리 통증 사라지고 허벅지 강철되는 운동 (월싯 / 하체·코어·척추안정)
//
//  자막 타이밍은 녹음 전사(narration.generated.ts)의 타임코드 기준.
//  텍스트는 STT 오인식을 원본(녹음에서 실제 말한 내용)으로 교정해 아래에 직접 둔다.
//  오디오: public/audio/261003.mp3 (39.4초)
//  인트로 문장("허리 통증이 사라지고 허벅지가 강철되는 운동")은 녹음 0~약2.64초에 포함 → 그 구간 자막 없음.
// ============================================================
import type { StoryScript } from "../../types";
import { AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";

export const helmadScript: StoryScript = {
  title: "허리 통증이 사라지고 허벅지가 강철되는 운동",
  views: "0",
  comments: "0",

  headline: {
    line1: "허리 통증 사라지고", // 9자
    line2: "허벅지 강철되는 운동", // 10자
  },

  intro: {
    lines: ["허리 통증 사라지고", "허벅지 강철되는 운동"],
    durationSec: 2.64, // 녹음에서 제목 낭독이 끝나는 시점(전사 기준). 이 구간엔 자막 없음.
    sfx: "s11",
  },

  // 녹음 오디오 — 영상 길이를 이 오디오에 맞춤
  audioFile: AUDIO_FILE,
  audioDurationSec: AUDIO_DURATION_SEC,

  // ── 자막 트랙: 녹음에서 실제 말한 내용대로, 화면 한 줄에 맞게만 쪼갬. 전사 타임코드 기준. ──
  //    (STT 오인식 교정: 게을로→게을러, 월시스→월싯)
  narration: [
    { start: 2.64, text: "운동 중에" },
    { start: 3.14, text: "정말 게을러 보이는데," },
    { start: 4.3, text: "효과는 의외로" },
    { start: 4.98, text: "정말 탁월한 운동이" },
    { start: 5.9, text: "있습니다" },

    { start: 6.46, text: "움직이지도 않습니다" },
    { start: 7.56, text: "그냥 벽에 기대 앉아서" },
    { start: 8.76, text: "버티기만 하면 되죠" },

    { start: 9.76, text: "많이 본 자세라고요?" },
    { start: 10.84, text: "근데 진짜는" },
    { start: 11.63, text: "이걸 한 다리로" },
    { start: 12.36, text: "해보는 겁니다" },
    { start: 13.1, text: "자극이 정말 죽여주죠" },

    { start: 14.36, text: "이 운동을 꾸준히 하면" },
    { start: 15.5, text: "엉덩이와 허벅지가" },
    { start: 16.54, text: "불타고," },
    { start: 16.96, text: "강철같이 단단해지는데요" },

    { start: 18.5, text: "특히 이때" },
    { start: 18.95, text: "코어까지 적극적으로" },
    { start: 19.95, text: "개입되기 때문에," },
    { start: 20.8, text: "척추가 안정되면서" },
    { start: 21.9, text: "허리 통증까지 예방되죠" },

    { start: 23.2, text: "즉 하체는 강해지고," },
    { start: 24.39, text: "허리는 편해지는," },
    { start: 25.16, text: "두 마리 토끼를 잡는 겁니다" },

    { start: 26.4, text: "이 게으른 자세의 이름은" },
    { start: 27.64, text: "바로 월싯인데요" },

    { start: 28.54, text: "벽에 등 딱 붙이고," },
    { start: 29.08, text: "투명 의자에 앉듯" },
    { start: 30.5, text: "무릎 90도로," },
    { start: 31.14, text: "30초에서 1분" },
    { start: 32, text: "버티면 끝입니다" },

    { start: 32.94, text: "이걸 3세트," },
    { start: 33.7, text: "일주일에 3번 정도" },
    { start: 34.36, text: "해주시면 됩니다" },

    { start: 35.44, text: "이 운동의 가장 큰 장점은," },
    { start: 36.8, text: "넓은 공간도, 기구도" },
    { start: 37.97, text: "필요 없다는 겁니다" },
  ],

  // ── 효과음 전환 타이밍(주제 전환점에 맞춤). photo는 폴백값(main엔 미표시) ──
  cuts: [
    { start: 2.64, photo: "", zoom: "in", sfxOnEnter: "s08", lines: [], source: "" }, // 도입(게을러 보이는데)
    { start: 6.46, photo: "", zoom: "in", sfxOnEnter: "s01", lines: [], source: "" }, // 벽에 기대 앉기
    { start: 9.76, photo: "", zoom: "out", sfxOnEnter: "s05", lines: [], source: "" }, // 한 다리 반전
    { start: 14.36, photo: "", zoom: "in", sfxOnEnter: "s02", lines: [], source: "" }, // 하체 강화
    { start: 18.5, photo: "", zoom: "in", sfxOnEnter: "s10", lines: [], source: "" }, // 코어/허리
    { start: 23.2, photo: "", zoom: "out", sfxOnEnter: "s09", lines: [], source: "" }, // 두 마리 토끼
    { start: 26.4, photo: "", zoom: "in", sfxOnEnter: "s13", lines: [], source: "" }, // 월싯 이름
    { start: 28.54, photo: "", zoom: "in", sfxOnEnter: "s06", lines: [], source: "" }, // 방법
    { start: 35.44, photo: "", zoom: "out", sfxOnEnter: "s07", lines: [], source: "" }, // 장점/마무리
  ],
};
