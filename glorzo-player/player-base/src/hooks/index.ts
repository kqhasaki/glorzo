import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispacth } from "@glorzo-player/store";

export const useAppDispatch: () => AppDispacth = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
