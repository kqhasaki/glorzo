import type { JSONResponseSuccessType } from "@glorzo-server/types";
import type { LocalSong } from "@glorzo-player/types/Songs";
import type { RemoteSong } from "@glorzo-player/types/Songs";
import axios from "axios";

export const API_BASE_URL = "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

export async function getAllSongs(): Promise<RemoteSong[]> {
  const res = (await axiosInstance.get(`/songs`)).data as JSONResponseSuccessType<RemoteSong[]>;

  const songs = res.data;

  return songs;
}

export function getDownloadUrl(target: string): string {
  const url = `${API_BASE_URL}/download?target=${encodeURIComponent(target)}`;
  return url;
}

export async function downloadFromUrl(target: string): Promise<ArrayBuffer> {
  const url = getDownloadUrl(target);
  const result = (await axiosInstance(url, { responseType: "arraybuffer" })).data;
  return result;
}

export async function uploadFile(fileName: string, buffer: ArrayBuffer): Promise<string> {
  const result = await axiosInstance.post("/uploadFile", buffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "X-Filename": encodeURIComponent(fileName),
    },
  });
  return result.data.url;
}

export async function createSong({
  song,
  pictureUrl,
  audioUrl,
}: {
  song: LocalSong;
  pictureUrl: string;
  audioUrl: string;
}): Promise<void> {
  await axiosInstance.post("/createSong", {
    name: song.tags.title,
    artist: song.tags.artist,
    album: song.tags.album,
    pictureUrl,
    audioUrl,
    uploader: 1,
    sha256: song.sha256,
  });
}

export async function songExists(sha256: string): Promise<boolean> {
  const result = await axiosInstance.post("/songExists", {
    sha256,
  });
  const exist = result.data.data;
  return exist;
}
