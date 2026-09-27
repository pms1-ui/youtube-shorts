// ============================================================
//  가상 "사진" 라이브러리 — 실사 대신 SVG로 그린 육아 장면들
//  실제 제작 시 이 부분을 <Img src={staticFile("photo.jpg")} /> 로 교체하면 됨
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";

// 공통 팔레트
const C = {
  wall: "#e9e5df",
  wallDark: "#d9d3ca",
  floor: "#f4f0ea",
  floorLine: "#e2dcd2",
  skin: "#f6c9a8",
  skinDark: "#e8b493",
  hair: "#3b2c24",
  dadHair: "#2b2b2b",
  shirtKid: "#ffd3a6",
  pantsKid: "#8fb8d6",
  dadShirt: "#2f3a45",
  dadPants: "#c9c2b8",
  tent: "#f2e2c4",
  tentMesh: "#ffffff",
  slide: "#f3a5a0",
  slideStep: "#8ec6b0",
  window: "#aac4d8",
  windowDark: "#7f9db4",
};

// ── 재사용 파츠 ────────────────────────────────────────────

const RoomBackground: React.FC<{ dim?: boolean }> = ({ dim }) => (
  <>
    <rect x={0} y={0} width={1000} height={1000} fill={dim ? C.wallDark : C.wall} />
    {/* 바닥 */}
    <rect x={0} y={640} width={1000} height={360} fill={C.floor} />
    {[700, 780, 860, 940].map((y) => (
      <line key={y} x1={0} y1={y} x2={1000} y2={y} stroke={C.floorLine} strokeWidth={3} />
    ))}
    {/* 걸레받이 */}
    <rect x={0} y={628} width={1000} height={16} fill={C.wallDark} />
  </>
);

const Kid: React.FC<{
  x: number;
  y: number;
  scale?: number;
  pose?: "stand" | "sit" | "climb" | "sleep" | "cheer";
  flip?: boolean;
}> = ({ x, y, scale = 1, pose = "stand", flip = false }) => {
  return (
    <g transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * scale} ${scale})`}>
      {pose === "sleep" ? (
        <>
          {/* 누운 아이 */}
          <ellipse cx={0} cy={20} rx={90} ry={34} fill={C.pantsKid} />
          <rect x={-70} y={-6} width={90} height={44} rx={20} fill={C.shirtKid} />
          <circle cx={-92} cy={4} r={30} fill={C.skin} />
          <path d="M-120 -14 q28 -22 56 -2" fill="none" stroke={C.hair} strokeWidth={16} strokeLinecap="round" />
        </>
      ) : pose === "climb" ? (
        <>
          {/* 기어오르는 아이 (엎드린 대각선) */}
          <g transform="rotate(-32)">
            <rect x={-24} y={-10} width={54} height={70} rx={22} fill={C.shirtKid} />
            <circle cx={2} cy={-34} r={30} fill={C.skin} />
            <path d="M-24 -50 q26 -20 52 0" fill="none" stroke={C.hair} strokeWidth={16} strokeLinecap="round" />
            {/* 팔 위로 */}
            <rect x={16} y={-52} width={16} height={44} rx={8} fill={C.skin} transform="rotate(24 24 -30)" />
            {/* 다리 */}
            <rect x={-20} y={54} width={16} height={40} rx={8} fill={C.pantsKid} />
            <rect x={6} y={54} width={16} height={40} rx={8} fill={C.pantsKid} />
          </g>
        </>
      ) : (
        <>
          {/* 다리 */}
          <rect x={-26} y={70} width={20} height={54} rx={9} fill={C.pantsKid} />
          <rect x={6} y={70} width={20} height={54} rx={9} fill={C.pantsKid} />
          {/* 몸통 */}
          <rect x={-34} y={8} width={68} height={78} rx={26} fill={C.shirtKid} />
          {/* 팔 */}
          {pose === "cheer" ? (
            <>
              <rect x={-52} y={-24} width={16} height={54} rx={8} fill={C.skin} transform="rotate(-32 -44 0)" />
              <rect x={38} y={-24} width={16} height={54} rx={8} fill={C.skin} transform="rotate(32 46 0)" />
            </>
          ) : (
            <>
              <rect x={-48} y={16} width={16} height={50} rx={8} fill={C.skin} />
              <rect x={34} y={16} width={16} height={50} rx={8} fill={C.skin} />
            </>
          )}
          {/* 머리 */}
          <circle cx={0} cy={-30} r={38} fill={C.skin} />
          <path d="M-38 -44 q38 -40 76 0 q0 -34 -38 -34 q-38 0 -38 34" fill={C.hair} />
          {/* 눈 */}
          <circle cx={-13} cy={-30} r={4.5} fill="#3a2b22" />
          <circle cx={13} cy={-30} r={4.5} fill="#3a2b22" />
          {pose === "cheer" && (
            <path d="M-12 -16 q12 12 24 0" fill="none" stroke="#3a2b22" strokeWidth={4} strokeLinecap="round" />
          )}
        </>
      )}
    </g>
  );
};

const Dad: React.FC<{ x: number; y: number; scale?: number; pose?: "kneel" | "stand" }> = ({
  x,
  y,
  scale = 1,
  pose = "kneel",
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {pose === "kneel" ? (
      <>
        {/* 무릎 꿇은 아빠(뒷모습) */}
        <ellipse cx={0} cy={96} rx={92} ry={34} fill={C.dadPants} />
        <rect x={-64} y={-34} width={128} height={120} rx={40} fill={C.dadShirt} />
        <circle cx={0} cy={-70} r={46} fill={C.dadHair} />
      </>
    ) : (
      <>
        <rect x={-24} y={70} width={22} height={90} rx={10} fill={C.dadPants} />
        <rect x={4} y={70} width={22} height={90} rx={10} fill={C.dadPants} />
        <rect x={-44} y={-30} width={90} height={110} rx={30} fill={C.dadShirt} />
        <circle cx={0} cy={-64} r={42} fill={C.dadHair} />
      </>
    )}
  </g>
);

const Tent: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-190 60 Q0 -230 190 60 Z" fill={C.tentMesh} opacity={0.55} stroke={C.tent} strokeWidth={10} />
    <path d="M-190 60 Q0 -230 190 60" fill="none" stroke={C.tent} strokeWidth={14} />
    {/* 메쉬 격자 */}
    {[-120, -60, 0, 60, 120].map((mx) => (
      <line key={mx} x1={mx} y1={-40} x2={mx} y2={60} stroke="#ffffff" strokeWidth={2} opacity={0.7} />
    ))}
  </g>
);

const Slide: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* 미끄럼틀 경사 */}
    <path d="M-30 -160 L60 40 L-20 40 L-90 -120 Z" fill={C.slide} />
    {/* 계단 */}
    <rect x={-150} y={-40} width={70} height={80} fill={C.slideStep} rx={6} />
    <rect x={-150} y={-120} width={70} height={40} fill={C.slideStep} rx={6} />
    <rect x={-150} y={-170} width={70} height={40} fill={C.slideStep} rx={6} />
    {/* 손잡이 */}
    <rect x={-40} y={-180} width={12} height={70} rx={6} fill="#e58b86" />
  </g>
);

const RainWindow: React.FC = () => (
  <>
    <rect x={0} y={0} width={1000} height={1000} fill={C.wall} />
    <rect x={140} y={120} width={720} height={640} rx={12} fill={C.window} stroke="#c9c1b4" strokeWidth={18} />
    <line x1={500} y1={120} x2={500} y2={760} stroke="#c9c1b4" strokeWidth={16} />
    <line x1={140} y1={440} x2={860} y2={440} stroke="#c9c1b4" strokeWidth={16} />
    {/* 빗줄기 */}
    {Array.from({ length: 40 }).map((_, i) => {
      const rx = 170 + ((i * 71) % 660);
      const ry = 150 + ((i * 137) % 560);
      return <line key={i} x1={rx} y1={ry} x2={rx - 16} y2={ry + 42} stroke={C.windowDark} strokeWidth={4} opacity={0.6} />;
    })}
    <rect x={140} y={760} width={720} height={30} fill="#c9c1b4" />
  </>
);

// ── 사진 정의 ──────────────────────────────────────────────
// viewBox 1000x1000, 미디어 박스에 object-fit: cover 로 들어감

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  // 미디어 박스(1080x980, 세로가 더 긺)를 꽉 채우도록 slice.
  // 피사체가 하단부에 몰려 있으므로 아래를 기준(YMax)으로 잡아 바닥이 잘리지 않게 함.
  <svg viewBox="150 250 700 700" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
    {children}
  </svg>
);

export const PHOTOS: Record<string, React.FC> = {
  rainyWindow: () => (
    <Frame>
      <RainWindow />
    </Frame>
  ),
  kidAtWindow: () => (
    <Frame>
      <rect x={0} y={0} width={1000} height={1000} fill={C.wall} />
      <rect x={160} y={80} width={680} height={620} rx={12} fill={C.window} stroke="#c9c1b4" strokeWidth={18} />
      <line x1={500} y1={80} x2={500} y2={700} stroke="#c9c1b4" strokeWidth={14} />
      {Array.from({ length: 24 }).map((_, i) => {
        const rx = 200 + ((i * 61) % 600);
        const ry = 120 + ((i * 129) % 520);
        return <line key={i} x1={rx} y1={ry} x2={rx - 12} y2={ry + 34} stroke={C.windowDark} strokeWidth={3} opacity={0.5} />;
      })}
      <rect x={0} y={700} width={1000} height={300} fill={C.floor} />
      <Kid x={500} y={620} scale={2.1} pose="stand" />
    </Frame>
  ),
  messyRoom: () => (
    <Frame>
      <RoomBackground />
      {/* 어질러진 장난감 */}
      {[
        [180, 720, "#f2a5a0"],
        [320, 770, "#8ec6b0"],
        [470, 700, "#f6d27a"],
        [610, 780, "#9db8e0"],
        [760, 720, "#c9a0e0"],
        [250, 830, "#f6d27a"],
        [560, 840, "#f2a5a0"],
        [700, 860, "#8ec6b0"],
      ].map(([cx, cy, col], i) => (
        <circle key={i} cx={cx as number} cy={cy as number} r={26} fill={col as string} />
      ))}
      <rect x={380} y={800} width={90} height={60} rx={8} fill="#e0b0d8" transform="rotate(12 420 830)" />
      <Kid x={620} y={560} scale={2} pose="cheer" />
    </Frame>
  ),
  livingPlayground: () => (
    <Frame>
      <RoomBackground />
      <Tent x={340} y={520} s={1.15} />
      <Slide x={720} y={560} s={1.1} />
      <Kid x={340} y={600} scale={1.5} pose="stand" />
    </Frame>
  ),
  slideDown: () => (
    <Frame>
      <RoomBackground />
      <Slide x={520} y={560} s={1.4} />
      <Kid x={600} y={470} scale={1.6} pose="sit" />
    </Frame>
  ),
  climbUp: () => (
    <Frame>
      <RoomBackground />
      <Slide x={520} y={560} s={1.4} />
      <Kid x={470} y={520} scale={1.7} pose="climb" />
    </Frame>
  ),
  slipFall: () => (
    <Frame>
      <RoomBackground />
      <Slide x={520} y={560} s={1.4} />
      <Kid x={430} y={640} scale={1.6} pose="climb" flip />
      {/* 움직임 선 */}
      <path d="M300 520 q30 30 -10 60" fill="none" stroke="#b7ada0" strokeWidth={6} strokeLinecap="round" />
      <path d="M340 500 q30 30 -10 60" fill="none" stroke="#b7ada0" strokeWidth={6} strokeLinecap="round" />
    </Frame>
  ),
  barefoot: () => (
    <Frame>
      <RoomBackground />
      <Slide x={540} y={560} s={1.4} />
      <Kid x={470} y={510} scale={1.7} pose="climb" />
      {/* 벗어던진 양말 */}
      <ellipse cx={230} cy={800} rx={40} ry={20} fill="#ffffff" stroke="#ddd" strokeWidth={3} transform="rotate(-18 230 800)" />
      <ellipse cx={300} cy={860} rx={40} ry={20} fill="#ffffff" stroke="#ddd" strokeWidth={3} transform="rotate(14 300 860)" />
    </Frame>
  ),
  cushionStairs: () => (
    <Frame>
      <RoomBackground />
      <Slide x={620} y={560} s={1.3} />
      {/* 쿠션 계단 */}
      <rect x={200} y={720} width={160} height={90} rx={16} fill="#d9c2a8" />
      <rect x={300} y={640} width={150} height={90} rx={16} fill="#c9a98a" />
      <rect x={390} y={560} width={140} height={90} rx={16} fill="#d9c2a8" />
      <Kid x={360} y={520} scale={1.5} pose="climb" />
    </Frame>
  ),
  victory: () => (
    <Frame>
      <RoomBackground />
      <Slide x={520} y={560} s={1.5} />
      <Kid x={470} y={330} scale={1.8} pose="cheer" />
      {/* 반짝임 */}
      {[[300, 300], [720, 260], [640, 420]].map(([sx, sy], i) => (
        <g key={i} transform={`translate(${sx} ${sy})`}>
          <path d="M0 -22 L6 -6 L22 0 L6 6 L0 22 L-6 6 L-22 0 L-6 -6 Z" fill="#f6d27a" />
        </g>
      ))}
    </Frame>
  ),
  repeat: () => (
    <Frame>
      <RoomBackground />
      <Slide x={540} y={560} s={1.4} />
      <Kid x={470} y={470} scale={1.6} pose="climb" />
      {/* 반복 화살표 */}
      <path d="M700 300 a90 90 0 1 1 -20 -70" fill="none" stroke="#9db8e0" strokeWidth={12} strokeLinecap="round" />
      <path d="M680 220 l0 40 l40 -8 Z" fill="#9db8e0" />
    </Frame>
  ),
  sleeping: () => (
    <Frame>
      <RoomBackground dim />
      <Tent x={500} y={560} s={1.4} />
      <Kid x={500} y={640} scale={1.5} pose="sleep" />
      {/* Zzz */}
      <text x={640} y={430} fontSize={70} fill="#8a8078" fontWeight={800}>
        z
      </text>
      <text x={700} y={380} fontSize={54} fill="#8a8078" fontWeight={800}>
        z
      </text>
    </Frame>
  ),
  dadCleaning: () => (
    <Frame>
      <RoomBackground dim />
      <Tent x={560} y={540} s={1.1} />
      <Slide x={780} y={560} s={0.9} />
      {/* 흩어진 쿠션/장난감 */}
      {[[200, 780, "#d9c2a8"], [300, 850, "#f2a5a0"], [420, 810, "#8ec6b0"]].map(([cx, cy, col], i) => (
        <rect key={i} x={cx as number} y={cy as number} width={70} height={44} rx={10} fill={col as string} />
      ))}
      <Dad x={360} y={540} scale={1.2} pose="kneel" />
    </Frame>
  ),
};
