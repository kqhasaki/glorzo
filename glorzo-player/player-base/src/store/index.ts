import { configureStore } from "@reduxjs/toolkit";
import localSongsReducer from "./localSongsSlice";
import remoteSongsReducer from "./remoteSongsSlice";

const store = configureStore({
  reducer: {
    localSongs: localSongsReducer,
    remoteSongs: remoteSongsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispacth = typeof store.dispatch;

export default store;
