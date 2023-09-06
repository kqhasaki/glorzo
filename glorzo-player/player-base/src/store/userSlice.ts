import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@glorzo-player/types/User";
import { getCurrentUser } from "@glorzo-player/utils";

export type UserState = {
  value: User | undefined;
};

const initialState: UserState = {
  value: getCurrentUser(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state) => {
      const user = getCurrentUser();
      state.value = user;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
