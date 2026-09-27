// ============================================================
//  채널: 대환장민국 (코믹 썰 / 남색 + 태극기 테마)
// ============================================================
import type { Channel } from "../../types";

export const daehwanjangChannel: Channel = {
  id: "daehwanjang",
  compositionId: "Daehwanjang",
  layout: "headline", // sample/2 포맷: 검정배경 + 헤드라인 2줄 + 중앙 미디어 + 하단 교체형 자막
  name: "대환장민국",
  defaultAuthor: "애국자",
  // ↓ 아래 색값들은 "board" 레이아웃 전용이라 headline에선 사용되지 않지만,
  //   나중에 board로 되돌릴 수도 있어 그대로 보존.
  headerColor: "#0e2a5e", // 남색
  headerTextColor: "#ffffff",
  headerIconColor: "#dbe4f5",
  titleColor: "#0e2a5e",
  dividerColor: "#0e2a5e",
  headerDecoration: "taeguk",
  photoSet: "daehwanjang", // 시사/인구 주제 전용 사진 세트 (channels/daehwanjang/photos.tsx)
};
