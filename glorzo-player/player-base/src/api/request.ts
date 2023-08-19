import type { JSONResponseSuccessType, ResponseErrorType } from "@glorzo-server/app/types";
import type { Song } from "@glorzo-server/db";

export const API_BASE_URL = "http://localhost:3000";

export async function getAllSongs(): Promise<Song[]> {
  const res = (await fetch(`${API_BASE_URL}/songs`).then(
    async (res) => await res.json()
  )) as JSONResponseSuccessType<Song[]>;

  const songs = res.data;

  return songs;
}

export function getDownloadUrl(target: string): string {
  return `${API_BASE_URL}/download?target=${encodeURIComponent(target)}`;
}
