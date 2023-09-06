import type { LocalSong, SongTags } from "@glorzo-player/types/Songs";
import jsmediatags from "jsmediatags";
import { SHA256, lib } from "crypto-js";
import { User } from "@glorzo-player/types/User";

export function getHashedPassword(password: string): string {
  return SHA256(password).toString();
}

export function arrayBufferToBase64Str(buff: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buff);
  const binaryString = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
  return btoa(binaryString);
}

export async function getAudioDuration(buff: ArrayBuffer): Promise<number> {
  const audioContext = new AudioContext();
  const mp3Buffer = buff;
  const res = await new Promise<number>((resolve) =>
    audioContext.decodeAudioData(mp3Buffer, (decodedBuffer) => {
      const durationInSeconds = decodedBuffer.duration;
      resolve(durationInSeconds);
    })
  );
  audioContext.close();
  return res;
}

export function getFormattedDuration(durationInSeconds: number): string {
  const min = Math.floor(durationInSeconds / 60);
  const sec = Math.floor(durationInSeconds % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

function getArrayBufferSha256(ab: ArrayBuffer): string {
  const i8a = new Uint8Array(ab);
  const arr = [];
  for (let i = 0; i < i8a.length; i += 4) {
    arr.push((i8a[i]! << 24) | (i8a[i + 1]! << 16) | (i8a[i + 2]! << 8) | i8a[i + 3]!);
  }
  const wordArray = lib.WordArray.create(arr, i8a.length);
  const sha256Hash = SHA256(wordArray);

  return sha256Hash.toString();
}

export async function parseSongFromFile(file: File): Promise<LocalSong> {
  const tags = await new Promise((resolve) => {
    jsmediatags.read(file, {
      onSuccess(parsedTags) {
        const { picture, title, artist, album } = parsedTags.tags;
        const result = {
          picture: {
            format: picture?.format ?? "image/jpg",
            data: picture?.data ? new Uint8Array(picture.data).buffer : new Uint8Array().buffer,
          },
          title: title ?? "unknown",
          artist: artist ?? "unknown",
          album: album ?? "unknown",
        };
        resolve(result);
      },
    });
  });
  const fileBuffer = await file.arrayBuffer();
  const duration = await getAudioDuration(fileBuffer.slice(0));
  const sha256 = getArrayBufferSha256(fileBuffer);

  return {
    file: fileBuffer,
    fileName: file.name,
    tags: tags as SongTags,
    duration,
    sha256,
  };
}

export function getCurrentUser(): User | undefined {
  try {
    const user = localStorage.getItem("glorzo-user");
    return JSON.parse(user!) as User;
  } catch (err) {
    return undefined;
  }
}
