export type SongTags = {
  title: string;
  picture: {
    format: string;
    data: ArrayBuffer;
  };
  artist: string;
  album: string;
};

export type Song = {
  tags: SongTags;
  file: ArrayBuffer;
};
