import type { JSONResponseSuccessType } from "@glorzo-server/app/types";
import type { LocalSong } from "@glorzo-player/types/LocalSong";
import type { RemoteSong } from "@glorzo-player/types/LocalSong";

export const API_BASE_URL = "http://localhost:3000";

export async function getAllSongs(): Promise<RemoteSong[]> {
  const res = (await fetch(`${API_BASE_URL}/songs`).then(
    async (res) => await res.json()
  )) as JSONResponseSuccessType<RemoteSong[]>;

  const songs = res.data;

  return songs;
}

export function getDownloadUrl(target: string): string {
  const url = `${API_BASE_URL}/download?target=${encodeURIComponent(target)}`;
  return url;
}

export async function uploadFile(fileName: string, buffer: ArrayBuffer): Promise<string> {
  const result = await fetch(`${API_BASE_URL}/uploadFile`, {
    method: "POST",
    body: buffer,
    headers: {
      "Content-Type": "application/octet-stream",
      "X-Filename": encodeURIComponent(fileName),
    },
  }).then(async (res) => await res.json());

  return result.url;
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
  await fetch(`${API_BASE_URL}/createSong`, {
    method: "POST",
    body: JSON.stringify({
      name: song.tags.title,
      artist: song.tags.artist,
      album: song.tags.album,
      pictureUrl,
      audioUrl,
      uploader: 1,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => await res.json());
}
