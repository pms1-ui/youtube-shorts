// ============================================================
//  게시물(정지 이미지) 버전 — 채널/대본을 props로 받음
//  대본의 특정 컷(기본: 첫 컷)을 커뮤니티 게시글 썸네일로 렌더
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";
import { BoardFrame, BODY_TOP } from "./components/BoardFrame";
import { getPhoto } from "./photoSets";
import type { Channel, StoryScript } from "./types";

const FONT = "'Pretendard', 'Malgun Gothic', sans-serif";
const MEDIA_TOP = 700;
const MEDIA_HEIGHT = 940;

export const PostThumbnail: React.FC<{
  channel: Channel;
  script: StoryScript;
  /** 썸네일로 쓸 컷 인덱스 (기본 0) */
  cutIndex?: number;
}> = ({ channel, script, cutIndex = 0 }) => {
  const cut = script.cuts[cutIndex] ?? script.cuts[0];
  const Photo = getPhoto(channel.photoSet, cut.photo) ?? (() => <div style={{ width: "100%", height: "100%", background: "#222" }} />);

  const board = {
    channel: channel.name,
    author: script.author ?? channel.defaultAuthor,
    title: script.title,
    views: script.views,
    comments: script.comments,
  };

  return (
    <AbsoluteFill style={{ background: "#ffffff" }}>
      {/* 미디어 */}
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

      {/* 본문 자막 */}
      <div
        style={{
          position: "absolute",
          top: BODY_TOP,
          left: 56,
          right: 56,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {cut.lines.map((ln, i) => (
          <div
            key={i}
            style={{
              fontFamily: FONT,
              fontSize: 55,
              fontWeight: 800,
              color: "#1c1a17",
              lineHeight: 1.45,
              letterSpacing: -1.5,
              textAlign: "center",
            }}
          >
            {ln}
          </div>
        ))}
      </div>

      {/* 하단 출처 캡션 */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT,
          fontSize: 46,
          fontWeight: 800,
          color: "#8a857c",
          letterSpacing: -1,
        }}
      >
        출처 – {cut.source}
      </div>

      {/* 게시판 프레임 */}
      <BoardFrame channel={channel} board={board} />
    </AbsoluteFill>
  );
};
