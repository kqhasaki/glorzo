import { makeStyles } from "@glorzo-player/theme";
import { SongCard } from "@glorzo-player/components/SongCard";
import { update } from "@glorzo-player/store/remoteSongsSlice";
import { getAllSongs } from "@glorzo-player/api/request";
import { useAppDispatch, useAppSelector } from "@glorzo-player/hooks";
import { useCallback, useEffect } from "react";

const useStyles = makeStyles()(() => ({
  mainWrapper: {
    padding: "64px 36px",
  },
  gallery: {
    margin: "30px 0",
    display: "flex",
    flexFlow: "row wrap",
    gap: "40px",
  },
}));

export default function SongLibrary(): JSX.Element {
  const { classes } = useStyles();
  const allSongs = useAppSelector((state) => state.remoteSongs.value);
  const dispatch = useAppDispatch();

  const updateLibrary = useCallback(async () => {
    const songs = await getAllSongs();
    dispatch(update(songs));
  }, [dispatch]);

  useEffect(() => {
    void updateLibrary();
  }, [updateLibrary]);

  return (
    <main className={classes.mainWrapper}>
      <h1>All Songs</h1>
      <section className={classes.gallery}>
        {allSongs.map((song) => (
          <SongCard song={song} key={song.id} />
        ))}
      </section>
    </main>
  );
}
