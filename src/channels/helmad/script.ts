// ============================================================
//  헬마드 — L자 다리 올리기(Legs Up The Wall) 편  [headline 레이아웃]
//  결과물 폴더: out/헬마드/261005_02/
//
//  ★ 헤드라인 ≠ 인트로 (분리 케이스)
//     - 헤드라인(상단 고정): "다리만 올리면 / 몸과 인생이 바뀜"
//     - 인트로(흰 카드, 녹음 맨 앞 낭독): "별거 아닌 줄 알았는데 / 엄청난 효과가 있었던 자세"
//
//  자막 타이밍은 녹음 전사(narration.generated.ts)의 타임코드 기준.
//  텍스트는 STT 오인식을 원본(녹음에서 실제 말한 내용)으로 교정해 아래에 직접 둔다.
//  오디오: public/audio/261012.mp3 (52.62초)
//  인트로 문구는 녹음 0~약2.68초에 낭독 → 그 구간 자막 없음.
// ============================================================
import type { StoryScript } from "../../types";
import { AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";

export const helmadScript: StoryScript = {
  title: "하루에 딱 10분 'L자 다리' 했더니 몸에 벌어진 일 ㄷㄷ",
  views: "0",
  comments: "0",

  // 상단 고정 헤드라인 (인트로 카드와 다름)
  headline: {
    line1: "다리만 올리면", // 7자
    line2: "몸과 인생이 바뀜", // 8자
  },

  // 흰 카드 인트로 (녹음 맨 앞 낭독) — 헤드라인과 다른 문구
  intro: {
    lines: ["별거 아닌 줄 알았는데", "엄청난 효과가 있었던 자세"],
    durationSec: 2.68, // 녹음에서 인트로 낭독이 끝나는 시점(전사 기준). 이 구간엔 자막 없음.
    sfx: "s11",
  },

  // 녹음 오디오 — 영상 길이를 이 오디오에 맞춤
  audioFile: AUDIO_FILE,
  audioDurationSec: AUDIO_DURATION_SEC,

  // ── 자막 트랙: 녹음에서 실제 말한 내용대로, 화면 한 줄에 맞게만 쪼갬. 전사 타임코드 기준. ──
  //    (STT 오인식 교정: 종이에 서있거나→종일 서있거나)
  narration: [
    { start: 2.68, text: "단 10분만 누워있어도," },
    { start: 3.98, text: "피부가 좋아지고" },
    { start: 4.84, text: "스트레스까지 반토막 나는" },
    { start: 5.83, text: "자세가 있습니다" },

    { start: 6.88, text: "돈도, 기구도," },
    { start: 7.55, text: "힘든 움직임도 필요 없죠" },

    { start: 9.08, text: "바로 L자 다리 자세인데요," },
    { start: 10.44, text: "대부분 모르는" },
    { start: 11.52, text: "놀라운 사실들이 있습니다" },

    { start: 12.52, text: "일단 피부와 얼굴이 좋아집니다" },
    { start: 14.12, text: "다리를 올리면 평소보다" },
    { start: 15.36, text: "많은 혈액과 산소가" },
    { start: 16.73, text: "얼굴로 올라갑니다" },
    { start: 17.4, text: "모세혈관이 산소를 공급받고" },
    { start: 18.71, text: "촉촉해지면서," },
    { start: 19.88, text: "칙칙하던 안색이 환해지고" },
    { start: 21.32, text: "피부에 윤기가 돌죠" },
    { start: 22.44, text: "그래서 서양에선 실제로" },
    { start: 23.68, text: "돈 안 드는 안티에이징" },
    { start: 25.14, text: "자세라고 부릅니다" },

    { start: 26.08, text: "또한 다리를 심장보다" },
    { start: 27.12, text: "높이 올리면," },
    { start: 27.76, text: "코르티솔과 심박수가" },
    { start: 28.76, text: "눈에 띄게 하락하는데요," },
    { start: 30.04, text: "그래서 불안하고 잠 안 올 때" },
    { start: 31.36, text: "딱 10분이면," },
    { start: 32.07, text: "잠이 잘 오고" },
    { start: 32.74, text: "마음도 편해지게 되죠" },

    { start: 33.76, text: "마지막으로," },
    { start: 34.33, text: "종일 서있거나 앉아있느라" },
    { start: 35.72, text: "다리에 고여 붓게 만들던 피도," },
    { start: 37.32, text: "중력 덕분에 정맥을 타고" },
    { start: 38.64, text: "심장으로 쉽게 되돌아갑니다" },
    { start: 40.08, text: "그 덕에 붓기랑" },
    { start: 41, text: "묵직한 피로까지" },
    { start: 42, text: "눈 녹듯 사라지죠" },

    { start: 42.92, text: "결국 피부, 스트레스," },
    { start: 44.08, text: "숙면, 혈액순환까지" },
    { start: 45.31, text: "한 번에 잡는 겁니다" },

    { start: 46.36, text: "방법은 어이없을 만큼 쉬운데," },
    { start: 47.96, text: "벽이든 침대든" },
    { start: 48.76, text: "엉덩이 붙이고" },
    { start: 49.6, text: "다리 쭉 올려서," },
    { start: 50.54, text: "10분만 눈 감고 있으면 끝입니다" },
  ],

  // ── 효과음 전환 타이밍(주제 전환점에 맞춤). photo는 폴백값(main엔 미표시) ──
  cuts: [
    { start: 2.68, photo: "", zoom: "in", sfxOnEnter: "s08", lines: [], source: "" }, // 후킹(피부·스트레스)
    { start: 6.88, photo: "", zoom: "in", sfxOnEnter: "s01", lines: [], source: "" }, // 돈·기구 필요없음
    { start: 9.08, photo: "", zoom: "out", sfxOnEnter: "s09", lines: [], source: "" }, // L자 다리 공개
    { start: 12.52, photo: "", zoom: "in", sfxOnEnter: "s02", lines: [], source: "" }, // ① 피부
    { start: 26.08, photo: "", zoom: "in", sfxOnEnter: "s10", lines: [], source: "" }, // ② 신경·숙면
    { start: 33.76, photo: "", zoom: "out", sfxOnEnter: "s06", lines: [], source: "" }, // ③ 붓기·순환
    { start: 42.92, photo: "", zoom: "in", sfxOnEnter: "s13", lines: [], source: "" }, // 총정리
    { start: 46.36, photo: "", zoom: "out", sfxOnEnter: "s07", lines: [], source: "" }, // 방법/마무리
  ],
};
