import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  homeMusic: true,
};

export const audioManager = createSlice({
  name: "sounds",
  initialState,
  reducers: {
    setSounds(_state, action) {
      return action.payload;
    },
  },
});

export const { setSounds } = audioManager.actions;
