// ============================================================
//  채널 레지스트리 — 운영 중인 모든 채널을 여기 등록
//  새 채널을 만들면:
//   1) src/channels/<id>/channel.ts + script.ts 작성
//   2) 아래 CHANNEL_ENTRIES 배열에 한 줄 추가
//  그러면 Remotion Studio에 그 채널의 영상/썸네일 Composition이 자동으로 뜸.
// ============================================================
import type { Channel, StoryScript } from "./types";

import { anppanChannel } from "./channels/anppan/channel";
import { anppanScript } from "./channels/anppan/script";

import { daehwanjangChannel } from "./channels/daehwanjang/channel";
import { daehwanjangScript } from "./channels/daehwanjang/script";

import { helmadChannel } from "./channels/helmad/channel";
import { helmadScript } from "./channels/helmad/script";

export type ChannelEntry = {
  channel: Channel;
  /** 이 채널에서 현재 렌더할 대본(글) */
  script: StoryScript;
};

export const CHANNEL_ENTRIES: ChannelEntry[] = [
  { channel: anppanChannel, script: anppanScript },
  { channel: daehwanjangChannel, script: daehwanjangScript },
  { channel: helmadChannel, script: helmadScript },
];
