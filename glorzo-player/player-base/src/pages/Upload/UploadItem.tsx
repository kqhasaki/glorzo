import jsmediatags from "jsmediatags";
import { useEffect, useState } from "react";
import { makeStyles } from "@glorzo-player/theme";
import { arrayBufferToBase64Str, getAudioDuration } from "@glorzo-player/utils";
import type { SongTags } from "@glorzo-player/types/Song";
import { clsx } from "clsx";

type UploadItemPropsType = {
  file: File;
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

export default function UploadItem({ file }: UploadItemPropsType): JSX.Element {
  const [tags, setTags] = useState<SongTags>();
  const [duration, setDuration] = useState<string>("...");
  const { classes } = useStyles();

  useEffect(() => {
    jsmediatags.read(file, {
      onSuccess(parsedTags) {
        const { picture, title, artist, album } = parsedTags.tags;
        setTags({
          picture: {
            format: picture?.format ?? "image/jpg",
            data: picture?.data ? new Uint8Array(picture.data).buffer : new Uint8Array().buffer,
          },
          title: title ?? "unkown",
          artist: artist ?? "unkown",
          album: album ?? "unkown",
        });
      },
      onError() {
        setTags(undefined);
      },
    });
  }, [file]);

  useEffect(() => {
    (async () => {
      const buffer = await file.arrayBuffer();
      const durationInSecs = await getAudioDuration(buffer);
      const min = Math.floor(durationInSecs / 60);
      const sec = Math.floor(durationInSecs % 60);
      setDuration(`${min}:${sec.toString().padStart(2, "0")}`);
    })();
  }, [file]);

  return (
    <div className={classes.wrapper}>
      {tags ? (
        <>
          <div className={classes.basic}>
            <img
              className={classes.image}
              src={`data:${tags.picture.format};base64,${arrayBufferToBase64Str(
                tags.picture.data
              )}`}
              alt=""
            ></img>
            <div>{tags.title}</div>
          </div>

          <div className={classes.artist}>{tags.artist}</div>
          <div className={classes.album}>{tags.album}</div>
          <div className={classes.duration}>{duration}</div>
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}
