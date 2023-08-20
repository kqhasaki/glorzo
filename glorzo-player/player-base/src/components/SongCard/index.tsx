import type { Song } from "@glorzo-server/db";
import { getDownloadUrl } from "@glorzo-player/api/request";
import { makeStyles } from "@glorzo-player/theme";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    height: "200px",
    width: "160px",
  },
  image: {
    borderRadius: "7px",
    width: "100%",
    aspectRatio: "1 / 1",
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: "13px",
  },
  artist: {
    color: theme.palette.text.secondary,
    fontSize: "13px",
  },
}));

export function SongCard({ song }: { song: Song }): JSX.Element {
  const { classes } = useStyles();

  return (
    <article className={classes.wrapper}>
      <img draggable={false} className={classes.image} src={getDownloadUrl(song.pictureUrl)}></img>
      <div>
        <p className={classes.title}>{song.name}</p>
        <p className={classes.artist}>{song.artist}</p>
      </div>
    </article>
  );
}
