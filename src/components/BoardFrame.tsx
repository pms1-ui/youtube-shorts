// ============================================================
//  게시판 프레임 — 헤더 / 제목 / 메타 / 구분선 (영상 내내 고정)
//  채널 브랜드(channel)와 글 정보(board)를 props로 받음 → 멀티채널 대응
// ============================================================
import React from "react";
import type { Channel } from "../types";
import { getDecoration } from "./decorations";

const FONT = "'Pretendard', 'Malgun Gothic', sans-serif";

// ── 레이아웃 상수 (샘플 실측 기반) ──
const HEADER_TOP_PAD = 70; // 헤더 위 여백(상태바 영역)
const HEADER_BAR_H = 170; // 채널명이 들어가는 헤더바 높이
const HEADER_TOTAL = HEADER_TOP_PAD + HEADER_BAR_H;

export type BoardInfo = {
  channel: string;
  author: string;
  title: string;
  views: string;
  comments: string;
};

export const BoardFrame: React.FC<{ channel: Channel; board: BoardInfo }> = ({ channel, board }) => {
  const iconColor = channel.headerIconColor ?? channel.headerTextColor;
  const titleColor = channel.titleColor ?? "#1c1a17";
  const dividerColor = channel.dividerColor ?? "#2b2822";
  const Decoration = getDecoration(channel.headerDecoration);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ① 헤더 (위 여백 + 헤더바) — 색은 채널 브랜드 컬러 */}
      <div
        style={{
          background: channel.headerColor,
          height: HEADER_TOTAL,
          position: "relative",
        }}
      >
        {/* 헤더바 */}
        <div
          style={{
            position: "absolute",
            top: HEADER_TOP_PAD,
            left: 0,
            width: "100%",
            height: HEADER_BAR_H,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* 뒤로가기 (좌측 꺽쇠, 크게) */}
          <div
            style={{
              position: "absolute",
              left: 40,
              top: "50%",
              transform: "translateY(-54%)",
              fontSize: 96,
              lineHeight: 1,
              color: iconColor,
              fontWeight: 300,
              fontFamily: FONT,
            }}
          >
            ‹
          </div>

          {/* 채널명 + 장식(태극기 등)을 가로로 나란히 (가운데 정렬) */}
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {Decoration ? <Decoration /> : null}
            <div
              style={{
                fontFamily: FONT,
                fontSize: 64,
                fontWeight: 800,
                color: channel.headerTextColor,
                letterSpacing: -1,
              }}
            >
              {board.channel}
            </div>
          </div>

          {/* 메뉴(햄버거) */}
          <div style={{ position: "absolute", right: 48, display: "flex", flexDirection: "column", gap: 10 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 60, height: 7, background: iconColor, borderRadius: 4 }} />
            ))}
          </div>
        </div>
      </div>

      {/* ② 제목 + 메타 */}
      <div style={{ background: "#ffffff", padding: "40px 44px 0 44px" }}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 52,
            fontWeight: 800,
            color: titleColor,
            lineHeight: 1.3,
            letterSpacing: -2,
            whiteSpace: "nowrap", // 한 줄 강제
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {board.title}
        </div>
        <div style={{ fontFamily: FONT, fontSize: 33, color: "#4a463f", marginTop: 26, fontWeight: 600 }}>
          작성자 : {board.author} <span style={{ color: "#b0aaa0" }}>|</span> 조회 {board.views}{" "}
          <span style={{ color: "#b0aaa0" }}>|</span> 댓글 {board.comments}
        </div>
        {/* ③ 구분선 */}
        <div style={{ height: 4, background: dividerColor, marginTop: 28 }} />
      </div>
    </div>
  );
};

// 프레임에서 본문 자막이 시작하는 y(px)
export const BODY_TOP = 500;
