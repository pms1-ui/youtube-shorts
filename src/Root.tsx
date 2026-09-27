import React from "react";
import { Composition, Still } from "remotion";
import { BabyShorts } from "./BabyShorts";
import { PostThumbnail } from "./PostThumbnail";
import { HeadlineShorts } from "./HeadlineShorts";
import { HeadlineThumbnail } from "./HeadlineThumbnail";
import { SfxTrack } from "./SfxTrack";
import { FPS, totalSeconds } from "./types";
import { CHANNEL_ENTRIES } from "./registry";

const WIDTH = 1080;
const HEIGHT = 1920;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {CHANNEL_ENTRIES.map(({ channel, script }) => {
        // 레이아웃에 따라 영상/썸네일 컴포넌트 선택 (기본 board)
        const isHeadline = channel.layout === "headline";
        const VideoComp = isHeadline ? HeadlineShorts : BabyShorts;
        const ThumbComp = isHeadline ? HeadlineThumbnail : PostThumbnail;

        const durationInFrames = Math.round(totalSeconds(script) * FPS);

        return (
          <React.Fragment key={channel.id}>
            {/* 쇼츠 영상(미리보기용 전체): <채널compositionId> */}
            <Composition
              id={channel.compositionId}
              component={VideoComp}
              durationInFrames={durationInFrames}
              fps={FPS}
              width={WIDTH}
              height={HEIGHT}
              defaultProps={{ channel, script }}
            />

            {/* headline 레이아웃은 2분할 출력 컴포지션 추가:
                <id>Main = 상단+미디어(자막X, 오디오O),  <id>Subs = 자막만(투명배경) */}
            {isHeadline && (
              <>
                <Composition
                  id={`${channel.compositionId}Main`}
                  component={HeadlineShorts}
                  durationInFrames={durationInFrames}
                  fps={FPS}
                  width={WIDTH}
                  height={HEIGHT}
                  defaultProps={{ channel, script, mode: "main" as const, audioFile: script.audioFile }}
                />
                <Composition
                  id={`${channel.compositionId}Subs`}
                  component={HeadlineShorts}
                  durationInFrames={durationInFrames}
                  fps={FPS}
                  width={WIDTH}
                  height={HEIGHT}
                  defaultProps={{ channel, script, mode: "subs" as const, audioFile: undefined }}
                />
                {/* 효과음 전용(mp3로 렌더) */}
                <Composition
                  id={`${channel.compositionId}Sfx`}
                  component={SfxTrack}
                  durationInFrames={durationInFrames}
                  fps={FPS}
                  width={WIDTH}
                  height={HEIGHT}
                  defaultProps={{ channel, script }}
                />
              </>
            )}

            {/* 게시물 이미지: <채널compositionId>Thumbnail */}
            <Still
              id={`${channel.compositionId}Thumbnail`}
              component={ThumbComp}
              width={WIDTH}
              height={HEIGHT}
              defaultProps={{ channel, script, cutIndex: 0 }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};
