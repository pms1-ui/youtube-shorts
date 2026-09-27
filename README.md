# 썰형 쇼츠 — Remotion 멀티채널 프로젝트

`sample/sample_video.mp4`(쇼츠)와 `sample/sample_image.jpg`(게시물)를 분석해,
커뮤니티 게시글 형태의 쇼츠를 **코드로 양산**하는 Remotion 프로젝트입니다.
**여러 채널을 한 프로젝트에서 운영**하도록 구성돼 있습니다.
(대본·사진·채널명은 저작권 문제 없는 **가상의 창작물**입니다.)

## 현재 채널
| 채널 | 성격 | 테마 | 예시 결과물 |
|------|------|------|------|
| **안빤엄빠** | 육아 썰 | 노랑 헤더 | `out/안빤엄빠_YYMMDD.mp4` |
| **대환장민국** | 대한민국 현재/미래를 촌철살인으로 짚는 시사 | 남색 + 태극기 | `out/대환장민국_YYMMDD.mp4` |

---

## 실행 방법

```bash
npm install                        # 최초 1회
npm run dev                        # Remotion Studio (브라우저 미리보기/편집)

# 렌더 (파일명은 "채널명_YYMMDD" 로 자동 생성)
npm run render:anppan              # 안빤엄빠 영상
npm run render:anppan:thumb        # 안빤엄빠 게시물 이미지
npm run render:daehwanjang         # 대환장민국 영상
npm run render:daehwanjang:thumb   # 대환장민국 게시물 이미지

# 직접 실행도 가능
node scripts/render.mjs daehwanjang           # 영상
node scripts/render.mjs daehwanjang --thumb   # 게시물 이미지
```

렌더 결과는 `out/<채널한글명>_YYMMDD.mp4` (영상), `_YYMMDD.png` (게시물 이미지)로 저장됩니다.

---

## 폴더 구조 (멀티채널 운영의 핵심)

```
sample/                       # 원본 참고 자료(분석 대상)
src/
  index.ts                    # 엔트리
  Root.tsx                    # 레지스트리를 돌며 채널별 Composition 자동 등록
  registry.ts                 # ★ 운영 채널 목록 (채널 추가 시 여기 한 줄)
  types.ts                    # 공통 타입(Channel / Cut / StoryScript / 키 타입들)
  config.ts                   # 오디오 방침 스위치(INCLUDE_BGM 등)

  BabyShorts.tsx              # 메인 영상 조립 (channel/script를 props로 받음)
  PostThumbnail.tsx           # 게시물 정지 이미지 (channel/script props)

  photos.tsx                  # 육아 사진 세트(SVG)  — 세트 id "baby"
  photoSets.tsx               # photoSet 키 → 사진 맵 매핑(getPhoto)

  components/
    BoardFrame.tsx            # 헤더+제목+메타+구분선 (채널 색/장식 적용)
    Subtitles.tsx             # 본문 누적 자막 + 출처 캡션
    MediaBox.tsx              # 미디어 박스(줌인/페이드)
    TaegukFlag.tsx            # 태극기 SVG
    decorations.tsx           # 헤더 장식 키 → 컴포넌트 매핑(getDecoration)

  channels/                   # ★ 채널별 폴더 (여기가 늘어남)
    anppan/
      channel.ts              #  브랜드(이름/작성자/색/장식/사진세트)
      script.ts               #  이 채널의 대본(글 1편)
    daehwanjang/
      channel.ts              #  남색+태극기 브랜드, photoSet="daehwanjang"
      script.ts               #  인구절벽 시사 대본
      photos.tsx              #  이 채널 전용 사진 세트(시사/통계 SVG)

public/sfx/                   # 효과음 + 배경음 (임시 합성음, 교체 예정)
scripts/
  gen-sfx.mjs                 # 효과음 생성기(임시)
  render.mjs                  # 채널 렌더 헬퍼(파일명 자동)
```

---

## 새 채널 추가하는 법 (3단계)

예: `foo` 채널을 만든다면

1. **폴더 생성** `src/channels/foo/`
   - `channel.ts` — 채널 브랜드 정의
     ```ts
     import type { Channel } from "../../types";
     export const fooChannel: Channel = {
       id: "foo",
       compositionId: "Foo",          // Remotion Composition 이름(영문)
       name: "채널표시명",
       defaultAuthor: "작성자기본값",
       headerColor: "#....",
       headerTextColor: "#....",
       // 선택: headerIconColor, titleColor, dividerColor,
       //       headerDecoration: "taeguk",   // 헤더 장식(있으면)
       //       photoSet: "daehwanjang" | "baby",  // 사진 세트
     };
     ```
   - `script.ts` — 대본(글 1편): `title/views/comments/cuts[]`
   - (선택) `photos.tsx` — 이 채널 전용 사진 세트가 필요하면 작성 후
     `src/photoSets.tsx`의 SETS와 `types.ts`의 `PhotoSetId`에 키 추가
2. **레지스트리 등록** `src/registry.ts`의 `CHANNEL_ENTRIES`에 한 줄 추가
   ```ts
   { channel: fooChannel, script: fooScript },
   ```
3. **렌더 헬퍼에 등록** `scripts/render.mjs`의 `CHANNELS`에 매핑 추가
   ```js
   foo: { comp: "Foo", label: "채널한글파일명" },
   ```

그러면 Remotion Studio에 `Foo`(영상) / `FooThumbnail`(이미지)가 자동으로 뜨고,
`node scripts/render.mjs foo` 로 `채널한글파일명_YYMMDD.mp4`가 나옵니다.

> **중요(직렬화 규칙)**: `channel` 객체는 Remotion `defaultProps`로 넘어가며 직렬화됩니다.
> 그래서 채널에는 **함수/컴포넌트를 직접 넣지 말고 문자열 키**만 둡니다.
> (장식=`headerDecoration:"taeguk"`, 사진세트=`photoSet:"..."`)
> 실제 컴포넌트 매핑은 `decorations.tsx` / `photoSets.tsx`에서 합니다.

---

## 대본 수정 (양산 포인트)
채널 폴더의 `script.ts`만 고치면 그 채널 영상이 통째로 바뀝니다.
- `title` / `views` / `comments` — 글 제목·조회·댓글
- `author` — (선택) 이 글에서만 작성자 덮어쓰기
- `cuts[]` — 컷당 `start`(초) / `lines`(누적 자막) / `source`(출처 드립) / `photo`(사진 id) / `sfxOnEnter`(효과음)

---

## 오디오 방침
- **효과음(SFX)**: 지금 `public/sfx/*.wav`는 미리보기용 **임시 합성음**.
  실제 운영 시 직접 만든/구매한 파일로 **같은 이름 교체**.
- **배경음(BGM)**: 영상에 넣지 않고 **유튜브 업로드 직전 "음악 추가"로 세팅**.
  기본값 `config.ts`의 `INCLUDE_BGM = false`. 미리듣기 때만 `true`.

---

## 실사 사진/영상으로 교체
지금 사진은 SVG입니다. 실사로 바꾸려면 `public/`에 파일을 넣고
`MediaBox.tsx`에서 `<Img src={staticFile(...)} />` / `<OffthreadVideo .../>`로 교체.

## 폰트
현재 시스템 폰트(맑은 고딕) 폴백. 샘플과 더 비슷하게 하려면
**Pretendard** 또는 **G마켓 산스**를 `public/`에 넣고 `@font-face`로 로드.
