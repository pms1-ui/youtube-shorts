// ============================================================
//  인트로 카드 (sample/3 스타일)
//   · 흰 배경 카드 위에 본문 문장(여러 줄)을 검정 글씨로 표시
//   · 시작하자마자 바로 연파랑 하이라이트(형광펜) 커서가 "한 글자씩" 좌→우로 긁는다.
//     각 글자를 span으로 두고 charsDone 개수만큼만 배경색 → 딱딱 끊기는 스텝.
//     1줄을 전부 긁은 뒤에 2줄로 넘어간다(순차).
//   · 둘째 줄 긁기 시작할 때(한 줄이면 절반 지점)부터 곧바로 카드가 위아래로
//     시네마틱하게 좁아지며(크롭) 텍스트가 확대되어 강조된다.
//  스캔이 끝나면 상위(HeadlineShorts)에서 본편으로 전환.
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BODY_FONT } from "../fonts";

const HIGHLIGHT = "#a9cbe8"; // 연파랑 형광펜 색

// 인트로 흰카드 한 줄 기준 폰트(px)와 가용 폭(px).
//  카드 폭 = 화면 1080. 좌우 안전여백 50px씩 → 980px 안에 한 줄이 들어와야 짤리지 않음.
const INTRO_BASE_SIZE = 74;
const INTRO_MAX_WIDTH = 980;
// 한글 볼드(800) + letterSpacing -1 기준 평균 글자폭 ≈ fontSize * 0.98.
//  긴 줄이 가용 폭을 넘치면 폰트를 자동 축소해 nowrap 상태에서도 짤리지 않게 한다.
const fitIntroSize = (lines: string[]): number => {
  const perChar = 0.98;
  const longest = lines.reduce((m, l) => Math.max(m, l.length), 0);
  const estWidth = longest * INTRO_BASE_SIZE * perChar;
  if (estWidth <= INTRO_MAX_WIDTH) return INTRO_BASE_SIZE;
  return Math.floor(INTRO_MAX_WIDTH / (longest * perChar));
};

export const IntroCard: React.FC<{
  lines: string[];
  durationInFrames: number;
}> = ({ lines, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  // 가장 긴 줄 기준 폰트 자동 축소(한 줄이 카드 폭을 넘지 않도록)
  const introFontSize = fitIntroSize(lines);

  // ── 타임라인 ──────────────────────────────────────────────
  const fadeIn = 4; // 아주 짧게 등장
  const scanStart = 0; // 시작하자마자 바로 긁기
  const totalChars = lines.reduce((a, l) => a + l.length, 0);
  const framesPerChar = 3; // 한 글자당 3프레임 → 딱딱 끊기는 스텝
  const scanEnd = scanStart + totalChars * framesPerChar;

  // 긁힌 글자 수(정수 스텝) — 선형, easing 없음
  const charsDone = Math.min(
    totalChars,
    Math.max(0, Math.floor((frame - scanStart) / framesPerChar))
  );

  // 확대·크롭 시작 시점: "둘째 줄 긁기 시작"할 때(한 줄이면 그 줄 절반 지점)부터 바로
  const firstLineChars = lines[0]?.length ?? 0;
  const zoomTriggerChars = lines.length > 1 ? firstLineChars : Math.ceil(firstLineChars / 2);
  const zoomStart = scanStart + zoomTriggerChars * framesPerChar;
  const zoomEnd = zoomStart + 16; // 약 0.5초에 걸쳐 확대·크롭 (짧고 시네마틱하게)

  // 확대/크롭 진행률
  const postLinear = interpolate(frame, [zoomStart, zoomEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const post = postLinear * postLinear * (3 - 2 * postLinear); // smoothstep
  const scale = 1 + post * 0.42; // 텍스트 확대
  const cropInset = post * 168; // 위·아래 시네마틱 크롭

  const opacity = interpolate(frame, [0, fadeIn], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 카드 세로 영역 — 헤드라인(≈230~520) 아래에서 시작, 침범 방지
  const cardTop = 640;
  const cardHeight = 600;

  // 각 줄의 시작 글자 인덱스(누적) — 순차 하이라이트용
  let acc = 0;
  const lineStartIndex = lines.map((l) => {
    const start = acc;
    acc += l.length;
    return start;
  });

  return (
    <div
      style={{
        position: "absolute",
        top: cardTop,
        left: 0,
        width,
        height: cardHeight,
        opacity,
        clipPath: `inset(${cropInset}px 0px ${cropInset}px 0px)`,
        background: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          transform: `scale(${scale})`,
        }}
      >
        {lines.map((line, li) => (
          <div
            key={li}
            style={{
              fontFamily: BODY_FONT,
              fontWeight: 800,
              fontSize: introFontSize,
              letterSpacing: -1,
              color: "#141414",
              lineHeight: 1.15,
              whiteSpace: "nowrap",
            }}
          >
            {Array.from(line).map((ch, ci) => {
              const globalIndex = lineStartIndex[li] + ci;
              const lit = globalIndex < charsDone;
              return (
                <span
                  key={ci}
                  style={{
                    background: lit ? HIGHLIGHT : "transparent",
                    // 공백도 칠해지도록 최소 폭 확보
                    padding: "2px 0",
                    boxDecorationBreak: "clone",
                    WebkitBoxDecorationBreak: "clone",
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
