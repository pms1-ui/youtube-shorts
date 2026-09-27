// ============================================================
//  채널 렌더 헬퍼
//  · 결과물은 채널별 폴더로: out/<채널한글명>/
//  · 파일명은 날짜가 앞: "YYMMDD_<채널한글명>_<파트>"
//    예) out/대환장민국/260927_대환장민국_sub.mov
//  사용법:
//    node scripts/render.mjs <채널> [옵션]
//    옵션:
//      (없음)     통짜 영상(미리보기용, 상단+미디어+자막 합본)
//      --main     상단바+인트로+빈 중앙+하단바(소리 없음) → _main.mp4
//      --subs     자막 흰 글자만(투명 배경, ProRes mov)    → _sub.mov
//      --sfx      효과음만                                 → _sfx.mp3
//      --split    --main, --subs, --sfx 모두 렌더 (편집용 3파일)
//      --thumb    게시물 썸네일 이미지                     → .png
//  예) node scripts/render.mjs daehwanjang --split
// ============================================================
import { execSync } from "child_process";
import fs from "fs";

const CHANNELS = {
  anppan: { comp: "Anppan", label: "안빤엄빠" },
  daehwanjang: { comp: "Daehwanjang", label: "대환장민국" },
  helmad: { comp: "Helmad", label: "헬마드" },
};

const id = process.argv[2];
const args = process.argv.slice(3);
const isThumb = args.includes("--thumb");
const isMain = args.includes("--main");
const isSubs = args.includes("--subs");
const isSfx = args.includes("--sfx");
const isSplit = args.includes("--split");

if (!id || !CHANNELS[id]) {
  console.error("사용법: node scripts/render.mjs <" + Object.keys(CHANNELS).join("|") + "> [--main|--subs|--split|--thumb]");
  process.exit(1);
}

const { comp, label } = CHANNELS[id];

const d = new Date();
const yymmdd =
  String(d.getFullYear()).slice(2) +
  String(d.getMonth() + 1).padStart(2, "0") +
  String(d.getDate()).padStart(2, "0");

// 채널별 폴더: out/<채널한글명>/
const outDir = `out/${label}`;
fs.mkdirSync(outDir, { recursive: true });

// 파일명 접두: "YYMMDD_<채널한글명>"  → 파트/확장자는 각 함수에서 붙임
const base = `${yymmdd}_${label}`;

function run(cmd) {
  console.log("→", cmd);
  execSync(cmd, { stdio: "inherit" });
}

// 상단+인트로+하단바 (소리·미디어 없음)
function renderMain() {
  const out = `${outDir}/${base}_main.mp4`;
  run(`npx remotion render ${comp}Main "${out}" --crf=18`);
  console.log("✓ main(상단바+인트로+하단바):", out);
}

// 자막만 (투명 배경) — ProRes 4444 알파(mov)
function renderSubs() {
  const out = `${outDir}/${base}_sub.mov`;
  run(`npx remotion render ${comp}Subs "${out}" --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png`);
  console.log("✓ 자막(투명 mov):", out);
}

// 효과음만 (mp3)
function renderSfx() {
  const out = `${outDir}/${base}_sfx.mp3`;
  run(`npx remotion render ${comp}Sfx "${out}" --codec=mp3`);
  console.log("✓ 효과음(mp3):", out);
}

if (isThumb) {
  const out = `${outDir}/${base}.png`;
  run(`npx remotion still ${comp}Thumbnail "${out}" --overwrite`);
  console.log("✓ 썸네일:", out);
} else if (isSplit) {
  renderMain();
  renderSubs();
  renderSfx();
} else if (isMain) {
  renderMain();
} else if (isSubs) {
  renderSubs();
} else if (isSfx) {
  renderSfx();
} else {
  // 통짜(미리보기)
  const out = `${outDir}/${base}.mp4`;
  run(`npx remotion render ${comp} "${out}" --crf=18`);
  console.log("✓ 통짜:", out);
}
