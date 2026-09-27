// ============================================================
//  Whisper.cpp 설치 (STT 준비) — 1회만 실행
//  사용법: node scripts/setup-whisper.mjs
//   · whisper.cpp 바이너리를 ./whisper.cpp 에 설치
//   · 한국어 전사용 모델(medium) 다운로드
//  설치 후 scripts/transcribe.mjs 로 오디오→자막 전사 가능.
// ============================================================
import { installWhisperCpp, downloadWhisperModel } from "@remotion/install-whisper-cpp";
import path from "path";

const to = path.join(process.cwd(), "whisper.cpp");
const version = "1.5.5";
const model = "medium"; // 한국어 정확도/속도 균형 (base는 한국어 약함, large-v3는 무거움)

console.log("→ whisper.cpp 설치 위치:", to);

await installWhisperCpp({ to, version });
console.log("✓ whisper.cpp 바이너리 설치 완료");

await downloadWhisperModel({ folder: to, model });
console.log(`✓ 모델(${model}) 다운로드 완료`);

console.log("준비 끝. 이제: node scripts/transcribe.mjs <audio파일>");
