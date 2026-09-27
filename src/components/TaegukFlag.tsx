// ============================================================
//  태극기 SVG — 대환장민국 채널 장식용
//  정확한 태극 문양 + 4괘(건곤감리)를 벡터로 그림
// ============================================================
import React from "react";

// 4괘: 막대(양=긴 하나, 음=짧은 둘) 배열. 위→아래 3줄.
const Trigram: React.FC<{ bars: boolean[]; angle: number; cx: number; cy: number }> = ({
  bars,
  angle,
  cx,
  cy,
}) => {
  const barW = 44;
  const barH = 7;
  const gap = 5;
  const split = 6; // 음(끊긴 막대) 사이 틈 절반
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${angle})`}>
      {bars.map((yang, i) => {
        const y = (i - 1) * (barH + gap) - barH / 2;
        if (yang) {
          return <rect key={i} x={-barW / 2} y={y} width={barW} height={barH} fill="#000" />;
        }
        const half = barW / 2 - split;
        return (
          <g key={i}>
            <rect x={-barW / 2} y={y} width={half} height={barH} fill="#000" />
            <rect x={split} y={y} width={half} height={barH} fill="#000" />
          </g>
        );
      })}
    </g>
  );
};

/** 태극기 (viewBox 300x200, 표준 비율 3:2) */
export const TaegukFlag: React.FC<{ width?: number }> = ({ width = 90 }) => {
  const W = 300;
  const H = 200;
  const cx = W / 2;
  const cy = H / 2;
  const r = 50; // 태극원 반지름

  return (
    <svg width={width} height={(width * H) / W} viewBox={`0 0 ${W} ${H}`}>
      {/* 흰 바탕 */}
      <rect x={0} y={0} width={W} height={H} fill="#ffffff" />

      {/* 태극: 위 빨강 / 아래 파랑 + 물결 */}
      <g transform={`translate(${cx} ${cy}) rotate(33)`}>
        {/* 전체 원 빨강 */}
        <circle cx={0} cy={0} r={r} fill="#CD2E3A" />
        {/* 아래 반원 파랑 */}
        <path d={`M ${-r} 0 A ${r} ${r} 0 0 0 ${r} 0 Z`} fill="#0047A0" />
        {/* 물결: 위쪽 반원엔 파란 작은원, 아래쪽엔 빨간 작은원 */}
        <circle cx={-r / 2} cy={0} r={r / 2} fill="#CD2E3A" />
        <circle cx={r / 2} cy={0} r={r / 2} fill="#0047A0" />
      </g>

      {/* 4괘 (건: 좌상, 리: 우상, 감: 좌하, 곤: 우하) */}
      {/* 건 ☰ (양양양) */}
      <Trigram bars={[true, true, true]} angle={-56} cx={64} cy={44} />
      {/* 리 ☲ (양·음·양) */}
      <Trigram bars={[true, false, true]} angle={56} cx={236} cy={44} />
      {/* 감 ☵ (음·양·음) */}
      <Trigram bars={[false, true, false]} angle={-124} cx={64} cy={156} />
      {/* 곤 ☷ (음음음) */}
      <Trigram bars={[false, false, false]} angle={124} cx={236} cy={156} />
    </svg>
  );
};
