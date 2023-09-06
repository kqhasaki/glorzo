import { configureStore } from "@reduxjs/toolkit";
import localSongsReducer from "./localSongsSlice";
import remoteSongsReducer from "./remoteSongsSlice";
import playerStateReducer from "./playerStateSlice";
import userStateReducer from "./userSlice";
import globalLoginReducer from "./globalLoginSlice";

const store = configureStore({
  reducer: {
    localSongs: localSongsReducer,
    remoteSongs: remoteSongsReducer,
    playerState: playerStateReducer,
    userState: userStateReducer,
    globalLoginState: globalLoginReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispacth = typeof store.dispatch;

export default store;
