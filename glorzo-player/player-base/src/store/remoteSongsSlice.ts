import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RemoteSong } from "@glorzo-player/types/LocalSong";

export type RemoteSongsState = {
  value: Array<RemoteSong>;
};

const initialState: RemoteSongsState = {
  value: [],
};

export const remoteSongsSlice = createSlice({
  name: "remoteSongs",
  initialState,
  reducers: {
    update: (_, action: PayloadAction<RemoteSong[]>) => {
      return { value: action.payload };
    },
  },
});

export const { update } = remoteSongsSlice.actions;

export default remoteSongsSlice.reducer;
