import { makeStyles } from "@glorzo-player/theme";
import { useAllSongs } from "./hooks";
import { SongCard } from "@glorzo-player/components/SongCard";

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
  const allSongs = useAllSongs();

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
