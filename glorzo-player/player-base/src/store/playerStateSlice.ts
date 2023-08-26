import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerState, ActivePlayerState, PlayerControls } from "@glorzo-player/types/Songs";

const initialState: {
  value: PlayerState;
} = {
  value: {
    status: "IDLE",
    song: undefined,
    controls: {
      volume: 0.5,
      strategy: "LOOP_SINGLE",
    },
  },
};

export const playerStateSlice = createSlice({
  name: "playerState",
  initialState,
  reducers: {
    pause: (state) => {
      if (state.value.status === "PLAYING") {
        state.value.status = "PAUSED";
      }
    },
    play: (state) => {
      if (state.value.status === "PAUSED") {
        state.value.status = "PLAYING";
      }
    },
    quit: (state) => {
      state.value = {
        ...state.value,
        status: "IDLE",
        song: undefined,
      };
    },
    loadSong: (state, action: PayloadAction<ActivePlayerState["song"]>) => {
      state.value = {
        ...state.value,
        status: "PLAYING",
        song: action.payload,
      };
    },
    updateSongStatus: (state, action: PayloadAction<Partial<ActivePlayerState["song"]>>) => {
      if (state.value.status !== "IDLE") {
        state.value.song = {
          ...state.value.song,
          ...action.payload,
        };
      }
    },
    updateControls: (state, action: PayloadAction<Partial<PlayerControls>>) => {
      state.value.controls = {
        ...state.value.controls,
        ...action.payload,
      };
    },
  },
});

export const { pause, play, updateSongStatus, quit, loadSong, updateControls } =
  playerStateSlice.actions;

export default playerStateSlice.reducer;
