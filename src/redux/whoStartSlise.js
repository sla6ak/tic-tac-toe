import { createSlice } from "@reduxjs/toolkit";

const initialPlayer = "player";

export const whoStart = createSlice({
  name: "player",
  initialState: initialPlayer,
  reducers: {
    nextBot(_state, action) {
      return action.payload;
    },
  },
});
export const { nextBot } = whoStart.actions;
