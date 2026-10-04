// ============================================================
//  헬마드 — 힌두 푸쉬업 (상체 전체를 터는 운동)  [headline 레이아웃]
//  결과물 폴더: out/헬마드/261004_04/
//
//  ★ 헤드라인 ≠ 인트로 (분리 케이스)
//     - 헤드라인(상단 고정): "미친 강함을 만드는 / 힌두 푸쉬업 방법"
//     - 인트로(흰 카드, 녹음 맨 앞 낭독): "푸쉬업을 이렇게 했더니 / 상체 전체가 강해졌다고?"
//
//  자막 타이밍은 녹음 전사(narration.generated.ts)의 타임코드 기준.
//  텍스트는 STT 오인식을 원본(녹음에서 실제 말한 내용)으로 교정해 아래에 직접 둔다.
//  오디오: public/audio/261004-4-complete.mp3 (41.62초)
//  인트로 문구는 녹음 0~약2.64초에 낭독 → 그 구간 자막 없음.
// ============================================================
import type { StoryScript } from "../../types";
import { AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";

export const helmadScript: StoryScript = {
  title: "미친 강함을 만드는 힌두 푸쉬업 (상체 올인원)",
  views: "0",
  comments: "0",

  // 상단 고정 헤드라인 (인트로 카드와 다름)
  headline: {
    line1: "미친 강함을 만드는", // 9자
    line2: "힌두 푸쉬업 방법", // 8자
  },

  // 흰 카드 인트로 (녹음 맨 앞 낭독) — 헤드라인과 다른 문구
  intro: {
    lines: ["푸쉬업을 이렇게 했더니", "상체 전체가 강해졌다고?"],
    durationSec: 2.64, // 녹음에서 인트로 낭독이 끝나는 시점(전사 기준). 이 구간엔 자막 없음.
    sfx: "s11",
  },

  // 녹음 오디오 — 영상 길이를 이 오디오에 맞춤
  audioFile: AUDIO_FILE,
  audioDurationSec: AUDIO_DURATION_SEC,

  // ── 자막 트랙: 녹음에서 실제 말한 내용대로, 화면 한 줄에 맞게만 쪼갬. 전사 타임코드 기준. ──
  //    (STT 오인식 교정: 배메기→배밀기, 단원컨대→단언컨대)
  narration: [
    { start: 2.64, text: "배밀기라고도 불리는" },
    { start: 3.3, text: "힌두 푸쉬업은" },
    { start: 4.44, text: "단언컨대 최고의" },
    { start: 5.08, text: "종합 전신 운동 중 하나입니다" },

    { start: 6.98, text: "어깨, 삼두, 가슴, 승모," },
    { start: 8.36, text: "등까지 상체를" },
    { start: 9.14, text: "통째로 털어버리거든요" },

    { start: 10.38, text: "근데 제대로 안 하고" },
    { start: 11.04, text: "따라하다," },
    { start: 11.72, text: "팔꿈치 박살내는" },
    { start: 12.47, text: "분들이 꽤 많습니다" },

    { start: 13.58, text: "먼저 엉덩이를" },
    { start: 14.23, text: "하늘로 치켜든" },
    { start: 14.96, text: "산 모양 자세에서," },
    { start: 15.98, text: "몸을 바닥에 쓸듯이 넣었다가," },
    { start: 17.38, text: "가슴을 쭉 들어 올리며" },
    { start: 18.46, text: "상체를 쓸어 올리는 동작인데," },

    { start: 19.96, text: "여기서 안 세우고" },
    { start: 20.42, text: "중간에 다시 돌아오면," },
    { start: 21.98, text: "어깨 운동이 추가됩니다" },

    { start: 23.16, text: "이 흐르는 동작 하나에" },
    { start: 24.22, text: "어깨, 가슴, 삼두가" },
    { start: 25.71, text: "전부 늘어났다" },
    { start: 26.21, text: "수축하죠" },

    { start: 26.62, text: "제일 중요한 건" },
    { start: 26.88, text: "손 너비와 팔꿈치입니다" },
    { start: 28.86, text: "손 너비가 너무 넓거나," },
    { start: 30.1, text: "동작할 때 팔꿈치를" },
    { start: 30.98, text: "양옆으로 너무 쫙 벌리면," },
    { start: 32.38, text: "어깨와 팔꿈치 관절이" },
    { start: 33.5, text: "큰 무리를 받거든요" },

    { start: 34.42, text: "개수는 한 세트에 10개," },
    { start: 35.26, text: "3세트부터 시작해" },
    { start: 36.26, text: "천천히 늘려가면 됩니다" },

    { start: 38.0, text: "제대로만 하면," },
    { start: 38.66, text: "기구 하나 없이" },
    { start: 39.41, text: "상체 전체가 완성되는" },
    { start: 40.59, text: "운동이죠" },
  ],

  // ── 효과음 전환 타이밍(주제 전환점에 맞춤). photo는 폴백값(main엔 미표시) ──
  cuts: [
    { start: 2.64, photo: "", zoom: "in", sfxOnEnter: "s08", lines: [], source: "" }, // 도입(최고의 전신운동)
    { start: 6.98, photo: "", zoom: "in", sfxOnEnter: "s01", lines: [], source: "" }, // 상체 부위 나열
    { start: 10.38, photo: "", zoom: "out", sfxOnEnter: "s05", lines: [], source: "" }, // 팔꿈치 주의
    { start: 13.58, photo: "", zoom: "in", sfxOnEnter: "s02", lines: [], source: "" }, // 자세 설명
    { start: 19.96, photo: "", zoom: "in", sfxOnEnter: "s10", lines: [], source: "" }, // 어깨 운동 추가
    { start: 23.16, photo: "", zoom: "out", sfxOnEnter: "s09", lines: [], source: "" }, // 흐르는 동작
    { start: 26.62, photo: "", zoom: "in", sfxOnEnter: "s05", lines: [], source: "" }, // 제일 중요(팔꿈치)
    { start: 34.42, photo: "", zoom: "out", sfxOnEnter: "s03", lines: [], source: "" }, // 개수·세트
    { start: 38.0, photo: "", zoom: "in", sfxOnEnter: "s13", lines: [], source: "" }, // 마무리
  ],
};
