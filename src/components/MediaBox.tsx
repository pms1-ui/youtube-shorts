// ============================================================
//  미디어 박스 — 컷마다 교체되는 사진/영상 자리
//  등장 시 살짝 줌인(Ken Burns) + 페이드로 컷 전환감 부여
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { getPhoto } from "../photoSets";
import type { PhotoSetId } from "../types";

export const MediaBox: React.FC<{
  photo: string;
  photoSet?: PhotoSetId;
  cutStartFrame: number;
  top: number;
  height: number;
  /** 줌 방향 (기본 "in"=확대). "out"=축소 */
  zoom?: "in" | "out";
  /** 배경색 (기본 검정) */
  background?: string;
}> = ({ photo, photoSet, cutStartFrame, top, height, zoom = "in", background = "#000" }) => {
  const frame = useCurrentFrame();
  const local = frame - cutStartFrame;

  const Photo = getPhoto(photoSet, photo) ?? (() => <div style={{ width: "100%", height: "100%", background: "#222" }} />);

  // 컷 등장: 페이드 인 + 완만한 줌 (in=확대, out=축소)
  const opacity = interpolate(local, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const zoomRange: [number, number] = zoom === "out" ? [1.14, 1.04] : [1.06, 1.14];
  const scale = interpolate(local, [0, 90], zoomRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        width: "100%",
        height,
        overflow: "hidden",
        background,
        opacity,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale})`,
        }}
      >
        <Photo />
      </div>
    </div>
  );
};
