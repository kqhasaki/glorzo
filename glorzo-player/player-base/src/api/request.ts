import type { JSONResponseSuccessType, ResponseErrorType } from "@glorzo-server/types";
import type { LocalSong, RemoteSong } from "@glorzo-player/types/Songs";
import type { User } from "@glorzo-player/types/User";
import { getCurrentUser } from "@glorzo-player/utils";

import axios from "axios";

export const API_BASE_URL = "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const user = getCurrentUser();
    if (user) {
      config.headers.Authorization = user.token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

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

export async function signUp(user: {
  username: string;
  email: string;
  password: string;
}): Promise<boolean> {
  const result = (
    await axiosInstance.post("/signUp", {
      ...user,
    })
  ).data as JSONResponseSuccessType | ResponseErrorType;
  return result.success;
}

export async function login(user: { username: string; password: string }): Promise<User> {
  const result = (await axiosInstance.post("/login", { ...user }))
    .data as JSONResponseSuccessType<User>;
  return result.data;
}
