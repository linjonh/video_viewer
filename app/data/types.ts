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

export interface ResourceServer {
  id: string;
  name: string;
  url: string;
}

export const resourceServers: ResourceServer[] = [
  { id: "wolongzyw", name: "卧龙资源(切)", url: "https://collect.wolongzyw.com/api.php/provide/vod/" },
  { id: "lziapi", name: "量子资源(切)", url: "http://cj.lziapi.com/api.php/provide/vod/" },
  { id: "apiyhzy", name: "樱花资源(切)", url: "https://m3u8.apiyhzy.com/api.php/provide/vod/" },
  { id: "sdzyapi", name: "闪电资源(切)", url: "http://sdzyapi.com/api.php/provide/vod/" },
  { id: "guangsuapi", name: "光速资源(切)", url: "https://api.guangsuapi.com/api.php/provide/vod/" },
  { id: "xinlangapi", name: "新浪资源(切)", url: "http://api.xinlangapi.com/xinlangapi.php/provide/vod/" },
  { id: "apibdzy", name: "百度资源(切)", url: "https://api.apibdzy.com/api.php/provide/vod/" },
];

export const tvResourceUrl = "https://raw.githubusercontent.com/xfcjp/xfcjp.github.io/fa89f0c64e256fd8581ccf0ca8520b0d52ca2f25/maoTV01.json";
