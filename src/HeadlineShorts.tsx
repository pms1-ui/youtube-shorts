// ============================================================
//  헤드라인 레이아웃 컴포지션 (sample/2 포맷)
//  구조(위→아래):
//    ① 검정 배경 전체
//    ② 상단 여백(좁게)
//    ③ 고정 헤드라인 2줄 (1줄 하양 / 2줄 노랑, 초대형 볼드)
//    ④ 중앙 미디어 박스 (헤드라인 바로 아래, cuts 트랙)
//    ⑤ 사진 바로 아래 자막 (검정 박스 + 노랑/하양 이탤릭, narration 트랙)
//  자막은 narration 비트로 "속도감 있게 쫙쫙" 전개된다.
//  ※ 안빤엄빠(board 레이아웃)와 별개. 대환장민국이 이걸 사용.
// ============================================================
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { MediaBox } from "./components/MediaBox";
import { IntroCard } from "./components/IntroCard";
import type { Channel, NarrationBeat, StoryScript } from "./types";
import { SFX_FILES } from "./types";
import { INCLUDE_BGM, BGM_VOLUME } from "./config";
import { TITLE_FONT, BODY_FONT } from "./fonts";

// ============================================================
//  레이아웃: 상단블록 / 중앙미디어 / 하단블록 을 서로 독립으로 운용.
//  세 영역은 각자 고정된 y·높이·배경을 가지며 서로 위치에 얽매이지 않는다.
//  (1080x1920 기준)
// ============================================================

// ── ① 상단 블록 (제목 영역) ──
const TOP_BLOCK = {
  top: 0, // 화면 최상단부터
  height: 520, // 상단 블록 높이 (이 안에 헤드라인 2줄)
  background: "#000000", // 상단 블록 배경(검정)
};
const HEADLINE_TOP = 230; // 헤드라인 텍스트 y (상단 블록 안에서의 위치)
const TITLE_SIZE = 118; // 제목 1줄 크기
const TITLE_SIZE2 = Math.round(TITLE_SIZE * 1.15); // 제목 2줄만 15% 크게

// ── ② 중앙 미디어 (사진/영상) ──
const MEDIA_TOP = 560;
const MEDIA_HEIGHT = 880;

// ── ③ 하단 블록 (자막 영역) — 사진에 묶이지 않고 화면 하단에 독립 고정 ──
const BOTTOM_BLOCK = {
  top: 1480, // 자막 블록 상단 y (미디어 아래, 화면 하단쪽 고정)
  height: 300, // 자막 블록 높이 (이 안에서 자막 세로 가운데)
};

// 자막 색: 항상 하양 고정
const SUBTITLE_COLOR = "#ffffff";

// 굵은 텍스트용 검정 외곽선 (여러 방향 그림자)
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

// ── 상단 블록: 배경 + 고정 헤드라인 2줄 (독립 영역) ──
const TopBlock: React.FC<{ line1: string; line2: string }> = ({ line1, line2 }) => (
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
        fontFamily: TITLE_FONT, // 에스코어 드림 9 Black
        fontStyle: "italic",
        fontWeight: 900,
        lineHeight: 1.2,
        letterSpacing: -3,
      }}
    >
      <div style={{ color: "#ffffff", fontSize: TITLE_SIZE, textShadow: OUTLINE(5) }}>{line1}</div>
      <div style={{ color: "#ffde3d", fontSize: TITLE_SIZE2, textShadow: OUTLINE(5) }}>{line2}</div>
    </div>
  </div>
);

// ── 하단 자막: 흰 글자만 (배경·외곽선 없음). 배경은 main의 하단 바가 담당. ──
// sub 파일에선 이 글자만 투명 위에 얹혀 나오고, main의 검정 하단 바 위에 겹쳐진다.
const NarrationLine: React.FC<{ text: string }> = ({ text }) => {
  return (
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
          padding: "0 30px",
          fontFamily: BODY_FONT, // Pretendard
          fontWeight: 700,
          fontSize: 70,
          lineHeight: 1.2,
          letterSpacing: -1.5,
          textAlign: "center",
          color: "#ffffff", // 흰 글자 (까만 배경 위에 얹음)
        }}
      >
        {text}
      </div>
    </div>
  );
};

// ── 하단 검정 바 (자막이 얹힐 배경). main/full 에서만 그린다. ──
const BottomBar: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: BOTTOM_BLOCK.top,
      left: 0,
      width: "100%",
      height: BOTTOM_BLOCK.height,
      background: "#000000",
    }}
  />
);

// 렌더 파트:
//  "full" = 전부(미리보기)  /  "main" = 상단+미디어(자막X, 오디오O)  /  "subs" = 자막만(투명배경)
export type RenderMode = "full" | "main" | "subs";

export const HeadlineShorts: React.FC<{
  channel: Channel;
  script: StoryScript;
  mode?: RenderMode;
  /** 삽입할 내레이션 오디오 파일명 (public/audio/ 기준). main/full 에서만 재생 */
  audioFile?: string;
}> = ({ channel, script, mode = "full", audioFile }) => {
  // main = 상단바+인트로+중앙(빈 검정)+하단바(자막 텍스트 없음)+효과음/오디오
  // subs = 자막 글자만(투명 배경)
  // full = 전부(미리보기)
  const showTop = mode !== "subs"; // 상단 블록 + 인트로
  const showMedia = mode === "full"; // 중앙 미디어(사진). main엔 안 넣음(나중에 직접)
  const showBottomBar = mode !== "subs"; // 하단 검정 바(자막 배경)
  const showSubsText = mode !== "main"; // 자막 흰 글자
  // 소리(오디오·효과음)는 미리보기(full)에서만. main/subs 출력물엔 소리 없음.
  //  → 원본 오디오는 프리미어에서 직접, 효과음은 별도 Sfx 컴포지션(mp3)으로 뺀다.
  const showAudio = mode === "full";
  const bg = mode === "subs" ? "transparent" : "#000000";

  // 헤드라인: script.headline 우선, 없으면 title을 한 줄로
  const headline = script.headline ?? { line1: script.title, line2: "" };

  // 인트로 스캔 애니메이션의 "자체 길이"(프레임). 녹음에 인트로가 이미 포함돼 있으므로
  // 본편(자막/효과음)을 뒤로 밀지 않는다. 인트로는 0초부터 이 길이만큼 재생.
  const introDur = script.intro ? Math.round((script.intro.durationSec ?? 2.5) * 30) : 0;
  // 자막/효과음은 전사 타임코드 그대로 → 오프셋 0
  const OFFSET = 0;

  // 인트로 효과음 재생 시점 = 확대·크롭이 시작되는 순간(둘째 줄 시작, 한 줄이면 절반)
  // IntroCard의 zoomStart 계산과 동일하게 맞춘다 (framesPerChar=3)
  const introSfxFrom = (() => {
    if (!script.intro) return 0;
    const framesPerChar = 3;
    const lines = script.intro.lines;
    const firstLineChars = lines[0]?.length ?? 0;
    const triggerChars = lines.length > 1 ? firstLineChars : Math.ceil(firstLineChars / 2);
    return triggerChars * framesPerChar;
  })();

  // 사진(미디어) 트랙 — cuts. 효과음은 "사진 전환마다" 여기서 재생
  const cuts = script.cuts;
  const timedCuts = cuts.map((cut, i) => {
    const startFrame = OFFSET + Math.round(cut.start * 30);
    const next = cuts[i + 1];
    const endFrame = next ? OFFSET + Math.round(next.start * 30) : startFrame + 90;
    return { ...cut, startFrame, durationInFrames: endFrame - startFrame };
  });

  // 자막(내레이션) 트랙 — narration 우선, 없으면 cuts[].subtitle에서 폴백
  const beats: NarrationBeat[] =
    script.narration ??
    cuts.map((c) => ({
      start: c.start,
      text: c.subtitle ?? c.lines.join(" "),
    }));

  const timedBeats = beats
    .map((b, i) => {
      const startFrame = OFFSET + Math.round(b.start * 30);
      const next = beats[i + 1];
      const endFrame = next ? OFFSET + Math.round(next.start * 30) : startFrame + 45;
      return { ...b, startFrame, durationInFrames: Math.max(1, endFrame - startFrame) };
    })
    // ★ 인트로 구간(0~introDur)엔 하단 자막을 절대 띄우지 않는다.
    //    인트로 문장 낭독 중 본문 자막이 겹치는 것을 구조적으로 방지.
    .filter((b) => b.startFrame >= introDur);

  return (
    <AbsoluteFill style={{ background: bg }}>
      {/* 내레이션 오디오 (main·full 에만 삽입 — 자막 파일엔 넣지 않음) */}
      {showAudio && audioFile && <Audio src={staticFile(`audio/${audioFile}`)} />}

      {/* 배경 브금: 실제 배포본엔 넣지 않음. INCLUDE_BGM=true 때만 */}
      {showAudio && INCLUDE_BGM && <Audio src={staticFile("sfx/bgm.wav")} volume={BGM_VOLUME} loop />}

      {/* ── 인트로 (main/full) ── */}
      {showTop && script.intro && (
        <Sequence from={0} durationInFrames={introDur} layout="none">
          <IntroCard lines={script.intro.lines} durationInFrames={introDur} />
        </Sequence>
      )}

      {showAudio && script.intro?.sfx && (
        <Sequence from={introSfxFrom} durationInFrames={introDur} layout="none">
          <Audio src={staticFile(`sfx/${SFX_FILES[script.intro.sfx]}`)} volume={0.9} />
        </Sequence>
      )}

      {/* ── 미디어 (full 에만; main은 중앙을 비워둠 — 사진은 나중에 직접) ── */}
      {timedCuts.map((cut, i) => (
        <Sequence key={`cut-${i}`} from={cut.startFrame} durationInFrames={cut.durationInFrames} layout="none">
          {showMedia && (
            <MediaBox
              photo={cut.photo}
              photoSet={channel.photoSet}
              cutStartFrame={0}
              top={MEDIA_TOP}
              height={MEDIA_HEIGHT}
              zoom={cut.zoom ?? "in"}
              background="#000"
            />
          )}
          {showAudio && cut.sfxOnEnter && <Audio src={staticFile(`sfx/${SFX_FILES[cut.sfxOnEnter]}`)} volume={0.9} />}
        </Sequence>
      ))}

      {/* ── 하단 검정 바 (main/full; 자막이 얹힐 배경) ── */}
      {showBottomBar && <BottomBar />}

      {/* ── 자막 흰 글자 (subs/full) ── */}
      {showSubsText &&
        timedBeats.map((b, i) => (
          <Sequence key={`beat-${i}`} from={b.startFrame} durationInFrames={b.durationInFrames} layout="none">
            <NarrationLine text={b.text} />
          </Sequence>
        ))}

      {/* ── 상단 블록(제목+배경) (main/full) ── */}
      {showTop && <TopBlock line1={headline.line1} line2={headline.line2} />}
    </AbsoluteFill>
  );
};
