// ============================================================
//  메인 컴포지션 — 모든 레이어 조립 (채널/대본을 props로 받음)
//  레이어 순서(아래→위): 배경 → 미디어박스 → 게시판프레임 → 본문자막 → 출처캡션 → 오디오
// ============================================================
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { BoardFrame, BODY_TOP } from "./components/BoardFrame";
import { MediaBox } from "./components/MediaBox";
import { BodyText, SourceCaption } from "./components/Subtitles";
import type { Channel, StoryScript } from "./types";
import { SFX_FILES } from "./types";
import { INCLUDE_BGM, BGM_VOLUME } from "./config";

// 세로 쇼츠 레이아웃 상수 (1080x1920 기준)
const MEDIA_TOP = 700; // 미디어 박스가 시작하는 y (자막 2줄 아래)
const MEDIA_HEIGHT = 940; // 미디어 박스 높이
const CAPTION_BOTTOM = 150; // 하단 출처 캡션 위치

export const BabyShorts: React.FC<{ channel: Channel; script: StoryScript }> = ({ channel, script }) => {
  const board = {
    channel: channel.name,
    author: script.author ?? channel.defaultAuthor,
    title: script.title,
    views: script.views,
    comments: script.comments,
  };

  // 각 컷의 시작/길이(프레임) 계산
  const cuts = script.cuts;
  const timed = cuts.map((cut, i) => {
    const startFrame = Math.round(cut.start * 30);
    const next = cuts[i + 1];
    const endFrame = next ? Math.round(next.start * 30) : startFrame + 90;
    return { ...cut, startFrame, durationInFrames: endFrame - startFrame };
  });

  return (
    <AbsoluteFill style={{ background: "#ffffff" }}>
      {/* 배경 브금: 실제 배포본엔 넣지 않음(유튜브 음악 기능으로 세팅).
          INCLUDE_BGM=true 일 때만 미리듣기용으로 재생 */}
      {INCLUDE_BGM && <Audio src={staticFile("sfx/bgm.wav")} volume={BGM_VOLUME} loop />}

      {/* 컷별 미디어 + 자막 + 캡션 + 효과음 */}
      {timed.map((cut, i) => (
        <Sequence
          key={i}
          from={cut.startFrame}
          durationInFrames={cut.durationInFrames}
          layout="none"
        >
          <MediaBox photo={cut.photo} photoSet={channel.photoSet} cutStartFrame={0} top={MEDIA_TOP} height={MEDIA_HEIGHT} />
          <BodyText lines={cut.lines} cutStartFrame={0} top={BODY_TOP} />
          <SourceCaption text={cut.source} cutStartFrame={0} bottom={CAPTION_BOTTOM} />
          {cut.sfxOnEnter && <Audio src={staticFile(`sfx/${SFX_FILES[cut.sfxOnEnter]}`)} volume={0.9} />}
        </Sequence>
      ))}

      {/* 게시판 프레임 (고정) */}
      <BoardFrame channel={channel} board={board} />
    </AbsoluteFill>
  );
};
