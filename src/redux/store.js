import { configureStore } from "@reduxjs/toolkit";
import { whoStart } from "./whoStartSlise";

export const store = configureStore({
  reducer: {
    nextStart: whoStart.reducer,
  },
});
