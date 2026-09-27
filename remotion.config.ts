import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// 주의: CRF는 코덱별로 render 명령에서 개별 지정한다(전역 설정 시 prores/mp3와 충돌).
//  h264 mp4 렌더에만 --crf 를 붙임 (scripts/render.mjs 참고)
