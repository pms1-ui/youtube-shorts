// ============================================================
//  채널 렌더 헬퍼
//  · 결과물은 채널별 + 편별 하위 폴더로: out/<채널한글명>/<YYMMDD>_<순번>/
//    예) out/헬마드/260930_01/260930_헬마드_sub.mov
//    → 한 편(스크립트물) = 하위 폴더 하나. 5종(main/sub/sfx/통짜/썸네일)이 그 안에 모임.
//  · 순번(2자리)은 같은 날짜 안에서 01, 02, ... 로 증가.
//  사용법:
//    node scripts/render.mjs <채널> [옵션]
//    옵션:
//      (없음)     통짜 영상(미리보기용, 상단+미디어+자막 합본)
//      --main     상단바+인트로+빈 중앙+하단바(소리 없음) → _main.mp4
//      --subs     자막 흰 글자만(투명 배경, ProRes mov)    → _sub.mov
//      --sfx      효과음만                                 → _sfx.mp3
//      --split    --main, --subs, --sfx 모두 렌더 (편집용 3파일)
//      --thumb    게시물 썸네일 이미지                     → .png
//      --new      그날의 새 편으로(순번 +1) 새 폴더 생성
//      --seq=NN   순번을 직접 지정(예: --seq=02)
//    예) node scripts/render.mjs helmad --split --new
// ============================================================
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

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
const isNew = args.includes("--new");
const seqArg = args.find((a) => a.startsWith("--seq="));
const dateArg = args.find((a) => a.startsWith("--date="));

if (!id || !CHANNELS[id]) {
  console.error("사용법: node scripts/render.mjs <" + Object.keys(CHANNELS).join("|") + "> [--main|--subs|--sfx|--split|--thumb|--new|--seq=NN|--date=YYMMDD]");
  process.exit(1);
}

const { comp, label } = CHANNELS[id];

const d = new Date();
// --date=YYMMDD 로 지난 편을 재렌더할 수 있다(폴더명·파일명 접두에 사용). 없으면 오늘 날짜.
const yymmdd = dateArg
  ? dateArg.split("=")[1]
  : String(d.getFullYear()).slice(2) +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");

const channelDir = path.join("out", label);
fs.mkdirSync(channelDir, { recursive: true });

// 같은 날짜(YYMMDD) 하위 폴더 목록에서 순번 계산
function existingSeqDirs() {
  return fs
    .readdirSync(channelDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && new RegExp(`^${yymmdd}_\\d{2}$`).test(e.name))
    .map((e) => e.name)
    .sort();
}

function resolveSeq() {
  // 1) --seq=NN 명시되면 그대로
  if (seqArg) {
    const n = seqArg.split("=")[1].padStart(2, "0");
    return n;
  }
  const dirs = existingSeqDirs();
  // 2) --new 면 (최대 순번 + 1), 없으면 01
  if (isNew) {
    if (dirs.length === 0) return "01";
    const maxN = Math.max(...dirs.map((n) => parseInt(n.slice(-2), 10)));
    return String(maxN + 1).padStart(2, "0");
  }
  // 3) 기본: 그날 가장 최근 수정된 편 폴더 재사용(같은 편 재렌더). 없으면 01 새로.
  if (dirs.length === 0) return "01";
  const latest = dirs
    .map((n) => ({ n, mtime: fs.statSync(path.join(channelDir, n)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime)[0].n;
  return latest.slice(-2);
}

const seq = resolveSeq();
const outDir = path.join(channelDir, `${yymmdd}_${seq}`);
fs.mkdirSync(outDir, { recursive: true });

// 파일명 접두: "YYMMDD_<채널한글명>"  → 파트/확장자는 각 함수에서 붙임
const base = `${yymmdd}_${label}`;

// ── 대본 txt 자동 저장 ──
// script.ts 에서 title/headline/narration 텍스트를 뽑아 편 폴더에 보관한다.
// (TS를 실행하지 않고 정규식으로 문자열만 추출 → 영상·대본이 한 폴더에 묶임)
function saveScriptTxt() {
  try {
    const scriptPath = path.join("src", "channels", id, "script.ts");
    if (!fs.existsSync(scriptPath)) return;
    const src = fs.readFileSync(scriptPath, "utf8");

    const titleM = src.match(/title:\s*"([^"]*)"/);
    const title = titleM ? titleM[1] : "";

    const hlM = src.match(/headline:\s*\{[^}]*line1:\s*"([^"]*)"[^}]*line2:\s*"([^"]*)"/s);
    const headline = hlM ? `${hlM[1]}\n${hlM[2]}` : "";

    // narration 블록 안의 text 값들만 순서대로 추출
    const narrM = src.match(/narration:\s*\[([\s\S]*?)\n\s*\],/);
    let lines = [];
    if (narrM) {
      const re = /text:\s*"([^"]*)"/g;
      let m;
      while ((m = re.exec(narrM[1])) !== null) lines.push(m[1]);
    }

    const txt =
      `[제목]\n${title}\n\n` +
      `[인트로/헤드라인]\n${headline}\n\n` +
      `[본문 자막]\n${lines.join("\n")}\n`;

    const out = path.join(outDir, `${base}_script.txt`);
    fs.writeFileSync(out, txt, "utf8");
    console.log("✓ 대본 txt 저장:", out);
  } catch (e) {
    console.warn("! 대본 txt 저장 실패(무시):", e.message);
  }
}

saveScriptTxt();

function run(cmd) {
  console.log("→", cmd);
  execSync(cmd, { stdio: "inherit" });
}

// 상단+인트로+하단바 (소리·미디어 없음)
function renderMain() {
  const out = path.join(outDir, `${base}_main.mp4`);
  run(`npx remotion render ${comp}Main "${out}" --crf=18`);
  console.log("✓ main(상단바+인트로+하단바):", out);
}

// 자막만 (투명 배경) — ProRes 4444 알파(mov)
function renderSubs() {
  const out = path.join(outDir, `${base}_sub.mov`);
  run(`npx remotion render ${comp}Subs "${out}" --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png`);
  console.log("✓ 자막(투명 mov):", out);
}

// 효과음만 (mp3)
function renderSfx() {
  const out = path.join(outDir, `${base}_sfx.mp3`);
  run(`npx remotion render ${comp}Sfx "${out}" --codec=mp3`);
  console.log("✓ 효과음(mp3):", out);
}

console.log(`▶ 출력 폴더: ${outDir}`);

if (isThumb) {
  const out = path.join(outDir, `${base}.png`);
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
  const out = path.join(outDir, `${base}.mp4`);
  run(`npx remotion render ${comp} "${out}" --crf=18`);
  console.log("✓ 통짜:", out);
}
