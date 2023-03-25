import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  floodSeverityDataset: [],
};

export const YellowSubHydroDataSlice = createSlice({
  name: "YellowSubHydroData",
  initialState,
  reducers: {
    referenceCode: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    placeInStore: (state, action) => {
      // this just inputs the data into the store
      // the list of data is spread using the spread operator.
      state.floodSeverityDataset = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { placeInStore } = YellowSubHydroDataSlice.actions;

export default YellowSubHydroDataSlice.reducer;
