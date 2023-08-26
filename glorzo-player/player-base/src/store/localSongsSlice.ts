import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LocalSong } from "@glorzo-player/types/Songs";

export type LocalSongsState = {
  value: Array<LocalSong>;
};

const initialState: LocalSongsState = { value: [] };

export const localSongsSlice = createSlice({
  name: "localSongs",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<LocalSong[] | LocalSong>) => {
      if (Array.isArray(action.payload)) {
        state.value.push(...action.payload);
      } else {
        state.value.push(action.payload);
      }
    },
    remove: (state, action: PayloadAction<LocalSong["sha256"]>) => {
      const index = state.value.findIndex((item) => item.sha256 === action.payload);
      if (index !== -1) {
        state.value.splice(index, 1);
      }
    },
  },
});

export const { add, remove } = localSongsSlice.actions;

export default localSongsSlice.reducer;
