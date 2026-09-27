// ============================================================
//  사진 세트 매핑 — 채널의 photoSet 키를 실제 사진 맵으로 변환
//  (channel은 직렬화되므로 함수 대신 문자열 키 사용)
// ============================================================
import React from "react";
import type { PhotoSetId } from "./types";
import { PHOTOS } from "./photos";
import { DH_PHOTOS } from "./channels/daehwanjang/photos";

const SETS: Record<PhotoSetId, Record<string, React.FC>> = {
  baby: PHOTOS,
  daehwanjang: DH_PHOTOS,
};

/** 채널 photoSet 키로 사진 맵을 얻음. 특정 photo id가 없으면 undefined */
export const getPhoto = (setId: PhotoSetId | undefined, photoId: string): React.FC | undefined => {
  const set = SETS[setId ?? "baby"] ?? PHOTOS;
  return set[photoId];
};
