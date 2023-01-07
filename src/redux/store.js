import { configureStore } from "@reduxjs/toolkit";
import { audioManager } from "./audioManager";

export const store = configureStore({
  reducer: { audioManager: audioManager.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
