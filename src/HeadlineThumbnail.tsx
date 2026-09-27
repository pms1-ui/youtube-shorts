// ============================================================
//  헤드라인 레이아웃 게시물(정지 이미지) 버전 — sample/2 포맷
//  HeadlineShorts와 동일한 레이아웃/스타일. 첫 자막 비트를 얹어 썸네일화.
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";
import { getPhoto } from "./photoSets";
import type { Channel, StoryScript } from "./types";
import { TITLE_FONT, BODY_FONT } from "./fonts";
// HeadlineShorts와 동일한 블록 상수 (상단/중앙/하단 독립 영역)
const TOP_BLOCK = { top: 0, height: 520, background: "#000000" };
const HEADLINE_TOP = 230;
const TITLE_SIZE = 118;
const TITLE_SIZE2 = Math.round(TITLE_SIZE * 1.15);
const MEDIA_TOP = 560;
const MEDIA_HEIGHT = 880;
const BOTTOM_BLOCK = { top: 1480, height: 300 };
const SUBTITLE_COLOR = "#ffffff";

const OUTLINE = (px: number, color = "#000") =>
  [
    `${px}px ${px}px 0 ${color}`,
    `-${px}px ${px}px 0 ${color}`,
    `${px}px -${px}px 0 ${color}`,
    `-${px}px -${px}px 0 ${color}`,
    `0 ${px}px 0 ${color}`,
    `0 -${px}px 0 ${color}`,
    `${px}px 0 0 ${color}`,
    `-${px}px 0 0 ${color}`,
  ].join(", ");

export const HeadlineThumbnail: React.FC<{
  channel: Channel;
  script: StoryScript;
  cutIndex?: number;
}> = ({ channel, script, cutIndex = 0 }) => {
  const cut = script.cuts[cutIndex] ?? script.cuts[0];
  const headline = script.headline ?? { line1: script.title, line2: "" };

  // 첫 자막: narration 우선, 없으면 cut.subtitle 폴백
  const firstBeat = script.narration?.[0];
  const subText = firstBeat?.text ?? cut.subtitle ?? cut.lines.join(" ");
  const subColor = SUBTITLE_COLOR;

  const Photo =
    getPhoto(channel.photoSet, cut.photo) ??
    (() => <div style={{ width: "100%", height: "100%", background: "#222" }} />);

  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      {/* 중앙 미디어 */}
      <div
        style={{
          position: "absolute",
          top: MEDIA_TOP,
          left: 0,
          width: "100%",
          height: MEDIA_HEIGHT,
          overflow: "hidden",
          background: "#000",
        }}
      >
        <Photo />
      </div>

      {/* 상단 블록: 배경 + 헤드라인 2줄 (독립 영역) */}
      <div
        style={{
          position: "absolute",
          top: TOP_BLOCK.top,
          left: 0,
          width: "100%",
          height: TOP_BLOCK.height,
          background: TOP_BLOCK.background,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: HEADLINE_TOP - TOP_BLOCK.top,
            left: 30,
            right: 30,
            textAlign: "center",
            fontFamily: TITLE_FONT,
            fontStyle: "italic",
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: -3,
          }}
        >
          <div style={{ color: "#ffffff", fontSize: TITLE_SIZE, textShadow: OUTLINE(5) }}>{headline.line1}</div>
          <div style={{ color: "#ffde3d", fontSize: TITLE_SIZE2, textShadow: OUTLINE(5) }}>{headline.line2}</div>
        </div>
      </div>

      {/* 하단 블록: 자막 (독립 영역, 화면 하단 고정) */}
      <div
        style={{
          position: "absolute",
          top: BOTTOM_BLOCK.top,
          left: 0,
          width: "100%",
          height: BOTTOM_BLOCK.height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            background: "#000000",
            padding: "14px 30px",
            borderRadius: 10,
            fontFamily: BODY_FONT,
            fontWeight: 700,
            fontSize: 70,
            lineHeight: 1.2,
            letterSpacing: -1.5,
            textAlign: "center",
            color: subColor,
          }}
        >
          {subText}
        </div>
      </div>
    </AbsoluteFill>
  );
};
