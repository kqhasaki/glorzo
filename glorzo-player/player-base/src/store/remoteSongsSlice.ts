import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RemoteSong } from "@glorzo-player/types/LocalSong";
import { getAllSongs } from "@glorzo-player/api/request";

export type RemoteSongsState = {
  value: Array<RemoteSong>;
};

const initialState: RemoteSongsState = {
  value: [],
};

export const fetchRemoteSongs = createAsyncThunk("remoteSongs/fetch", async () => {
  return await getAllSongs();
});

export const remoteSongsSlice = createSlice({
  name: "remoteSongs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRemoteSongs.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export default remoteSongsSlice.reducer;
