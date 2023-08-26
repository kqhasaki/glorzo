import type { RemoteSong as Song } from "@glorzo-player/types/Songs";
import { getDownloadUrl } from "@glorzo-player/api/request";
import { makeStyles } from "@glorzo-player/theme";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAppDispatch } from "@glorzo-player/hooks";
import { useCallback } from "react";
import { loadSong } from "@glorzo-player/store/playerStateSlice";

const useStyles = makeStyles<void, "image" | "operations">()((theme, _, classes) => ({
  wrapper: {
    height: "200px",
    width: "160px",
    [`&:hover .${classes.image}`]: {
      filter: "brightness(0.8)",
    },
    [`&:hover .${classes.operations}`]: {
      opacity: 1,
    },
  },
  image: {
    borderRadius: "7px",
    height: "100%",
    width: "100%",
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: "1 / 1",
    position: "relative",
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: "13px",
  },
  artist: {
    color: theme.palette.text.secondary,
    fontSize: "13px",
  },
  operations: {
    color: theme.palette.text.primary,
    width: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "space-between",
    bottom: "10px",
    padding: "0 12px",
    transition: "all 100ms ease-in",
    opacity: 0,
  },
  operationBtn: {
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    background: "rgba(121, 116, 114, 0.8)",
    color: "rgba(255, 255, 255)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      background: theme.palette.background.highlight,
      color: theme.palette.text.highlight,
    },
  },
}));

export function SongCard({ song }: { song: Song }): JSX.Element {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const selectSong = useCallback(() => {
    dispatch(
      loadSong({
        name: song.name,
        album: song.album,
        artist: song.artist,
        picture: song.pictureUrl,
        audioFile: song.audioUrl,
        timeCursor: 0,
        id: song.id,
      })
    );
  }, [dispatch, song]);

  return (
    <article className={classes.wrapper}>
      <div className={classes.imageWrapper}>
        <img
          draggable={false}
          className={classes.image}
          src={getDownloadUrl(song.pictureUrl)}
        ></img>
        <div className={classes.operations}>
          <div className={classes.operationBtn} onClick={selectSong}>
            <PlayArrowIcon fontSize="small" />
          </div>
          <div className={classes.operationBtn}>
            <MoreHorizIcon fontSize="small" />
          </div>
        </div>
      </div>
      <div>
        <p className={classes.title}>{song.name}</p>
        <p className={classes.artist}>{song.artist}</p>
      </div>
    </article>
  );
}
