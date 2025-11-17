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
