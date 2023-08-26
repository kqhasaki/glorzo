import { useAppSelector, useAppDispatch } from "@glorzo-player/hooks";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Button } from "../Button";
import { makeStyles } from "@glorzo-player/theme";
import { useCallback } from "react";
import { updateControls, play, pause } from "@glorzo-player/store/playerStateSlice";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
  controls: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
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
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: theme.palette.background.secondary,
  },
}));

export function MiniPlayer(): JSX.Element {
  const playerState = useAppSelector((state) => state.playerState.value);
  const dispatch = useAppDispatch();
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
      <div className={classes.songPlayer}>{playerState.song?.name}</div>
      <div className={classes.controls}>control</div>
    </div>
  );
}
