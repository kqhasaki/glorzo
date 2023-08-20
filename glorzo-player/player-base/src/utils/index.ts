import type { Song, SongTags } from "@glorzo-player/types/Song";
import jsmediatags from "jsmediatags";

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

export async function parseSongFromFile(file: File): Promise<Song> {
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
  return {
    file: fileBuffer,
    fileName: file.name,
    tags: tags as SongTags,
    duration,
  };
}
