// ============================================================
//  본문 누적 자막 + 하단 "출처" 캡션
//  - 본문: 컷 안에서 줄이 한 줄씩 나타남 (샘플과 동일)
//  - 캡션: 미디어 아래 회색 굵은 드립
// ============================================================
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const FONT = "'Pretendard', 'Malgun Gothic', sans-serif";

// 한 줄이 등장하는 애니메이션(살짝 아래→제자리 + 페이드)
const Line: React.FC<{ text: string; appearFrame: number }> = ({ text, appearFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - appearFrame;

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 200, stiffness: 120 },
    durationInFrames: 12,
  });
  const opacity = interpolate(local, [0, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const translateY = interpolate(enter, [0, 1], [18, 0]);

  if (local < 0) return null;

  return (
    <div
      style={{
        fontFamily: FONT,
        fontSize: 55,
        fontWeight: 800,
        color: "#1c1a17",
        lineHeight: 1.45,
        letterSpacing: -1.5,
        textAlign: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {text}
    </div>
  );
};

export const BodyText: React.FC<{
  lines: string[];
  cutStartFrame: number;
  top: number;
}> = ({ lines, cutStartFrame, top }) => {
  const frame = useCurrentFrame();
  // 컷 시작 후 줄당 간격(프레임): 첫 줄은 즉시, 이후 0.5초 간격
  const perLine = 15;
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 56,
        right: 56,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      {lines.map((ln, i) => {
        const appear = cutStartFrame + i * perLine;
        if (frame < appear) return null;
        return <Line key={i} text={ln} appearFrame={appear} />;
      })}
    </div>
  );
};

export const SourceCaption: React.FC<{
  text: string;
  cutStartFrame: number;
  bottom: number;
}> = ({ text, cutStartFrame, bottom }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - cutStartFrame;

  const pop = spring({
    frame: local,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.6 },
    durationInFrames: 14,
  });
  const scale = interpolate(pop, [0, 1], [0.7, 1]);
  const opacity = interpolate(local, [0, 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  if (local < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: FONT,
        fontSize: 46,
        fontWeight: 800,
        color: "#8a857c",
        letterSpacing: -1,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      출처 – {text}
    </div>
  );
};
