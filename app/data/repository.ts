"use server";
import { log } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { tvResourceUrl } from "./types";

export async function loadVideoList({ page = 1, limit = 80, clasTab, serverUrl }: { page?: number; limit?: number; clasTab?: number; serverUrl?: string }) {
  try {
    const baseUrl = serverUrl || "https://api.guangsuapi.com/api.php/provide/vod/";
    // Only include t parameter if clasTab is provided
    const url = clasTab
      ? `${baseUrl}?ac=videolist&limit=${limit}&pg=${page}&t=${clasTab}`
      : `${baseUrl}?ac=videolist&limit=${limit}&pg=${page}`;
    // log("url:", url);
    // Cache for 10 minutes - video lists update periodically
    const res = await fetch(url, {
      next: { revalidate: 600 }
    });
    if (res.status == 200) {
      const json = await res.json();
      return json;
    } else {
      log("load error:", res.statusText);
      return null;
    }
  } catch (error) {
    log(error);
    return null;
  }
}
export async function loadVideoDetail(id: string, serverUrl?: string) {
  try {
    const baseUrl = serverUrl || "https://api.guangsuapi.com/api.php/provide/vod/";
    const url = `${baseUrl}?ac=detail&ids=${id}`;
    // Cache for 30 minutes - video details rarely change
    const res = await fetch(url, {
      next: { revalidate: 1800 }
    });
    if (res.status == 200) {
      const json = await res.json();
      return json;
    } else {
      log("load error:", res.statusText);
      return null;
    }
  } catch (error) {
    log(error);
    return null;
  }
}
export async function search(key_world: string, serverUrl?: string) {
  try {
    const baseUrl = serverUrl || "https://api.guangsuapi.com/api.php/provide/vod/";
    const url = `${baseUrl}?ac=videolist&wd=${key_world}`;
    // No cache for search - users expect fresh results
    const res = await fetch(url, {
      cache: 'no-store'
    });
    if (res.status == 200) {
      const json = await res.json();
      return json;
    } else {
      log("load error:", res.statusText);
      return null;
    }
  } catch (error) {
    log(error);
    return null;
  }
}

export async function searchAction(formData: FormData) {
  log("formdata=", formData);
  const name: string | undefined = formData.get("name")?.toString();
  if (name == undefined || name?.trim() == "") {
    return;
  }
  const path = "/?name=" + encodeURIComponent(name.trim());
  log("search path:", path);
  revalidatePath(path);
  redirect(path);
}

export async function loadClassTabs(serverUrl?: string) {
  try {
    const url = serverUrl || `https://api.guangsuapi.com/api.php/provide/vod/`;
    log("url:", url);
    // Cache for 1 hour - class tabs don't change frequently
    const res = await fetch(url, {
      next: { revalidate: 3600 }
    });
    if (res.status == 200) {
      const json = await res.json();
      return json;
    } else {
      log("load error:", res.statusText);
      return null;
    }
  } catch (error) {
    log(error);
    return null;
  }
}

export async function fetchResource(url: string) {
  try {
    log("url:", url);
    const res = await fetch(url);
    if (res.status == 200) {
      const json = await res.json();
      return json;
    } else {
      log("load error:", res.statusText);
      return null;
    }
  } catch (error) {
    log(error);
    return null;
  }
}

export async function getTvResource() {
  return await fetchResource(tvResourceUrl);
}
