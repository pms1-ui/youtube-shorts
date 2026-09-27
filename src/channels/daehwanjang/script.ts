// ============================================================
//  대환장민국 — 대본 (글 1편)  [headline 레이아웃]
//  주제: 심각하게 갈라지는 대한민국 근황 (세대 갈등 / MZ vs 영포티)
//  ※ 서사·수치는 콘텐츠용 예시(가상 창작). 특정 집단 조롱·단정 아님.
//
//  자막 타이밍은 녹음 전사(narration.generated.ts)의 타임코드를 기준으로 하되,
//  텍스트는 STT 오인식을 피하기 위해 원본 대본으로 교정해 아래에 직접 둔다.
//  오디오: public/audio/260927.mp3
// ============================================================
import type { StoryScript } from "../../types";
import { AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";

export const daehwanjangScript: StoryScript = {
  title: "심각하게 갈라지는 대한민국 근황",
  views: "1,204,880",
  comments: "6,120",

  // 상단 고정 헤드라인 2줄
  headline: {
    line1: "심각하게 갈라지는", // 9자
    line2: "대한민국 근황", // 7자
  },

  // 인트로 (흰 카드 스캔)
  intro: {
    lines: ["심각하게 갈라지는", "대한민국 근황"],
    durationSec: 3.0, // 녹음에서 인트로 문장 낭독이 끝나는 시점(전사 기준). 이 구간엔 하단 자막 없음.
    sfx: "s11",
  },

  // 녹음 오디오 (public/audio/) — 영상 길이를 이 오디오에 맞춤
  audioFile: AUDIO_FILE,
  audioDurationSec: AUDIO_DURATION_SEC,

  // ── 자막 트랙: 전사 타임코드 기반 + 원본 대본으로 텍스트 교정 ──
  //  0~약 3초는 인트로 문장("심각하게 갈라지는 대한민국 근황") 낭독 구간 → 자막 없음.
  //  본문 자막은 "MZ랑 영포티"가 실제로 나오는 3.0초부터 시작.
  narration: [
    { start: 3.0, text: "MZ랑 영포티, 두 세대가" },
    { start: 3.49, text: "완전히 갈렸습니다" },
    { start: 4.54, text: "80년대생인 40대 세대는" },
    { start: 6.13, text: "집값 오를 때 딱 올라타서" },
    { start: 7.56, text: "자산을 불렸는데요" },
    { start: 8.66, text: "MZ는 취업도 안 되는데" },
    { start: 10.45, text: "집값은 이미 천정부지로" },
    { start: 11.44, text: "치솟아있었죠" },
    { start: 12.36, text: "MZ한테 계층 사다리는" },
    { start: 13.58, text: "이미 끊긴 지 오래입니다" },
    { start: 14.96, text: "같은 시대를 사는데" },
    { start: 15.62, text: "출발선이 완전히 다른 겁니다" },
    { start: 17.56, text: "재밌는 건 정치 성향인데요" },
    { start: 19.04, text: "4050은 진보가 많은데" },
    { start: 21.35, text: "2030은 보수화가 뚜렷해졌습니다" },
    { start: 22.84, text: "예전엔 2030 안에서 남녀로" },
    { start: 24.45, text: "갈렸는데요" },
    { start: 25.14, text: "이제는 아예 연령대별로" },
    { start: 26.38, text: "갈리는 거죠" },
    { start: 27.08, text: "누가 잘못했다고 딱 잘라" },
    { start: 28.61, text: "말하긴 어렵습니다" },
    { start: 29.42, text: "근데 앞으로 갈등이" },
    { start: 30.08, text: "더 심해질 거란 건 분명해 보이네요" },
  ],

  // ── 사진(미디어) 트랙 — 임시로 기존 SVG 매핑(세대갈등 전용 SVG는 추후 교체) ──
  //  전환마다 효과음(장면 성격에 맞게)
  cuts: [
    { start: 3.0, photo: "incomeGap", zoom: "in", sfxOnEnter: "s08", lines: [], source: "" }, // 인트로 후 첫 장면(세대 대비)
    { start: 4.54, photo: "housingDivide", zoom: "in", sfxOnEnter: "s01", lines: [], source: "" }, // 영포티 자산
    { start: 8.66, photo: "youngDebt", zoom: "out", sfxOnEnter: "s05", lines: [], source: "" }, // MZ 취업난
    { start: 12.36, photo: "brokenLadder", zoom: "in", sfxOnEnter: "s10", lines: [], source: "" }, // 끊긴 사다리
    { start: 17.56, photo: "tiltedScale", zoom: "in", sfxOnEnter: "s09", lines: [], source: "" }, // 정치성향
    { start: 22.84, photo: "regimeCompare", zoom: "out", sfxOnEnter: "s02", lines: [], source: "" }, // 연령대 갈림
    { start: 27.08, photo: "wideningAhead", zoom: "in", sfxOnEnter: "s07", lines: [], source: "" }, // 갈등 심화 마무리
  ],
};
