import { configureStore } from "@reduxjs/toolkit";
import { muteState } from "./muteState";
import { audioManager } from "./audioManager";

export const store = configureStore({
  reducer: { muteState: muteState.reducer, audioManager: audioManager.reducer },
});
