// ============================================================
//  효과음 전용 트랙 — 효과음만 타임라인에 배치(영상 없음).
//  mp3로 렌더해서 프리미어에서 별도 오디오 트랙으로 얹는다.
//  타이밍은 HeadlineShorts와 동일:
//   · 인트로 효과음: 확대·크롭 시작 시점(둘째 줄, 한 줄이면 절반)
//   · 컷 효과음: 각 cut.start (인트로 길이만큼 뒤로 밀림)
// ============================================================
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import type { Channel, StoryScript } from "./types";
import { SFX_FILES } from "./types";

export const SfxTrack: React.FC<{ channel: Channel; script: StoryScript }> = ({ script }) => {
  const introDur = script.intro ? Math.round((script.intro.durationSec ?? 2.5) * 30) : 0;

  // 인트로 효과음: 인트로 스캔 확대 시점(0초부터의 스캔 진행 기준). 오프셋 없음.
  const introSfxFrom = (() => {
    if (!script.intro?.sfx) return 0;
    const framesPerChar = 3;
    const lines = script.intro.lines;
    const firstLineChars = lines[0]?.length ?? 0;
    const triggerChars = lines.length > 1 ? firstLineChars : Math.ceil(firstLineChars / 2);
    return triggerChars * framesPerChar;
  })();

  // 컷 효과음도 전사 타임코드 그대로 → 오프셋 0
  const OFFSET = 0;
  const cuts = script.cuts;

  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      {/* 인트로 효과음 */}
      {script.intro?.sfx && (
        <Sequence from={introSfxFrom} durationInFrames={introDur || 30} layout="none">
          <Audio src={staticFile(`sfx/${SFX_FILES[script.intro.sfx]}`)} volume={0.9} />
        </Sequence>
      )}

      {/* 컷 전환 효과음 */}
      {cuts.map((cut, i) => {
        if (!cut.sfxOnEnter) return null;
        const from = OFFSET + Math.round(cut.start * 30);
        return (
          <Sequence key={i} from={from} durationInFrames={45} layout="none">
            <Audio src={staticFile(`sfx/${SFX_FILES[cut.sfxOnEnter]}`)} volume={0.9} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
