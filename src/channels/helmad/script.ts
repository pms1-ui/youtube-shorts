// ============================================================
//  헬마드 — 대본 (글 2편)  [headline 레이아웃]
//  주제: 보디빌더가 1년에 쓰는 돈 (음식·보충제·약물, 경량/내추럴 vs 헤비급)
//
//  자막 타이밍은 녹음 전사(narration.generated.ts)의 타임코드 기준.
//  텍스트는 STT 오인식을 원본 대본으로 교정해 아래에 직접 둔다.
//  오디오: public/audio/260929.mp3 (48.82초)
//  인트로 문장("보디빌더가 1년에 쓰는 돈 규모")은 녹음 0~약1.77초에 포함 → 그 구간 자막 없음.
// ============================================================
import type { StoryScript } from "../../types";
import { AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";

export const helmadScript: StoryScript = {
  title: "보디빌더가 1년에 쓰는 돈 규모 ㄷㄷ",
  views: "0",
  comments: "0",

  headline: {
    line1: "보디빌더가 1년에", // 8자
    line2: "쓰는 돈 규모 ㄷㄷ", // 9자
  },

  intro: {
    lines: ["보디빌더가 1년에", "쓰는 돈 규모 ㄷㄷ"],
    durationSec: 1.77, // 녹음에서 제목 낭독이 끝나는 시점(전사 기준). 이 구간엔 자막 없음.
    sfx: "s11",
  },

  // 녹음 오디오 — 영상 길이를 이 오디오에 맞춤
  audioFile: AUDIO_FILE,
  audioDurationSec: AUDIO_DURATION_SEC,

  // ── 자막 트랙: 원본 대본 그대로, 화면 한 줄에 맞게만 쪼갬. 전사 타임코드 기준. ──
  //    (STT 오인식 교정: 필 힐스→필 히스, 테스토스세로→테스토스테론,
  //     성장으로문→성장호르몬, 낮습니다→낫습니다 등)
  narration: [
    { start: 1.77, text: "보디빌더들은" },
    { start: 2.28, text: "일단 먹는 양부터가" },
    { start: 3.32, text: "상식을 벗어납니다" },

    { start: 4.4, text: "올림피아 우승자" },
    { start: 5.48, text: "삼손 다우다는" },
    { start: 6.03, text: "본인 밥값만" },
    { start: 6.65, text: "한 달에 640만 원" },
    { start: 7.58, text: "나온다고 밝혔죠" },

    { start: 8.84, text: "하루 단백질만" },
    { start: 9.52, text: "300그램씩 욱여넣습니다" },

    { start: 10.8, text: "올림피아 7관왕 필 히스는" },
    { start: 12.4, text: "음식값만 1년에" },
    { start: 13.13, text: "2천만 원 넘게" },
    { start: 13.78, text: "썼다고 했고요" },

    { start: 14.7, text: "이게 끝이 아닙니다" },

    { start: 15.64, text: "단백질 보충제와" },
    { start: 16.48, text: "각종 영양제에" },
    { start: 17.2, text: "최소 500만 원 이상이" },
    { start: 18.05, text: "붙는데요" },

    { start: 19.04, text: "근데 진짜" },
    { start: 19.48, text: "돈 먹는 하마는" },
    { start: 20.14, text: "따로 있습니다" },

    { start: 21, text: "바로 약물이죠" },

    { start: 21.76, text: "테스토스테론은" },
    { start: 22.47, text: "그나마 싼 편이라" },
    { start: 23.58, text: "1년에 100만 원 안쪽인데요" },

    { start: 24.7, text: "문제는 성장호르몬입니다" },

    { start: 26.06, text: "이거 하나에만" },
    { start: 26.75, text: "1년에 최대" },
    { start: 27.27, text: "1,700만 원이" },
    { start: 28.04, text: "깨진다고 합니다" },

    { start: 28.91, text: "여기에 인슐린," },
    { start: 29.63, text: "펩타이드까지 쌓으면" },

    { start: 30.72, text: "헤비급 선수는" },
    { start: 31.36, text: "약값만 1년에" },
    { start: 32.02, text: "3천만 원을" },
    { start: 32.79, text: "넘기기도 하죠" },

    { start: 33.68, text: "그나마 약 안 쓰는" },
    { start: 34.15, text: "내추럴이나" },
    { start: 35.12, text: "체급 가벼운 선수는" },
    { start: 36.44, text: "사정이 낫습니다" },

    { start: 37.52, text: "반대로 헤비급" },
    { start: 38.24, text: "오픈 선수들은" },
    { start: 39.01, text: "음식도 약도 2배로" },
    { start: 39.92, text: "들어가서" },
    { start: 40.45, text: "지출이 폭발합니다" },

    { start: 41.62, text: "근데 웃긴 건" },
    { start: 42.1, text: "정작 대회에서" },
    { start: 42.99, text: "받는 상금은" },
    { start: 43.54, text: "이보다 적은" },
    { start: 44.14, text: "경우가 태반이라는 겁니다" },

    { start: 45.68, text: "결국 몸도 키우지만" },
    { start: 46.6, text: "통장을 갈아 넣는" },
    { start: 47.18, text: "직업인 셈이죠" },
  ],

  // ── 효과음 전환 타이밍(주제 전환점에 맞춤). photo는 폴백값(main엔 미표시) ──
  cuts: [
    { start: 1.77, photo: "", zoom: "in", sfxOnEnter: "s08", lines: [], source: "" }, // 음식 스케일
    { start: 8.84, photo: "", zoom: "in", sfxOnEnter: "s01", lines: [], source: "" }, // 단백질/필히스
    { start: 15.64, photo: "", zoom: "out", sfxOnEnter: "s02", lines: [], source: "" }, // 보충제
    { start: 19.04, photo: "", zoom: "in", sfxOnEnter: "s05", lines: [], source: "" }, // 약물 등장(반전)
    { start: 24.7, photo: "", zoom: "in", sfxOnEnter: "s10", lines: [], source: "" }, // 성장호르몬
    { start: 28.91, photo: "", zoom: "out", sfxOnEnter: "s14", lines: [], source: "" }, // 인슐린/펩타이드/헤비급
    { start: 33.68, photo: "", zoom: "in", sfxOnEnter: "s09", lines: [], source: "" }, // 내추럴/경량
    { start: 37.52, photo: "", zoom: "out", sfxOnEnter: "s07", lines: [], source: "" }, // 헤비급 폭발
    { start: 41.62, photo: "", zoom: "in", sfxOnEnter: "s13", lines: [], source: "" }, // 반전/마무리
  ],
};
