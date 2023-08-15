import { useState, useEffect } from "react";
import { getAllSongs } from "@glorzo-player/api/request";
import type { Song } from "@glorzo-player/types/server";

export const useAllSongs = (): Song[] => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    getAllSongs().then((songs) => setSongs(songs));
  }, []);

  return songs;
};
