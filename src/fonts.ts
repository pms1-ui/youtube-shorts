// ============================================================
//  폰트 로더 (Remotion 렌더 전에 로드 보장)
//   · 타이틀(헤드라인): 에스코어 드림 9 Black — public/fonts/SCDream9.otf (로컬)
//   · 자막: Pretendard Bold(700) — 공식 jsDelivr CDN (OFL 라이선스)
//
//  FontFace API로 등록하고, delayRender/continueRender로
//  폰트 로딩이 끝날 때까지 렌더를 지연시킨다.
//  (헤드리스 크롬에서도 폰트가 실제로 찍히도록)
// ============================================================
import { continueRender, delayRender, staticFile } from "remotion";

/** 컴포넌트 style에서 쓸 font-family 값 */
export const TITLE_FONT = "'SCDream9', 'Malgun Gothic', sans-serif"; // 에스코어드림 9 Black
export const BODY_FONT = "'Pretendard', 'Malgun Gothic', sans-serif"; // 자막

// Pretendard Bold(700) 공식 CDN woff2
const PRETENDARD_BOLD_URL =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff2/Pretendard-Bold.woff2";

let started = false;

/** 폰트 로딩 시작 (한 번만). 모듈 로드 시 자동 호출됨. */
export function ensureFonts(): void {
  if (started || typeof document === "undefined") return;
  started = true;

  const handle = delayRender("폰트 로딩 중(에스코어드림9 + Pretendard)");

  const scdream = new FontFace(
    "SCDream9",
    `url(${staticFile("fonts/SCDream9.otf")}) format('opentype')`,
    { weight: "900", style: "normal" }
  );

  const pretendardBold = new FontFace("Pretendard", `url(${PRETENDARD_BOLD_URL}) format('woff2')`, {
    weight: "700",
    style: "normal",
  });

  // 타입 정의 버전에 따라 FontFaceSet.add 시그니처가 없을 수 있어 캐스팅
  const fontSet = document.fonts as unknown as { add: (font: FontFace) => void };

  Promise.all([scdream.load(), pretendardBold.load()])
    .then((loaded) => {
      loaded.forEach((f) => fontSet.add(f));
      continueRender(handle);
    })
    .catch((err) => {
      // 폰트 로딩 실패해도 렌더는 진행(폴백 폰트로)
      console.error("폰트 로딩 실패:", err);
      continueRender(handle);
    });
}

// 모듈이 import되는 즉시 로딩 시작
ensureFonts();
