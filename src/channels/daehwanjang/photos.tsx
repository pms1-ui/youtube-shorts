// ============================================================
//  대환장민국 전용 "사진" — 시사/인구 주제 SVG (육아 photos와 별개)
//  실제 제작 시 이 부분을 실사 자료화면/그래프 이미지로 교체하면 됨
// ============================================================
import React from "react";

const C = {
  bg: "#eef1f6",
  bgDark: "#dde3ee",
  navy: "#0e2a5e",
  navyLight: "#3a5a97",
  red: "#CD2E3A",
  blue: "#0047A0",
  gray: "#9aa4b5",
  grayLight: "#c4ccd9",
  ink: "#1c2333",
  paper: "#ffffff",
};

const Frame: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg = C.bg }) => (
  <svg viewBox="0 0 1000 1000" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
    <rect x={0} y={0} width={1000} height={1000} fill={bg} />
    {children}
  </svg>
);

// 큰 숫자 강조 (예: 0.72)
const BigStat: React.FC<{ value: string; label: string; color?: string }> = ({
  value,
  label,
  color = C.red,
}) => (
  <>
    <text
      x={500}
      y={470}
      textAnchor="middle"
      fontFamily="'Pretendard','Malgun Gothic',sans-serif"
      fontWeight={900}
      fontSize={300}
      fill={color}
    >
      {value}
    </text>
    <text
      x={500}
      y={620}
      textAnchor="middle"
      fontFamily="'Pretendard','Malgun Gothic',sans-serif"
      fontWeight={700}
      fontSize={64}
      fill={C.ink}
    >
      {label}
    </text>
  </>
);

export const DH_PHOTOS: Record<string, React.FC> = {
  // 출산율 0.72 대문짝 통계
  birthRate: () => (
    <Frame bg={C.paper}>
      <BigStat value="0.72" label="합계출산율 (명)" color={C.red} />
      <text x={500} y={720} textAnchor="middle" fontFamily="sans-serif" fontSize={44} fill={C.gray}>
        OECD 꼴찌 · 세계 최저
      </text>
    </Frame>
  ),

  // 우하향 꺾은선 그래프 (출생아 수 급감)
  downTrend: () => (
    <Frame bg={C.paper}>
      {/* 축 */}
      <line x1={140} y1={200} x2={140} y2={780} stroke={C.grayLight} strokeWidth={6} />
      <line x1={140} y1={780} x2={880} y2={780} stroke={C.grayLight} strokeWidth={6} />
      {/* 급락 라인 */}
      <polyline
        points="160,280 320,360 480,470 640,610 820,720"
        fill="none"
        stroke={C.red}
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [160, 280],
        [320, 360],
        [480, 470],
        [640, 610],
        [820, 720],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={14} fill={C.navy} />
      ))}
      <text x={510} y={880} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={50} fill={C.ink}>
        연간 출생아 수 추락
      </text>
    </Frame>
  ),

  // 텅 빈 교실 (책상만 남고 학생 없음)
  emptyClassroom: () => (
    <Frame>
      {/* 칠판 */}
      <rect x={120} y={120} width={760} height={240} rx={12} fill="#2f4a3a" />
      <rect x={120} y={120} width={760} height={240} rx={12} fill="none" stroke="#c9a97a" strokeWidth={12} />
      {/* 빈 책상들 */}
      {[
        [230, 560],
        [430, 560],
        [630, 560],
        [300, 760],
        [520, 760],
        [720, 760],
      ].map(([x, y], i) => (
        <g key={i} opacity={i % 3 === 0 ? 0.35 : 0.9}>
          <rect x={x - 60} y={y} width={120} height={16} rx={4} fill={C.navyLight} />
          <rect x={x - 54} y={y + 16} width={12} height={70} fill={C.gray} />
          <rect x={x + 42} y={y + 16} width={12} height={70} fill={C.gray} />
        </g>
      ))}
      <text x={500} y={470} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={70} fill="#e8e2d0">
        폐교 예정
      </text>
    </Frame>
  ),

  // 지방 소멸 지도 (반쯤 사라지는 국토)
  regionCollapse: () => (
    <Frame bg={C.paper}>
      {/* 한반도 느낌의 단순 도형 */}
      <path
        d="M470 180 q80 40 60 140 q40 20 30 110 q30 40 -10 120 q-20 90 -80 150 q-70 60 -120 20 q-30 -60 20 -110 q-60 -40 -30 -120 q-40 -60 10 -130 q30 -80 100 -150 q40 -40 90 -30 Z"
        fill={C.navyLight}
        opacity={0.25}
      />
      {/* 소멸 위험 점(빨강)들 */}
      {[
        [420, 640],
        [470, 720],
        [520, 560],
        [380, 560],
        [560, 660],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={26} fill={C.red} opacity={0.8} />
      ))}
      <text x={500} y={880} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={48} fill={C.ink}>
        소멸위험 시군구 확산
      </text>
    </Frame>
  ),

  // 역삼각형 인구구조 (노인 많고 아이 적음)
  invertedPyramid: () => (
    <Frame bg={C.paper}>
      {[
        { w: 620, y: 200, fill: C.gray, label: "노년" },
        { w: 440, y: 360, fill: C.navyLight, label: "" },
        { w: 280, y: 520, fill: C.blue, label: "" },
        { w: 130, y: 680, fill: C.red, label: "유소년" },
      ].map((b, i) => (
        <rect key={i} x={500 - b.w / 2} y={b.y} width={b.w} height={120} rx={10} fill={b.fill} />
      ))}
      <text x={500} y={900} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={48} fill={C.ink}>
        뒤집힌 인구 피라미드
      </text>
    </Frame>
  ),

  // 부양 부담 (한 청년이 여러 노인을 짊어짐)
  burden: () => (
    <Frame>
      {/* 청년 1명 */}
      <circle cx={500} cy={620} r={70} fill={C.blue} />
      <rect x={440} y={690} width={120} height={160} rx={40} fill={C.blue} />
      {/* 어깨 위 노인들(원) */}
      {[
        [380, 320],
        [500, 260],
        [620, 320],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={56} fill={C.gray} />
      ))}
      <text x={500} y={880} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={46} fill={C.ink}>
        청년 1명이 짊어질 무게
      </text>
    </Frame>
  ),

  // 연금 고갈 (텅 비어가는 저금통)
  pensionEmpty: () => (
    <Frame bg={C.paper}>
      <ellipse cx={500} cy={520} rx={230} ry={200} fill={C.navyLight} opacity={0.25} />
      <ellipse cx={500} cy={520} rx={230} ry={200} fill="none" stroke={C.navy} strokeWidth={12} />
      {/* 바닥에 동전 몇 개만 */}
      {[
        [440, 650],
        [510, 665],
        [575, 645],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={22} fill="#e8b93b" />
      ))}
      <text x={500} y={520} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={90} fill={C.red}>
        고갈
      </text>
      <text x={500} y={860} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={46} fill={C.ink}>
        국민연금 소진 시계
      </text>
    </Frame>
  ),

  // 표류하는 대책 (물음표)
  driftingPolicy: () => (
    <Frame>
      <text x={500} y={560} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={360} fill={C.grayLight}>
        ?
      </text>
      <text x={500} y={760} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={50} fill={C.ink}>
        저출산 예산 수백조, 그런데…
      </text>
    </Frame>
  ),

  // 각자도생 냉소 마무리
  everyoneAlone: () => (
    <Frame bg={C.navy}>
      {/* 흩어진 사람들(점) */}
      {[
        [220, 380],
        [780, 320],
        [340, 680],
        [700, 720],
        [500, 500],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={30} fill="#dbe4f5" opacity={0.7} />
      ))}
      <text x={500} y={540} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={92} fill="#ffffff">
        각자도생
      </text>
    </Frame>
  ),

  // ============================================================
  //  빈부격차 주제 (가상 통계 · 순수 창작 예시값)
  // ============================================================

  // 지니계수 상승 (불평등 심화 게이지)
  giniGauge: () => (
    <Frame bg={C.paper}>
      <BigStat value="0.41" label="가처분소득 지니계수" color={C.red} />
      {/* 하단 게이지 바 */}
      <rect x={180} y={730} width={640} height={40} rx={20} fill={C.grayLight} />
      <rect x={180} y={730} width={520} height={40} rx={20} fill={C.red} />
      <text x={500} y={840} textAnchor="middle" fontFamily="sans-serif" fontSize={44} fill={C.gray}>
        1에 가까울수록 불평등
      </text>
    </Frame>
  ),

  // 상위 10%가 부의 대부분 차지 (도넛)
  wealthShare: () => (
    <Frame bg={C.paper}>
      {/* 도넛: 상위10% 큰 조각(빨강) + 나머지(회색) */}
      <g transform="translate(500,470)">
        <circle r={230} fill="none" stroke={C.grayLight} strokeWidth={120} />
        {/* 66% 빨강 호 (stroke-dasharray로 표현) */}
        <circle
          r={230}
          fill="none"
          stroke={C.red}
          strokeWidth={120}
          strokeDasharray={`${2 * Math.PI * 230 * 0.66} ${2 * Math.PI * 230}`}
          transform="rotate(-90)"
        />
      </g>
      <text x={500} y={455} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={120} fill={C.ink}>
        66%
      </text>
      <text x={500} y={545} textAnchor="middle" fontFamily="sans-serif" fontSize={44} fill={C.gray}>
        상위 10% 순자산 점유
      </text>
      <text x={500} y={840} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={50} fill={C.ink}>
        부의 쏠림
      </text>
    </Frame>
  ),

  // 벌어지는 격차 (두 막대: 상위/하위 소득)
  incomeGap: () => (
    <Frame bg={C.paper}>
      <line x1={140} y1={800} x2={880} y2={800} stroke={C.grayLight} strokeWidth={6} />
      {/* 상위 20% */}
      <rect x={250} y={220} width={180} height={580} rx={10} fill={C.navy} />
      <text x={340} y={190} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={54} fill={C.navy}>
        상위 20%
      </text>
      {/* 하위 20% */}
      <rect x={590} y={620} width={180} height={180} rx={10} fill={C.red} />
      <text x={680} y={590} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={54} fill={C.red}>
        하위 20%
      </text>
      <text x={500} y={890} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={46} fill={C.ink}>
        소득 5분위 배율 확대
      </text>
    </Frame>
  ),

  // 사다리 걷어차임 (부러진 계층 이동 사다리)
  brokenLadder: () => (
    <Frame bg={C.paper}>
      {/* 사다리 두 기둥 */}
      <rect x={420} y={180} width={22} height={640} fill={C.navyLight} />
      <rect x={560} y={180} width={22} height={640} fill={C.navyLight} />
      {/* 가로대 — 위쪽 몇 개는 부러짐(끊김) */}
      {[260, 360, 460, 560, 660, 760].map((y, i) => {
        const broken = i < 2;
        return broken ? (
          <g key={i}>
            <rect x={420} y={y} width={70} height={20} fill={C.red} />
            <rect x={512} y={y} width={70} height={20} fill={C.red} />
          </g>
        ) : (
          <rect key={i} x={420} y={y} width={162} height={20} fill={C.gray} />
        );
      })}
      <text x={500} y={890} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={48} fill={C.ink}>
        끊긴 계층 이동 사다리
      </text>
    </Frame>
  ),

  // 부동산 양극화 (고층 타워 vs 낮은 집)
  housingDivide: () => (
    <Frame bg={C.bg}>
      {/* 고층 타워 */}
      <rect x={240} y={200} width={200} height={600} fill={C.navy} />
      {Array.from({ length: 10 }).flatMap((_, r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}-${c}`} x={268 + c * 52} y={230 + r * 55} width={34} height={34} fill="#ffd54a" />
        ))
      )}
      {/* 낮은 집 */}
      <rect x={600} y={640} width={200} height={160} fill={C.grayLight} />
      <path d="M590 640 L700 560 L810 640 Z" fill={C.gray} />
      <text x={500} y={880} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={48} fill={C.ink}>
        집이 가른 자산 격차
      </text>
    </Frame>
  ),

  // 빚으로 버티는 청년 (빚더미에 눌린 사람)
  youngDebt: () => (
    <Frame bg={C.paper}>
      {/* 사람 */}
      <circle cx={500} cy={640} r={64} fill={C.blue} />
      <rect x={444} y={704} width={112} height={130} rx={36} fill={C.blue} />
      {/* 머리 위 빚 블록 더미 */}
      {[
        [420, 360, 160],
        [500, 300, 200],
        [430, 250, 150],
      ].map(([x, y, w], i) => (
        <rect key={i} x={x - (w as number) / 2 + 60} y={y} width={w as number} height={54} rx={8} fill={C.red} opacity={0.85} />
      ))}
      <text x={500} y={300} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={60} fill="#ffffff">
        빚
      </text>
      <text x={500} y={900} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={46} fill={C.ink}>
        청년 가계부채 급증
      </text>
    </Frame>
  ),

  // 텅 빈 지갑 (하위층 살림)
  emptyWallet: () => (
    <Frame bg={C.paper}>
      <rect x={300} y={380} width={400} height={260} rx={30} fill={C.navyLight} />
      <rect x={300} y={440} width={400} height={70} fill={C.navy} />
      <circle cx={620} cy={475} r={26} fill="#ffd54a" />
      {/* 나방 한 마리(텅 빔 상징) */}
      <text x={430} y={560} textAnchor="middle" fontFamily="sans-serif" fontSize={70} fill="#ffffff">
        ₩
      </text>
      <text x={500} y={760} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={70} fill={C.red}>
        텅
      </text>
      <text x={500} y={860} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={46} fill={C.ink}>
        실질임금은 제자리
      </text>
    </Frame>
  ),

  // 저울 (기울어진 운동장)
  tiltedScale: () => (
    <Frame bg={C.paper}>
      {/* 받침 */}
      <rect x={480} y={520} width={40} height={300} fill={C.gray} />
      {/* 기울어진 저울대 */}
      <g transform="rotate(-14 500 520)">
        <rect x={200} y={505} width={600} height={26} rx={12} fill={C.navy} />
        {/* 무거운 쪽(부) */}
        <circle cx={250} cy={470} r={70} fill={C.red} />
        {/* 가벼운 쪽(빈) */}
        <circle cx={760} cy={470} r={40} fill={C.navyLight} />
      </g>
      <text x={500} y={900} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={48} fill={C.ink}>
        기울어진 운동장
      </text>
    </Frame>
  ),

  // 상식·법치 회복 마무리 (양팔 균형 저울 + 국기색 포인트)
  fairnessCall: () => (
    <Frame bg={C.navy}>
      {/* 균형 저울 실루엣 */}
      <rect x={490} y={360} width={20} height={340} fill="#dbe4f5" />
      <rect x={300} y={352} width={400} height={16} rx={8} fill="#dbe4f5" />
      <circle cx={330} cy={420} r={48} fill={C.red} opacity={0.9} />
      <circle cx={670} cy={420} r={48} fill={C.blue} opacity={0.9} />
      <text x={500} y={800} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={80} fill="#ffffff">
        공정과 상식
      </text>
    </Frame>
  ),

  // ============================================================
  //  "중세로 회귀중인 대한민국" 편 전용 (가상 창작 예시)
  // ============================================================

  // 정권 시즌 집값 상승률 비교 (문재인 → 이재명, 뒤가 더 높음)
  regimeCompare: () => (
    <Frame bg={C.paper}>
      <line x1={140} y1={800} x2={880} y2={800} stroke={C.grayLight} strokeWidth={6} />
      {/* 앞 시즌 */}
      <rect x={250} y={470} width={180} height={330} rx={8} fill={C.navyLight} />
      <text x={340} y={440} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={46} fill={C.navyLight}>
        지난 시즌
      </text>
      {/* 이번 시즌(더 높음, 빨강) */}
      <rect x={590} y={300} width={180} height={500} rx={8} fill={C.red} />
      <text x={680} y={270} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={46} fill={C.red}>
        이번 시즌
      </text>
      {/* 화살표 위로 */}
      <text x={680} y={210} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={70} fill={C.red}>
        ↑
      </text>
      <text x={500} y={880} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={44} fill={C.ink}>
        집값 상승률 추월
      </text>
    </Frame>
  ),

  // 상위 1%가 순자산 절반 (도넛, 얇은 조각이 절반 차지)
  top1Half: () => (
    <Frame bg={C.paper}>
      <g transform="translate(500,460)">
        <circle r={220} fill="none" stroke={C.grayLight} strokeWidth={130} />
        <circle
          r={220}
          fill="none"
          stroke={C.red}
          strokeWidth={130}
          strokeDasharray={`${2 * Math.PI * 220 * 0.5} ${2 * Math.PI * 220}`}
          transform="rotate(-90)"
        />
      </g>
      <text x={500} y={445} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={120} fill={C.ink}>
        50%
      </text>
      <text x={500} y={535} textAnchor="middle" fontFamily="sans-serif" fontSize={42} fill={C.gray}>
        상위 1%가 차지
      </text>
      <text x={500} y={850} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={46} fill={C.ink}>
        순자산 쏠림 극단화
      </text>
    </Frame>
  ),

  // 급여 격차 10배 (사람 크기 대비: 큰 사람 vs 작은 사람)
  wageGap10x: () => (
    <Frame bg={C.paper}>
      {/* 상위: 큰 사람 */}
      <circle cx={320} cy={330} r={80} fill={C.navy} />
      <rect x={250} y={410} width={140} height={330} rx={40} fill={C.navy} />
      <text x={320} y={800} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={48} fill={C.navy}>
        상위 10%
      </text>
      {/* 하위: 작은 사람 (약 1/10 느낌) */}
      <circle cx={720} cy={620} r={34} fill={C.red} />
      <rect x={690} y={654} width={60} height={90} rx={18} fill={C.red} />
      <text x={720} y={800} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={48} fill={C.red}>
        하위 10%
      </text>
      {/* X10 강조 */}
      <text x={510} y={300} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={110} fill={C.ink}>
        ×10
      </text>
      <text x={500} y={890} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={44} fill={C.ink}>
        급여 10배 격차
      </text>
    </Frame>
  ),

  // 서울 요새화 (성벽으로 안/밖이 갈린 도시)
  seoulFortress: () => (
    <Frame bg="#1a1f2e">
      {/* 성벽 안(밝고 높은 타워들) */}
      <rect x={0} y={0} width={520} height={1000} fill="#e9edf5" />
      {[
        [90, 520, 320],
        [200, 480, 360],
        [320, 440, 400],
        [420, 560, 280],
      ].map(([x, y, h], i) => (
        <rect key={i} x={x} y={y} width={70} height={h as number} fill={C.navy} />
      ))}
      {/* 성벽 */}
      <rect x={500} y={200} width={40} height={800} fill="#7a5c3a" />
      {[220, 260, 300].map((y) => (
        <rect key={y} x={492} y={y} width={56} height={22} fill="#7a5c3a" />
      ))}
      {/* 성벽 밖(어둡고 낮은 집들) */}
      {[
        [600, 780],
        [700, 800],
        [800, 770],
        [900, 800],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={70} height={120} fill="#3a4258" />
          <path d={`M${x - 8} ${y} L${x + 35} ${y - 40} L${x + 78} ${y} Z`} fill="#2c3346" />
        </g>
      ))}
      <text x={250} y={930} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={44} fill={C.navy}>
        성 안
      </text>
      <text x={760} y={930} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={44} fill="#dbe4f5">
        성 밖
      </text>
    </Frame>
  ),

  // 더 벌어질 예정 (격차 화살표가 양쪽으로 벌어짐)
  wideningAhead: () => (
    <Frame bg={C.navy}>
      <text x={500} y={430} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={150} fill="#ffffff">
        ↔
      </text>
      <text x={500} y={560} textAnchor="middle" fontFamily="sans-serif" fontWeight={900} fontSize={72} fill="#ff6b6b">
        더 벌어질 예정
      </text>
      <text x={500} y={660} textAnchor="middle" fontFamily="sans-serif" fontSize={44} fill="#dbe4f5">
        격차는 확대 중
      </text>
    </Frame>
  ),
};
