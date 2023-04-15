import { createSlice } from "@reduxjs/toolkit";

type floodSeverityDatasetTypes = {
  recent_floodDataIDs: string[] | null;
  label: string;
  data: (number | null)[];
  borderColor: string;
  backgroundColor: string;
};

// note on type decision:
// I put graphOptions to any as I can't control future Chartjs requirements.
type initialStateType = {
  floodSeverityDataset: floodSeverityDatasetTypes[];
  graphBottomlabel: string[];
  graphOptions: any;
};

const initialState: initialStateType = {
  floodSeverityDataset: [],
  graphBottomlabel: [],
  graphOptions: {},
};
// TODO: define state instead of any
export const YellowSubHydroDataSlice = createSlice({
  name: "YellowSubHydroData",
  initialState,
  reducers: {
    referenceCode: (state: any) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    placeInfloodSeverityDataset: (state: any, action) => {
      // this just inputs the flood severity dataset into the store
      // the list of data is spread using the spread operator.
      state.floodSeverityDataset = [...action.payload];
    },
    placeIngraphOptions: (state, action) => {
      // this inputs the options data into the store
      // the object data is spread using the spread operator
      state.graphOptions = { ...action.payload };
    },
    placeInBottomlabel: (state: any, action) => {
      // this inputs the options data into the store
      // the object data is spread using the spread operator
      state.graphBottomlabel = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  placeInfloodSeverityDataset,
  placeIngraphOptions,
  placeInBottomlabel,
} = YellowSubHydroDataSlice.actions;

export default YellowSubHydroDataSlice.reducer;
