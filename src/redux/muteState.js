import { createSlice } from "@reduxjs/toolkit";
const initialState = true;

export const muteState = createSlice({
  name: "mute",
  initialState,
  reducers: {
    setMute(_state, action) {
      return action.payload;
    },
  },
});

export const { setMute } = muteState.actions;
