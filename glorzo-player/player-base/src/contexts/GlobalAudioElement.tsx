import { ReactNode, useEffect, createContext, useContext, useState } from "react";
import { downloadFromUrl } from "@glorzo-player/api/request";
import { updateSongStatus, play, pause } from "@glorzo-player/store/playerStateSlice";
import { useAppSelector, useAppDispatch } from "@glorzo-player/hooks";

type GlobalAudioGetter = HTMLAudioElement;

const GlobalAudioElementContext = createContext<GlobalAudioGetter>(new Audio());

export const useGlobalAudioElement = () => {
  return useContext(GlobalAudioElementContext);
};

export const GlobalAudioElementProvider = (props: { children: ReactNode }) => {
  const [globalAudioElement] = useState<HTMLAudioElement>(new Audio());
  const playerState = useAppSelector((state) => state.playerState.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    globalAudioElement.volume = playerState.controls.volume;
  }, [playerState.controls.volume, globalAudioElement]);

  useEffect(() => {
    const status = playerState.status;
    if (status === "PAUSED") {
      globalAudioElement.pause();
    }
    if (status === "PLAYING") {
      setTimeout(() => {
        globalAudioElement.play();
      }, 200);
    }
  }, [playerState.status, globalAudioElement]);

  useEffect(() => {
    const audioFile = playerState.song?.audioFile;
    dispatch(pause());
    if (typeof audioFile === "string") {
      (async () => {
        const data = await downloadFromUrl(audioFile);
        globalAudioElement.src = URL.createObjectURL(new Blob([data], { type: "audio/mp3" }));
        dispatch(play());
      })();
    }
    if (ArrayBuffer.isView(audioFile)) {
      globalAudioElement.src = URL.createObjectURL(new Blob([audioFile], { type: "audio/mp3" }));
      dispatch(play());
    }
  }, [playerState.song?.audioFile, dispatch, globalAudioElement]);

  useEffect(() => {
    document.body.appendChild(globalAudioElement);
    globalAudioElement.addEventListener("timeupdate", () => {
      dispatch(
        updateSongStatus({
          timeCursor: globalAudioElement.currentTime,
          duration: globalAudioElement.duration,
        })
      );
    });
  }, [globalAudioElement, dispatch]);

  return (
    <GlobalAudioElementContext.Provider value={globalAudioElement}>
      {props.children}
    </GlobalAudioElementContext.Provider>
  );
};
