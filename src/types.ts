// ============================================================
//  공통 타입 — 모든 채널이 공유하는 데이터 구조
// ============================================================

export const FPS = 30;

/** 효과음 종류 — 사용자가 제공한 sound-effect 세트 (public/sfx/ 에 배치)
 *  id(s01~s14) → 실제 파일명(확장자 포함)은 SFX_FILES 에서 매핑. */
export type SfxId =
  | "s01" | "s02" | "s03" | "s04" | "s05" | "s06" | "s07"
  | "s08" | "s09" | "s10" | "s11" | "s12" | "s13" | "s14";

/** 효과음 id → public/sfx/ 실제 파일명 (wav/mp3 혼용) */
export const SFX_FILES: Record<SfxId, string> = {
  s01: "001_뽁.wav",
  s02: "002_띠링.mp3",
  s03: "003_띠딩2.mp3",
  s04: "004_띵동3.mp3",
  s05: "005_놀람반전.mp3",
  s06: "006_또독.wav",
  s07: "007_또잉또익.mp3",
  s08: "008_뚜훅.wav",
  s09: "009_띠링넘김.mp3",
  s10: "010_띠용.mp3",
  s11: "011_장전.wav",
  s12: "012_장전2.wav",
  s13: "013_정답음.mp3",
  s14: "014_타당타닥.mp3",
};

/** 영상 레이아웃 종류
 *  - "board"    : 커뮤니티 게시판 캡처형(헤더+제목+메타+누적자막) — 기존 안빤엄빠
 *  - "headline" : 검정 배경 + 고정 헤드라인 2줄 + 중앙 미디어 + 하단 교체형 자막 (sample/2)
 *  (channel은 직렬화되므로 문자열 키만 둠. 실제 컴포넌트 매핑은 Root.tsx) */
export type LayoutId = "board" | "headline";

/** 채널 브랜드/테마 정의 */
export type Channel = {
  /** 내부 식별자(폴더명과 동일 권장) */
  id: string;
  /** Remotion Composition id (렌더 대상 이름) */
  compositionId: string;
  /** 영상 레이아웃 (미지정 시 "board"). "headline"이면 검정배경 헤드라인 포맷 */
  layout?: LayoutId;
  /** 헤더에 표시되는 채널명 */
  name: string;
  /** 기본 작성자(닉네임) */
  defaultAuthor: string;
  /** 헤더 배경색 */
  headerColor: string;
  /** 헤더 텍스트 색 */
  headerTextColor: string;
  /** 뒤로가기/햄버거 아이콘 색 (미지정 시 headerTextColor 사용) */
  headerIconColor?: string;
  /** 제목 텍스트 색 (미지정 시 기본 검정) */
  titleColor?: string;
  /** 구분선 색 (미지정 시 기본 검정) */
  dividerColor?: string;
  /** 헤더 채널명 옆 장식 종류 (직렬화 가능한 키). "taeguk" 등. 없으면 생략.
   *  실제 컴포넌트 매핑은 components/decorations.tsx 에서 처리 */
  headerDecoration?: DecorationId;
  /** 사용할 사진 세트 (직렬화 가능한 키). 미지정 시 "baby"(기본 육아 세트).
   *  실제 매핑은 photoSets.tsx 에서 처리 */
  photoSet?: PhotoSetId;
};

/** 헤더 장식 종류 */
export type DecorationId = "taeguk";

/** 사진 세트 종류 (채널별로 다른 그림 세트) */
export type PhotoSetId = "baby" | "daehwanjang";

/** 컷(장면) 하나 */
export type Cut = {
  /** 시작 시간(초) */
  start: number;
  /** 본문 자막 줄들 — 한 줄씩 누적 ("board" 레이아웃 전용) */
  lines: string[];
  /** 하단 "출처 - OOO" 드립 ("board" 레이아웃 전용) */
  source: string;
  /** 사용할 사진 id (photos.tsx의 key) */
  photo: string;
  /** 컷 전환 효과음 */
  sfxOnEnter?: SfxId;

  // --- "headline" 레이아웃 전용 -------------------------------------
  /** 하단 교체형 자막 한 줄(누적 아님). 미지정 시 lines.join(" ") 폴백 */
  subtitle?: string;
  /** 자막 색 (미지정 시 노랑). 예: "#ffde3d"(노랑), "#e23b3b"(빨강) */
  subtitleColor?: string;
  /** 미디어 줌 방향 (미지정 시 "in"). "in"=확대, "out"=축소 */
  zoom?: "in" | "out";
};

/** "headline" 레이아웃의 상단 고정 헤드라인 2줄 */
export type Headline = {
  /** 1줄 (기본 하양) */
  line1: string;
  /** 2줄 (기본 노랑, 강조) */
  line2: string;
};

/** "headline" 레이아웃 인트로 (sample/3 스타일)
 *  흰 카드 위 본문 문장(여러 줄)을 연파랑 하이라이트가 좌→우로 스캔하며
 *  상하 크롭으로 강조. 스캔이 끝나면 본편(사진+자막)으로 넘어간다. */
export type Intro = {
  /** 인트로에 크게 띄울 본문 문장 줄들 (보통 제목 문장을 2줄로) */
  lines: string[];
  /** 인트로 길이(초). 미지정 시 2.5 */
  durationSec?: number;
  /** 인트로 진입 효과음 */
  sfx?: SfxId;
};

/** 내레이션 자막 비트 하나 ("headline" 레이아웃, 속도감 있는 줄글 전개용)
 *  사진(cuts)과 타이밍을 분리 → 자막이 사진보다 빠르게 쫙쫙 넘어감 */
export type NarrationBeat = {
  /** 시작 시간(초) */
  start: number;
  /** 자막 텍스트 (짧게 끊어치기) */
  text: string;
  /** 글자 색 (미지정 시 노랑). 강조/반전은 하양 또는 빨강 */
  color?: "yellow" | "white" | "red";
  /** 이 비트에서 울릴 효과음 */
  sfx?: SfxId;
};

/** 한 편의 글(영상) 대본 */
export type StoryScript = {
  /** 게시물 제목 ("board" 레이아웃 헤더/썸네일에 사용) */
  title: string;
  /** 조회수 표기 ("board" 레이아웃 전용) */
  views: string;
  /** 댓글수 표기 ("board" 레이아웃 전용) */
  comments: string;
  /** 이 글에서 작성자를 덮어쓰고 싶을 때(없으면 채널 defaultAuthor) */
  author?: string;
  /** "headline" 레이아웃 상단 고정 2줄. 미지정 시 title을 한 줄로 표시 */
  headline?: Headline;
  /** "headline" 레이아웃 인트로 (sample/3 스타일). 있으면 본편 앞에 재생 */
  intro?: Intro;
  /** 내레이션 오디오 파일명 (public/audio/ 기준). 있으면 영상에 삽입 */
  audioFile?: string;
  /** 내레이션 오디오 길이(초). 있으면 영상 전체 길이를 이 값에 맞춘다(녹음 기준). */
  audioDurationSec?: number;
  /** "headline" 레이아웃 자막 트랙 — 속도감 있는 줄글 내레이션.
   *  지정 시 이 비트들이 하단 자막으로 빠르게 전개되고,
   *  cuts[]는 배경 사진(미디어)만 담당한다.
   *  미지정 시 기존 방식(cuts[].subtitle)으로 폴백. */
  narration?: NarrationBeat[];
  /** 컷 목록 */
  cuts: Cut[];
  /** 마지막 컷 뒤 여유(초) */
  outroSeconds?: number;
};

/** 대본 전체 길이(초) 계산.
 *  ★ 녹음 오디오가 있으면(audioDurationSec) 영상 길이 = 오디오 길이. (녹음이 기준)
 *    인트로는 녹음 앞부분에 이미 포함돼 있으므로 따로 더하지 않는다.
 *  오디오가 없을 때만(미리보기) 인트로+cuts/narration+여유로 추정. */
export function totalSeconds(script: StoryScript): number {
  if (script.audioDurationSec && script.audioDurationSec > 0) {
    return script.audioDurationSec;
  }
  const intro = script.intro ? script.intro.durationSec ?? 2.5 : 0;
  const lastCut = script.cuts[script.cuts.length - 1]?.start ?? 0;
  const lastBeat = script.narration?.length ? script.narration[script.narration.length - 1].start : 0;
  const outro = script.outroSeconds ?? 3;
  return intro + Math.max(lastCut, lastBeat) + outro + 2.5;
}
