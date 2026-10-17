// ============================================================
//  헬마드 — 맨몸 하체 루틴(세계적 트레이너 / 플레이트 없이 하체·엉덩이) 편  [headline 레이아웃]
//  결과물 폴더: out/헬마드/<오늘날짜>_<순번>/
//  소스: TikTok @thulani_chipanga (맨몸 하체 서킷)
//
//  ★ 헤드라인 ≠ 인트로 (분리 케이스)
//     - 헤드라인(상단 고정): "집에서 하체 엉덩이 터는 / 세계적 트레이너 루틴 ㄷㄷ"
//     - 인트로(흰 카드, 녹음 맨 앞 낭독): "집에서 최강의 하체를 만드는 / 초간단 15세트 맨몸 운동 루틴"
//
//  자막 타이밍은 녹음 전사(narration.generated.ts)의 타임코드 기준.
//  텍스트는 STT 오인식을 원본으로 교정해 아래에 직접 둔다.
//  오디오: public/audio/261020.mp3 (54.78초)
//  인트로 문구는 녹음 0~약3.62초에 낭독 → 그 구간 자막 없음.
//    (STT 오인식 교정: 중등근→중둔근, 커트시런지 띄어쓰기)
// ============================================================
import type { StoryScript } from "../../types";
import { AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";

export const helmadScript: StoryScript = {
  title: "세계적 트레이너의 맨몸 하체 루틴",
  views: "0",
  comments: "0",

  // 상단 고정 헤드라인 (인트로 카드와 다름)
  headline: {
    line1: "집에서 하체 엉덩이 터는",
    line2: "세계적 트레이너 루틴 ㄷㄷ",
  },

  // 흰 카드 인트로 (녹음 맨 앞 낭독) — 헤드라인과 다른 문구
  intro: {
    lines: ["집에서 최강의 하체를 만드는", "초간단 15세트 맨몸 운동 루틴"],
    durationSec: 3.62, // 녹음에서 인트로 낭독이 끝나는 시점(전사 기준). 이 구간엔 자막 없음.
    sfx: "s11",
  },

  // 녹음 오디오 — 영상 길이를 이 오디오에 맞춤
  audioFile: AUDIO_FILE,
  audioDurationSec: AUDIO_DURATION_SEC,

  // ── 자막 트랙: 녹음에서 실제 말한 내용대로, 화면 한 줄에 맞게만 쪼갬. 전사 타임코드 기준. ──
  narration: [
    { start: 3.62, text: "여기 세계적인 트레이너가 소개하는" },
    { start: 5.28, text: "미친 맨몸 하체 운동 루틴이 있습니다" },
    { start: 7.26, text: "장비 하나 없이 집에서" },
    { start: 8.46, text: "하체와 엉덩이를 완전히 털어버릴 수 있죠" },
    { start: 10.5, text: "여기에 심박수까지 치솟게 하는 형태로" },
    { start: 12.42, text: "체지방 연소가 미친 듯 잘 됩니다" },

    { start: 14.02, text: "첫째, 기본 스쿼트" },
    { start: 15.12, text: "발을 어깨너비로 벌리고" },
    { start: 15.87, text: "깊게 앉았다 일어나기, 스무 번" },
    { start: 18.22, text: "하체 전체를 깨우는 워밍업입니다" },

    { start: 20.26, text: "둘째, 커트시 런지" },
    { start: 21.36, text: "뒷발을 반대쪽 대각선으로 빼면서 앉는데," },
    { start: 23.9, text: "평소 안 쓰던 엉덩이 바깥쪽," },
    { start: 25.32, text: "즉 중둔근을 제대로 때려줍니다" },
    { start: 26.99, text: "한 다리당 하나로 해서 좌우 열 번씩" },

    { start: 28.9, text: "셋째, 스텝 아웃 스쿼트" },
    { start: 30.18, text: "한 발씩 옆으로 내디디며 앉는 동작으로," },
    { start: 32.28, text: "안쪽 허벅지와 엉덩이 측면을 같이 자극하죠" },
    { start: 34.56, text: "좌우 각각 열다섯 번씩" },

    { start: 35.16, text: "넷째, 점프 스쿼트" },
    { start: 36.86, text: "앉았다가 폭발적으로 뛰어오르기입니다" },
    { start: 38.73, text: "여기서 심박수가 확 올라갑니다" },
    { start: 40.18, text: "한번 할 때 열다섯 개입니다" },

    { start: 41.52, text: "마지막, 교차 런지" },
    { start: 42.52, text: "앞뒤로 벌려 두 번 꾹꾹 눌러주고," },
    { start: 44.22, text: "가볍게 점프하면서 다리를 교차해 바꿔주는 동작입니다" },
    { start: 47.02, text: "좌우 열 번씩" },

    { start: 47.86, text: "여기까지의 동작을 한 바퀴로 해서," },
    { start: 49.16, text: "총 3세트 반복해주시면 되고," },
    { start: 50.62, text: "익숙해지시면 각 운동의 개수와 세트 수를" },
    { start: 52.21, text: "늘려나가시면 되겠습니다" },
  ],

  // ── 효과음 전환 타이밍(동작 전환점에 맞춤). photo는 폴백값(main엔 미표시) ──
  cuts: [
    { start: 3.62, photo: "", zoom: "in", sfxOnEnter: "s08", lines: [], source: "" }, // 서론(소개)
    { start: 14.02, photo: "", zoom: "in", sfxOnEnter: "s01", lines: [], source: "" }, // ① 기본 스쿼트
    { start: 20.26, photo: "", zoom: "out", sfxOnEnter: "s02", lines: [], source: "" }, // ② 커트시 런지
    { start: 28.9, photo: "", zoom: "in", sfxOnEnter: "s03", lines: [], source: "" }, // ③ 스텝아웃 스쿼트
    { start: 35.16, photo: "", zoom: "out", sfxOnEnter: "s09", lines: [], source: "" }, // ④ 점프 스쿼트
    { start: 41.52, photo: "", zoom: "in", sfxOnEnter: "s10", lines: [], source: "" }, // ⑤ 교차 런지
    { start: 47.86, photo: "", zoom: "out", sfxOnEnter: "s07", lines: [], source: "" }, // 마무리(세트·진행법)
  ],
};
