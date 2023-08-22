import type { Song } from "@glorzo-server/db";

export type SongTags = {
  title: string;
  picture: {
    format: string;
    data: ArrayBuffer;
  };
  artist: string;
  album: string;
};

export type LocalSong = {
  tags: SongTags;
  file: ArrayBuffer;
  fileName: string;
  duration: number;
  sha256: string;
};

export type RemoteSong = Song;
