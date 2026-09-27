// ============================================================
//  안빤엄빠 — 대본 (글 1편)
//  스토리: 장마로 갇힌 주말 → 아빠가 거실에 텐트+미끄럼틀 설치 →
//          아들이 미끄럼틀을 거꾸로 오르는 데 집착 → 온갖 시도 →
//          결국 성공하고 의기양양 → 근데 정리는 아빠 몫 (반전 셀프디스)
// ============================================================
import type { StoryScript } from "../../types";

export const anppanScript: StoryScript = {
  title: "장마철 주말에 각성한 아들의 등반 본능",
  views: "312,884",
  comments: "428",
  cuts: [
    {
      start: 0,
      lines: ["주말 아침에 눈 떴는데", "창밖에 비가 미친 듯이 쏟아짐"],
      source: "내 폰",
      photo: "rainyWindow",
      sfxOnEnter: "s11",
    },
    {
      start: 2.4,
      lines: ["아들이랑 나가 놀 계획이었는데", "장마 시작이라 완전 갇혀버림"],
      source: "장마의 시작",
      photo: "kidAtWindow",
      sfxOnEnter: "s09",
    },
    {
      start: 4.8,
      lines: ["가만 놔두면 온 집을", "박살 낼 기세라"],
      source: "에너지 넘치는 4살",
      photo: "messyRoom",
      sfxOnEnter: "s01",
    },
    {
      start: 7.2,
      lines: ["큰맘 먹고 거실에", "실내 텐트랑 미끄럼틀 설치함"],
      source: "아빠표 실내 놀이터",
      photo: "livingPlayground",
      sfxOnEnter: "s02",
    },
    {
      start: 9.8,
      lines: ["처음엔 얌전히 미끄럼틀을", "정상적으로 타나 싶었는데"],
      source: "평화는 잠깐",
      photo: "slideDown",
      sfxOnEnter: "s03",
    },
    {
      start: 12.2,
      lines: ["갑자기 미끄럼틀을", "거꾸로 기어오르기 시작함"],
      source: "역주행 본능",
      photo: "climbUp",
      sfxOnEnter: "s07",
    },
    {
      start: 14.8,
      lines: ["미끄러지고 또 미끄러지는데", "포기를 모름"],
      source: "근성의 아이콘",
      photo: "slipFall",
      sfxOnEnter: "s08",
    },
    {
      start: 17.4,
      lines: ["양말까지 벗어 던지더니", "맨발로 마찰력을 확보함"],
      source: "물리학도 이해함",
      photo: "barefoot",
      sfxOnEnter: "s06",
    },
    {
      start: 20.0,
      lines: ["급기야 소파 쿠션을", "가져와 계단을 만들고"],
      source: "공학적 접근",
      photo: "cushionStairs",
      sfxOnEnter: "s10",
    },
    {
      start: 22.6,
      lines: ["결국 정상 등반에 성공해서", "세상 다 가진 표정 지음"],
      source: "정상 정복",
      photo: "victory",
      sfxOnEnter: "s13",
    },
    {
      start: 25.4,
      lines: ["박수 쳐줬더니 신나서", "열 번은 더 반복하고"],
      source: "앙코르 요청",
      photo: "repeat",
      sfxOnEnter: "s04",
    },
    {
      start: 28.0,
      lines: ["체력 다 쓰고 텐트 안에서", "그대로 잠들어버림"],
      source: "방전 완료",
      photo: "sleeping",
      sfxOnEnter: "s12",
    },
    {
      start: 30.8,
      lines: ["결국 아들 재우고", "이 난장판 치우는 건 내 몫이었음"],
      source: "짬처리",
      photo: "dadCleaning",
      sfxOnEnter: "s05",
    },
  ],
};
