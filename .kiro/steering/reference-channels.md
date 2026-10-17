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
- **Дикий Лось** (러시아어, "야생 무스/엘크")
  - 러시아어 채널. 자막이 러시아어일 수 있으니 추출 시 `--sub-langs "ru,ru-orig,en,en-US"`로 받고,
    내용 파악 후 헬마드 톤 한국어로 재구성한다.

### 틱톡(TikTok)
- **@thulani_chipanga** (틱톡)
  - 플레이트/덤벨 전신 서킷 계열. 예: "FULL BODY CIRCUIT"(플레이트 1장: Floor to Press / Squat to Press / Overhead Lunges / Overhead Plate March).

## 자막 추출 방법 (로컬)

- `yt-dlp`가 로컬에 설치돼 있음(`C:\Users\p_ros\AppData\Local\Programs\Python\Python310\Scripts\yt-dlp.exe`).
- 명령: `yt-dlp --skip-download --write-auto-subs --write-subs --sub-langs "en,en-US,en-orig" --sub-format vtt -o "_yt/%(id)s" "<URL>"`
- 제목만 빠르게: oEmbed `https://www.youtube.com/oembed?url=<URL>&format=json`
- 웹 fetch로 유튜브 페이지 직접 긁기는 JS 렌더라 안 됨. timedtext 익명 접근도 막혀 있음 → yt-dlp 사용.
- 임시 자막(`_yt/`, `_yt_log.txt`)은 작업 후 삭제.

### 틱톡 추출 방법
- 틱톡은 음성 자막(STT)이 없다. 대신 **캡션/설명**이 메타데이터에 들어있음.
- 명령: `yt-dlp --skip-download --write-info-json -o "_tt/%(id)s" "<URL>"`
- info.json에서 `description`(= 캡션, 운동 구성이 보통 여기 적혀 있음), `uploader`, `duration`을 읽는다.
- 임시(`_tt/`, `_tt_log.txt`)는 작업 후 삭제.

## 재구성 원칙

- 사실·동작·수치만 추출해 헬마드 식으로 새로 집필. 운동 효과 주장은 웹으로 교차검증(과장 제거).
- 새 채널이 생기면 여기에 계속 추가한다.
