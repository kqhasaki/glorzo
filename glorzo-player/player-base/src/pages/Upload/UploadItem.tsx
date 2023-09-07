import { makeStyles } from "@glorzo-player/theme";
import { arrayBufferToBase64Str, getFormattedDuration } from "@glorzo-player/utils";
import type { LocalSong as Song } from "@glorzo-player/types/Songs";
import { clsx } from "clsx";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@glorzo-player/components/Button";
import { useGlobalClickMenu } from "@glorzo-player/contexts/GlobalClickMenu";
import { useCallback } from "react";

type UploadItemPropsType = {
  song: Song;
};

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    width: "100%",
    height: "60px",
    padding: "6px",
    background: theme.palette.background.secondary,
    "&:nth-of-type(odd)": {
      background: theme.palette.background.paper,
    },
    fontSize: "13px",
    display: "flex",
    gap: "16px",
    alignItems: "center",
    color: theme.palette.text.primary,
    "& > *": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  image: {
    height: "100%",
    aspectRatio: "1 / 1",
    borderRadius: "4px",
    border: `0.5px solid ${theme.palette.divider.primary}`,
  },
  basic: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "40%",
    position: "relative",
  },
  artist: {
    color: theme.palette.text.secondary,
    width: "25%",
  },
  album: {
    color: theme.palette.text.secondary,
    width: "25%",
  },
  duration: {
    color: theme.palette.text.secondary,
    width: "10%",
  },
  header: {
    color: theme.palette.text.secondary,
    fontWeight: "bold",
  },
  options: {
    position: "absolute",
    right: "0px",
  },
}));

export function UploadHeader(): JSX.Element {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={clsx([classes.basic, classes.header])}>Song</div>
      <div className={clsx([classes.artist, classes.header])}>artist</div>
      <div className={clsx([classes.album, classes.header])}>album</div>
      <div className={clsx([classes.duration, classes.header])}>duration</div>
    </div>
  );
}

export default function UploadItem({ song }: UploadItemPropsType): JSX.Element {
  const { classes } = useStyles();
  const { createGlobalClickMenu } = useGlobalClickMenu();

  const openOptions = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const clientRects = (e.target as HTMLButtonElement).getBoundingClientRect();
      createGlobalClickMenu({ x: clientRects.left, y: clientRects.top }, ["播放", "删除"]);
    },
    [createGlobalClickMenu]
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes.basic}>
        <img
          className={classes.image}
          src={`data:${song.tags.picture.format};base64,${arrayBufferToBase64Str(
            song.tags.picture.data
          )}`}
          alt=""
        ></img>
        <div>{song.tags.title}</div>

        <div className={classes.options}>
          <Button variant="link" color="secondary" onClick={openOptions}>
            <MoreHorizIcon />
          </Button>
        </div>
      </div>

      <div className={classes.artist}>{song.tags.artist}</div>
      <div className={classes.album}>{song.tags.album}</div>
      <div className={classes.duration}>{getFormattedDuration(song.duration)}</div>
    </div>
  );
}
