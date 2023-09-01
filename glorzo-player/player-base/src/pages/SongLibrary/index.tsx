import { makeStyles } from "@glorzo-player/theme";
import { SongCard } from "@glorzo-player/components/SongCard";
import { fetchRemoteSongs } from "@glorzo-player/store/remoteSongsSlice";
import { useAppDispatch, useAppSelector } from "@glorzo-player/hooks";
import { useEffect } from "react";

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

  useEffect(() => {
    dispatch(fetchRemoteSongs());
  }, [dispatch]);

  return (
    <main className={classes.mainWrapper}>
      <h1>所有歌曲</h1>
      <section className={classes.gallery}>
        {allSongs.map((song) => (
          <SongCard song={song} key={song.id} />
        ))}
      </section>
    </main>
  );
}
