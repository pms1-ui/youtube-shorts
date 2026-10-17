# 참고(레퍼런스) 유튜브 채널 — 운동 루틴 소스

헬마드 쇼츠의 **운동 루틴/주제 아이디어를 가져오는 소스 채널** 목록이다.
사용자가 이 채널들의 영상 URL을 주면, `yt-dlp`로 자막을 받아 내용을 파악하고
헬마드 톤(존댓말 구어체)으로 **새로 재구성**한다. 원본을 그대로 번역·복붙하지 않는다(저작권).

## 채널

- **Goku Pump**
  - 맨몸/스트리트 운동 계열(헬마드 결과 잘 맞음).
- **That's Good Money**
  - 미국 길거리/감옥 스타일 고반복 맨몸운동. 예: "150 Push Up Routine"(카오스 푸쉬업) → 261017 편 소스.
  - 채널 핸들: https://www.youtube.com/@thatsgoodmoney

## 자막 추출 방법 (로컬)

- `yt-dlp`가 로컬에 설치돼 있음(`C:\Users\p_ros\AppData\Local\Programs\Python\Python310\Scripts\yt-dlp.exe`).
- 명령: `yt-dlp --skip-download --write-auto-subs --write-subs --sub-langs "en,en-US,en-orig" --sub-format vtt -o "_yt/%(id)s" "<URL>"`
- 제목만 빠르게: oEmbed `https://www.youtube.com/oembed?url=<URL>&format=json`
- 웹 fetch로 유튜브 페이지 직접 긁기는 JS 렌더라 안 됨. timedtext 익명 접근도 막혀 있음 → yt-dlp 사용.
- 임시 자막(`_yt/`, `_yt_log.txt`)은 작업 후 삭제.

## 재구성 원칙

- 사실·동작·수치만 추출해 헬마드 식으로 새로 집필. 운동 효과 주장은 웹으로 교차검증(과장 제거).
- 새 채널이 생기면 여기에 계속 추가한다.
