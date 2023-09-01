import { getFormattedDuration } from "@glorzo-player/utils";
import { useAppSelector, useAppDispatch } from "@glorzo-player/hooks";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Button } from "../Button";
import { makeStyles } from "@glorzo-player/theme";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  updateControls,
  play,
  pause,
  updateSongStatus,
} from "@glorzo-player/store/playerStateSlice";
import { getDownloadUrl } from "@glorzo-player/api/request";
import { Slider } from "../Slider";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
  controls: {
    height: "100%",
    width: "25%",
    display: "flex",
    justifyContent: "center",
    gap: "4px",
    alignItems: "center",
  },
  songNavigator: {
    width: "25%",
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    alignItems: "center",
  },
  songPlayer: {
    width: "50%",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: theme.palette.background.transparent.secondary,
  },
  songPicture: {
    height: "100%",
    aspectRatio: "1 / 1",
    "& img": {
      height: "100%",
    },
  },
  songInfo: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    position: "relative",
  },
  songTitle: {
    fontSize: "14px",
    marginTop: "8px",
    color: theme.palette.text.primary,
  },
  songArtist: {
    marginTop: "8px",
    fontSize: "13px",
  },
  slider: {
    WebkitAppRegion: "no-drag",
    width: "60%",
    height: "50%",
    maxWidth: "80px",
  },
  songCurrentTime: {
    position: "absolute",
    bottom: "4px",
    left: "4px",
    fontSize: "12px",
    color: theme.palette.text.secondary,
  },
  songDuration: {
    position: "absolute",
    bottom: "4px",
    right: "4px",
    fontSize: "12px",
    color: theme.palette.text.secondary,
  },
}));

export function MiniPlayer(): JSX.Element {
  const playerState = useAppSelector((state) => state.playerState.value);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { classes } = useStyles();

  const changePlayerStrategy = useCallback(() => {
    switch (playerState.controls.strategy) {
      case "LOOP_LIST":
        dispatch(updateControls({ strategy: "LOOP_SINGLE" }));
        return;
      case "LOOP_SINGLE":
        dispatch(updateControls({ strategy: "RANDOM" }));
        return;
      case "RANDOM":
        dispatch(updateControls({ strategy: "LOOP_LIST" }));
        return;
    }
  }, [dispatch, playerState.controls.strategy]);

  const audioSource = useMemo(() => {
    if (playerState.song == undefined) {
      return undefined;
    }
    const { audioFile } = playerState.song;
    if (typeof audioFile === "string") {
      return getDownloadUrl(audioFile);
    } else {
      // TODO: implement local song situation
      return undefined;
    }
  }, [playerState.song]);

  const pictureSource = useMemo(() => {
    if (playerState.song == undefined) {
      return undefined;
    }
    const { picture } = playerState.song;
    if (typeof picture === "string") {
      return getDownloadUrl(picture);
    } else {
      // TODO: implement local song situation
      return undefined;
    }
  }, [playerState.song]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      try {
        if (playerState.status === "PLAYING") {
          audioElement.pause();
          setTimeout(() => {
            audioElement.play();
          }, 150);
        }
        if (playerState.status === "PAUSED") {
          audioElement.pause();
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [playerState.song?.id, playerState.status]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.volume = playerState.controls.volume;
    }
  }, [playerState.controls.volume]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement == undefined) {
      return;
    }
    const timeupdateHanlder = () => {
      dispatch(
        updateSongStatus({ duration: audioElement.duration, timeCursor: audioElement.currentTime })
      );
    };
    audioElement.addEventListener("timeupdate", timeupdateHanlder);

    return () => {
      audioElement.removeEventListener("timeupdate", timeupdateHanlder);
    };
  }, [playerState.song?.id, dispatch]);

  const handleChangeTimeCursor = useCallback((value: number) => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const timeCursor = audioElement.duration * value;
      audioElement.currentTime = timeCursor;
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.songNavigator}>
        <Button variant="link" color="secondary" onClick={changePlayerStrategy}>
          {playerState.controls.strategy === "RANDOM" && <ShuffleIcon fontSize="small" />}
          {playerState.controls.strategy === "LOOP_SINGLE" && <RepeatOneIcon fontSize="small" />}
          {playerState.controls.strategy === "LOOP_LIST" && <RepeatIcon fontSize="small" />}
        </Button>

        <div>
          <Button
            variant="link"
            color="secondary"
            disabled={playerState.status === "IDLE"}
            size="small"
          >
            <FastRewindIcon />
          </Button>
          {playerState.status !== "PLAYING" ? (
            <Button
              variant="link"
              color="secondary"
              disabled={playerState.status === "IDLE"}
              onClick={() => dispatch(play())}
              size="small"
            >
              <PlayArrowIcon />
            </Button>
          ) : (
            <Button variant="link" color="secondary" onClick={() => dispatch(pause())} size="small">
              <PauseIcon />
            </Button>
          )}
          <Button variant="link" color="secondary" disabled={playerState.status === "IDLE"}>
            <FastForwardIcon />
          </Button>
        </div>
      </div>
      <div className={classes.songPlayer}>
        <audio ref={audioRef} src={audioSource} style={{ display: "none" }} />
        <div className={classes.songPicture}>{pictureSource && <img src={pictureSource} />}</div>
        <div className={classes.songInfo}>
          {playerState.song && (
            <>
              <div className={classes.songTitle}>{playerState.song?.name}</div>
              <div className={classes.songArtist}>
                {playerState.song?.artist} - {playerState.song?.album}
              </div>

              {playerState.song.duration != undefined &&
                playerState.song.timeCursor != undefined && (
                  <>
                    <div className={classes.songDuration}>
                      {getFormattedDuration(playerState.song.duration)}
                    </div>
                    <div className={classes.songCurrentTime}>
                      {getFormattedDuration(playerState.song.timeCursor)}
                    </div>
                    <Slider
                      value={playerState.song.timeCursor / playerState.song.duration!}
                      onChange={handleChangeTimeCursor}
                    />
                  </>
                )}
            </>
          )}
        </div>
      </div>
      <div className={classes.controls}>
        <Button
          variant="link"
          color="secondary"
          size="small"
          onClick={() => dispatch(updateControls({ volume: 0 }))}
        >
          <VolumeDown fontSize="small" />
        </Button>
        <div className={classes.slider}>
          <Slider
            value={playerState.controls.volume}
            onChange={(value) => dispatch(updateControls({ volume: value }))}
          />
        </div>
        <Button
          variant="link"
          color="secondary"
          size="small"
          onClick={() => dispatch(updateControls({ volume: 1.0 }))}
        >
          <VolumeUp fontSize="small" />
        </Button>
      </div>
    </div>
  );
}
