// 효과음 WAV를 코드로 생성 (외부 파일 의존 제거)
// pop / boing / ding / whoosh / fail 5종 + 잔잔한 배경 브금 루프
import fs from "fs";
import path from "path";

const SR = 44100;
const outDir = path.join(process.cwd(), "public", "sfx");
fs.mkdirSync(outDir, { recursive: true });

function writeWav(name, samples) {
  const numSamples = samples.length;
  const buffer = Buffer.alloc(44 + numSamples * 2);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(SR, 24);
  buffer.writeUInt32LE(SR * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(numSamples * 2, 40);
  for (let i = 0; i < numSamples; i++) {
    let s = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE((s * 32767) | 0, 44 + i * 2);
  }
  fs.writeFileSync(path.join(outDir, name), buffer);
  console.log("wrote", name, (numSamples / SR).toFixed(2) + "s");
}

const env = (i, n, a, d) => {
  const t = i / n;
  if (t < a) return t / a;
  return Math.max(0, 1 - (t - a) / (1 - a) / (d / (1 - a)));
};

// pop: 짧고 높은 톡
function pop() {
  const n = Math.floor(SR * 0.12);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const f = 900 - (i / n) * 300;
    s[i] = Math.sin((2 * Math.PI * f * i) / SR) * env(i, n, 0.02, 1) * 0.5;
  }
  return s;
}

// boing: 통통 튀는 느낌 (주파수 흔들림)
function boing() {
  const n = Math.floor(SR * 0.3);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const f = 300 + Math.sin(t * 40) * 120 * Math.exp(-t * 6);
    s[i] = Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 5) * 0.5;
  }
  return s;
}

// ding: 맑은 종소리 (2배음)
function ding() {
  const n = Math.floor(SR * 0.5);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    s[i] =
      (Math.sin(2 * Math.PI * 1200 * t) * 0.6 + Math.sin(2 * Math.PI * 2400 * t) * 0.3) *
      Math.exp(-t * 4) *
      0.5;
  }
  return s;
}

// whoosh: 화이트노이즈 스윕
function whoosh() {
  const n = Math.floor(SR * 0.35);
  const s = new Float32Array(n);
  let last = 0;
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const noise = (Math.random() * 2 - 1);
    // 로우패스 흉내
    last = last * 0.9 + noise * 0.1;
    const amp = Math.sin(Math.PI * t) * 0.5;
    s[i] = last * amp;
  }
  return s;
}

// fail: 김빠지는 하강음
function fail() {
  const n = Math.floor(SR * 0.45);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const f = 400 - t * 500;
    s[i] = Math.sin(2 * Math.PI * Math.max(60, f) * t) * Math.exp(-t * 3) * 0.45;
  }
  return s;
}

// bgm: 박진감 있는 업템포 루프 (약 140 BPM) — 킥+하이햇+베이스+아르페지오
function bgm() {
  const dur = 8;
  const n = SR * dur;
  const s = new Float32Array(n);

  const BPM = 140;
  const spb = 60 / BPM; // 초/박 ≈ 0.4286
  const step = spb / 2; // 8분음표 단위(빠른 비트감)

  // 코드 진행(팝): C - G - Am - F, 2박씩
  const roots = [130.81, 98.0, 110.0, 87.31]; // C3 G2 A2 F2
  const arps = [
    [523.25, 659.25, 783.99], // C E G
    [493.88, 587.33, 783.99], // B D G
    [523.25, 659.25, 880.0], // C E A
    [523.25, 698.46, 880.0], // C F A
  ];

  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const beatIdx = Math.floor(t / spb);
    const chord = Math.floor(beatIdx / 2) % 4;

    // 로컬 위상들
    const stepIdx = Math.floor(t / step);
    const stepT = t - stepIdx * step;
    const beatT = t - beatIdx * spb;

    // 킥: 매 박 첫머리에 쿵
    const kickEnv = Math.exp(-beatT * 30);
    const kickF = 120 * Math.exp(-beatT * 30) + 45;
    const kick = Math.sin(2 * Math.PI * kickF * beatT) * kickEnv * 0.9;

    // 하이햇: 8분음표마다 치릭(노이즈)
    const hatEnv = Math.exp(-stepT * 90);
    const hat = (Math.random() * 2 - 1) * hatEnv * 0.18;

    // 베이스: 8분음표 펄스
    const bass = Math.sin(2 * Math.PI * roots[chord] * t) * Math.exp(-stepT * 6) * 0.35;

    // 아르페지오: 빠른 16분 느낌으로 코드톤 순환
    const a = arps[chord];
    const af = a[stepIdx % a.length];
    const arp =
      (Math.sin(2 * Math.PI * af * t) * 0.5 + Math.sin(2 * Math.PI * af * 2 * t) * 0.12) *
      Math.exp(-stepT * 7) *
      0.3;

    s[i] = (kick + hat + bass + arp) * 0.5; // 배경이라 전체를 절반으로
  }
  return s;
}

writeWav("pop.wav", pop());
writeWav("boing.wav", boing());
writeWav("ding.wav", ding());
writeWav("whoosh.wav", whoosh());
writeWav("fail.wav", fail());
writeWav("bgm.wav", bgm());
console.log("done");
