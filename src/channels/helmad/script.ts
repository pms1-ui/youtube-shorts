// ============================================================
//  헬마드 — 묵묵히 혼자 운동해야 하는 이유 편  [headline 레이아웃]
//  결과물 폴더: out/헬마드/<오늘날짜>_<순번>/ (261018_02)
//  (틱톡 @talhakantemur 콘셉트 참고 → 헬마드 톤으로 새로 집필. 원본 캡션 복붙 없음)
//
//  ★ 헤드라인 = 인트로 (동일 문구 케이스)
//     - 헤드라인(상단 고정) = 인트로(흰 카드/낭독):
//       "묵묵히 혼자 운동했더니 / 몸과 인생이 바뀐 이유"
//
//  자막 타이밍은 녹음 전사(narration.generated.ts)의 타임코드 기준.
//  텍스트는 STT 오인식을 원본 대본으로 교정해 아래에 직접 둔다.
//  오디오: public/audio/261028.mp3 (40.14초)
//  인트로 문구는 녹음 0~2.68초에 낭독 → 그 구간엔 하단 자막 없음.
// ============================================================
import type { StoryScript } from "../../types";
import { AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";

export const helmadScript: StoryScript = {
  title: "묵묵히, 혼자 운동해야 하는 이유",
  views: "0",
  comments: "0",

  // 상단 고정 헤드라인 (= 인트로 동일 문구)
  headline: {
    line1: "묵묵히 혼자 운동했더니",
    line2: "몸과 인생이 바뀐 이유",
  },

  // 흰 카드 인트로 (녹음 맨 앞 낭독) — 헤드라인과 동일 문구
  intro: {
    lines: ["묵묵히 혼자 운동했더니", "몸과 인생이 바뀐 이유"],
    durationSec: 2.68, // 녹음에서 인트로 낭독이 끝나는 시점(전사 기준). 이 구간엔 자막 없음.
    sfx: "s11",
  },

  // 녹음 오디오 — 영상 길이를 이 오디오에 맞춤
  audioFile: AUDIO_FILE,
  audioDurationSec: AUDIO_DURATION_SEC,

  // ── 자막 트랙: 전사 타임코드 기준으로 문장/구 단위로 묶음. 텍스트는 원본 대본으로 교정. ──
  narration: [
    { start: 2.68, text: "여기 매일같이 혼자 운동하는 한 남자가 있습니다." },
    { start: 4.96, text: "같이 운동하는 사람도, 주변엔 헬스장도 없습니다." },

    { start: 7.44, text: "철봉 하나, 땅바닥 하나면 그걸로 충분하다고 하죠." },
    { start: 9.96, text: "혼자 매달리고, 바닥을 밀어내고, 묵묵히 달립니다." },

    { start: 12.44, text: "혼자 하면 신경 쓰이는 사람도, 눈치 볼 사람도 없어서 좋다고 합니다." },

    { start: 15.8, text: "물론 같이 하면 더 재밌습니다. 하지만 거기엔 함정이 있다고 하는데요," },
    { start: 18.92, text: "친구가 빠지면 나도 빠지고," },
    { start: 20.2, text: "조금만 귀찮아지면 그냥 쉬게 되기 때문이라고 합니다." },

    { start: 22.52, text: "이 남자는 비가 와도, 아무도 보지 않아도," },
    { start: 24.64, text: "일단 운동하기로 한 장소에 그냥 나갑니다." },
    { start: 26.8, text: "습관적으로요." },
    { start: 27.61, text: "일단 가면 정신이 깨어나고, 운동하게 된다고 하죠." },

    { start: 30.12, text: "그리고 아무도 도와줄 수 없는 상황 속에서," },
    { start: 32.12, text: "이를 악물고 실패 지점에서 몇 개씩 더 합니다." },

    { start: 34.64, text: "그렇게 혼자 버텨내고 제 몸을 만들어낸 사람은," },
    { start: 36.92, text: "일에서도, 인생에서도, 절대 쉽게 무너지지 않습니다." },
  ],

  // ── 효과음 전환 타이밍(동기부여 톤이라 전환 적게). photo는 폴백값(main엔 미표시) ──
  cuts: [
    { start: 2.68, photo: "", zoom: "in", sfxOnEnter: "s08", lines: [], source: "" }, // 도입(한 남자)
    { start: 7.44, photo: "", zoom: "out", sfxOnEnter: "s02", lines: [], source: "" }, // 철봉·바닥·달리기
    { start: 12.44, photo: "", zoom: "in", sfxOnEnter: "s06", lines: [], source: "" }, // 혼자의 장점(집중)
    { start: 15.8, photo: "", zoom: "out", sfxOnEnter: "s09", lines: [], source: "" }, // 같이의 함정
    { start: 22.52, photo: "", zoom: "in", sfxOnEnter: "s07", lines: [], source: "" }, // 비 와도 나간다(습관)
    { start: 30.12, photo: "", zoom: "out", sfxOnEnter: "s05", lines: [], source: "" }, // 실패지점 한 개 더
    { start: 34.64, photo: "", zoom: "in", sfxOnEnter: "s13", lines: [], source: "" }, // 결론(안 무너진다)
  ],
};
