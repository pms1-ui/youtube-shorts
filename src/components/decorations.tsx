// ============================================================
//  헤더 장식 매핑 — 채널의 headerDecoration 키를 실제 컴포넌트로 변환
//  (channel 객체는 defaultProps로 직렬화되므로 함수 대신 문자열 키를 사용)
// ============================================================
import React from "react";
import type { DecorationId } from "../types";
import { TaegukFlag } from "./TaegukFlag";

// 채널명 왼쪽에 나란히 놓일 태극기
const TaegukDecoration: React.FC = () => (
  <div
    style={{
      width: 88,
      height: 59,
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 0,
    }}
  >
    <TaegukFlag width={88} />
  </div>
);

const MAP: Record<DecorationId, React.FC> = {
  taeguk: TaegukDecoration,
};

export const getDecoration = (id?: DecorationId): React.FC | null => {
  if (!id) return null;
  return MAP[id] ?? null;
};
