import { createSlice } from "@reduxjs/toolkit";

// в состояние будем класть запущеные плеером треки и обрабатывать их потом.
const initialState = {
  mute: true,
  drawMusic: false,
  looseMusic: false,
  winMusic: false,
  homeMusic: false,
  moveMusic: false,
};

// state получает все состояние инитиал а action это то что диспачим в редакс
export const audioManager = createSlice({
  name: "sounds",
  initialState,
  reducers: {
    muteStatus(state, action) {
      state.mute = action.payload;
      if (action.payload) {
        state.drawMusic = !action.payload;
        state.looseMusic = !action.payload;
        state.winMusic = !action.payload;
        state.moveMusic = !action.payload;
        state.homeMusic = !action.payload;
      }
      if (!action.payload) {
        state.homeMusic = !action.payload;
      }
    },
    drawMusicStatus(state, action) {
      state.drawMusic = action.payload;
    },
    looseMusicStatus(state, action) {
      state.looseMusic = action.payload;
    },
    winMusicStatus(state, action) {
      state.winMusic = action.payload;
    },
    homeMusicStatus(state, action) {
      state.homeMusic = action.payload;
    },
    moveMusicStatus(state, action) {
      state.moveMusic = action.payload;
    },
  },
});

export const {
  muteStatus,
  drawMusicStatus,
  looseMusicStatus,
  winMusicStatus,
  homeMusicStatus,
  moveMusicStatus,
} = audioManager.actions;
