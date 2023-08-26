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

export type RemoteSong = {
  id: number;
  name: string;
  artist: string;
  album: string;
  pictureUrl: string;
  audioUrl: string;
  uploader: string;
};

export type PlayerControls = {
  volume: number;
  strategy: "RANDOM" | "LOOP_SINGLE" | "LOOP_LIST";
};

export type IdlePlayerState = {
  status: "IDLE";
  song: undefined;
  controls: PlayerControls;
};

export type ActivePlayerState = {
  status: "PAUSED" | "PLAYING";
  song: {
    id: string | number;
    name: string;
    audioFile: ArrayBuffer | string;
    picture: string | SongTags["picture"];
    artist: string;
    album: string;
    duration?: number;
    timeCursor: number;
  };
  controls: PlayerControls;
};

export type PlayerState = IdlePlayerState | ActivePlayerState;
