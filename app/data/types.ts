export interface VideoItem {
  vod_id: number;
  vod_name: string;
  vod_pic: string;
  vod_remarks?: string;
  vod_time?: string;
  vod_year?: string;
  vod_area?: string;
  vod_lang?: string;
  vod_actor?: string;
  vod_director?: string;
  vod_content?: string;
  vod_play_url?: string;
}

export interface VideoListResponse {
  code: number;
  msg: string;
  page: number;
  pagecount: number;
  limit: number;
  total: number;
  list: VideoItem[];
}
export const tvResourceUrl = "https://raw.githubusercontent.com/xfcjp/xfcjp.github.io/fa89f0c64e256fd8581ccf0ca8520b0d52ca2f25/maoTV01.json";