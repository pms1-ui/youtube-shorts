// ============================================================
//  채널: 헬마드 (헬스/피트니스 시사 잡담 — headline 포맷)
//  비주얼은 대환장민국과 동일 포맷(검정 배경 + 하양/노랑 헤드라인).
//  사진(중앙 미디어)은 편집에서 직접 넣으므로 photoSet 불필요.
// ============================================================
import type { Channel } from "../../types";

export const helmadChannel: Channel = {
  id: "helmad",
  compositionId: "Helmad",
  layout: "headline",
  name: "헬마드",
  defaultAuthor: "헬마드",
  // 아래 색값은 board 레이아웃 잔재(headline에선 미사용). 타입 충족용.
  headerColor: "#111111",
  headerTextColor: "#ffffff",
};
