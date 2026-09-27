// ============================================================
//  오디오 → 자동 전사 → 자막 비트(narration) 생성
//  사용법:
//    node scripts/transcribe.mjs <채널id> [audio파일]
//    예) node scripts/transcribe.mjs daehwanjang
//
//  동작:
//   1) audio 파일을 16kHz 모노 wav로 변환(whisper.cpp 요구)
//   2) whisper.cpp main.exe (medium, 한국어)로 전사.
//      --max-len 로 세그먼트를 짧게(자막 한 줄 길이) 쪼갬 + --split-on-word
//   3) 결과 JSON(transcription[])을 자막 비트로 매핑
//   4) src/channels/<채널>/narration.generated.ts 로 출력
//      (script.ts 에서 import 해서 narration 으로 사용)
//   5) 오디오 길이도 함께 기록(영상 길이 계산용)
//
//  ※ whisper.cpp 미설치 시 먼저: node scripts/setup-whisper.mjs
// ============================================================
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";

const WHISPER_DIR = path.join(process.cwd(), "whisper.cpp");
const MAIN = path.join(WHISPER_DIR, "main.exe");
const MODEL = path.join(WHISPER_DIR, "ggml-medium.bin");
const MAX_CHARS = 16; // 자막 한 줄(세그먼트) 최대 글자수

const channelId = process.argv[2];
if (!channelId) {
  console.error("사용법: node scripts/transcribe.mjs <채널id> [audio파일]");
  process.exit(1);
}

function findAudio() {
  const explicit = process.argv[3];
  if (explicit) return explicit;
  const dir = "audio";
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(mp3|wav|m4a|aac|flac|ogg)$/i.test(f))
    .filter((f) => !f.startsWith("_") && !f.startsWith("test")); // 임시/테스트 제외
  if (files.length === 0) throw new Error("audio/ 에 오디오 파일이 없음");
  const match = files.find((f) => f.includes(channelId)) ?? files[0];
  return path.join(dir, match);
}

const audioPath = findAudio();
console.log("→ 오디오:", audioPath);

// 1) 16kHz 모노 wav 변환
const wavPath = path.join("audio", `_whisper_${channelId}.wav`);
console.log("→ 16kHz wav 변환...");
execFileSync("npx", ["remotion", "ffmpeg", "-y", "-i", audioPath, "-ar", "16000", "-ac", "1", wavPath], {
  stdio: "ignore",
  shell: true,
});

// 2) whisper 전사 (세그먼트를 짧게 쪼갬)
console.log("→ 전사 중(whisper medium, ko)... 1~2분 걸릴 수 있음");
const outBase = path.join("audio", `_out_${channelId}`);
execFileSync(
  MAIN,
  [
    "-m", MODEL,
    "-l", "ko",
    "-f", wavPath,
    "-ml", String(MAX_CHARS), // max segment length (자막 한 줄 길이)
    "-sow", // split on word (단어 경계에서 분할)
    "-oj",
    "-of", outBase,
  ],
  { stdio: "inherit" }
);

// 3) JSON 파싱 → 비트
const json = JSON.parse(fs.readFileSync(`${outBase}.json`, "utf8"));
const segments = json.transcription ?? [];
const beats = segments
  .map((s) => ({
    start: +(s.offsets.from / 1000).toFixed(2),
    text: (s.text ?? "").trim(),
  }))
  .filter((b) => b.text.length > 0);

// 오디오 길이 = 마지막 세그먼트 끝(초) + 여유
const lastTo = segments.length ? segments[segments.length - 1].offsets.to : 0;
const audioDurationSec = +(lastTo / 1000 + 0.5).toFixed(2);

// 4) narration.generated.ts 출력
const outDir = path.join("src", "channels", channelId);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "narration.generated.ts");

const body = beats
  .map((b) => `  { start: ${b.start}, text: ${JSON.stringify(b.text)} },`)
  .join("\n");

const content = `// ============================================================
//  ⚠ 자동 생성 파일 — 직접 수정하지 말 것.
//  scripts/transcribe.mjs 가 녹음을 전사해 만든 자막 비트.
//  원본 오디오: ${audioPath}
//  오디오 길이(초): ${audioDurationSec}
//  생성 시각: ${new Date().toISOString()}
//  script.ts 에서:
//    import { generatedNarration, AUDIO_FILE, AUDIO_DURATION_SEC } from "./narration.generated";
// ============================================================
import type { NarrationBeat } from "../../types";

/** 영상에 삽입할 오디오 파일명 (public 기준 상대경로로 옮겨서 사용) */
export const AUDIO_FILE = ${JSON.stringify(path.basename(audioPath))};
export const AUDIO_DURATION_SEC = ${audioDurationSec};

export const generatedNarration: NarrationBeat[] = [
${body}
];
`;

fs.writeFileSync(outFile, content, "utf8");
// 임시 파일 정리
fs.rmSync(wavPath, { force: true });
fs.rmSync(`${outBase}.json`, { force: true });

console.log(`✓ 자막 비트 ${beats.length}개 생성 → ${outFile}`);
console.log(`  오디오 길이: ${audioDurationSec}s`);
