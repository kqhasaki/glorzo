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
import { updateControls, play, pause } from "@glorzo-player/store/playerStateSlice";
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
    width: "30%",
    display: "flex",
    justifyContent: "center",
    gap: "4px",
    alignItems: "center",
  },
  songNavigator: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    alignItems: "center",
  },
  songPlayer: {
    width: "40%",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  slider: {
    WebkitAppRegion: "no-drag",
    width: "60%",
    height: "50%",
    maxWidth: "80px",
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

  return (
    <div className={classes.wrapper}>
      <div className={classes.songNavigator}>
        <Button variant="link" color="secondary" onClick={changePlayerStrategy}>
          {playerState.controls.strategy === "RANDOM" && <ShuffleIcon fontSize="small" />}
          {playerState.controls.strategy === "LOOP_SINGLE" && <RepeatOneIcon fontSize="small" />}
          {playerState.controls.strategy === "LOOP_LIST" && <RepeatIcon fontSize="small" />}
        </Button>

        <div>
          <Button variant="link" color="secondary" disabled={playerState.status === "IDLE"}>
            <FastRewindIcon />
          </Button>
          {playerState.status !== "PLAYING" ? (
            <Button
              variant="link"
              color="secondary"
              disabled={playerState.status === "IDLE"}
              onClick={() => dispatch(play())}
            >
              <PlayArrowIcon />
            </Button>
          ) : (
            <Button variant="link" color="secondary" onClick={() => dispatch(pause())}>
              <PauseIcon />
            </Button>
          )}
          <Button variant="link" color="secondary" disabled={playerState.status === "IDLE"}>
            <FastForwardIcon />
          </Button>
        </div>
      </div>
      <div className={classes.songPlayer}>
        <audio ref={audioRef} src={audioSource}></audio>
        {playerState.song?.name}
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
