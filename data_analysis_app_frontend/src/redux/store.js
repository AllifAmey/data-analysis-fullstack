import { configureStore } from "@reduxjs/toolkit";
import YellowSubHydroReducer from "./YellowSubHydroData";

export const store = configureStore({
  reducer: {
    YellowSubHydroData: YellowSubHydroReducer,
  },
});
