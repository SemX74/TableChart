import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IList } from "../Services/Interfaces";

export interface DataState {
  value: IList[];
}

const initialState: DataState = {
  value: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<IList[]>) => {
      state.value = action.payload;
    },
    sortByName: (state) => {
      state.value.sort((a, b) => (a.name < b.name ? -1 : 1));
    },
    sortByNameDown: (state) => {
      state.value.sort((a, b) => (a.name > b.name ? -1 : 1));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addData, sortByName, sortByNameDown } = dataSlice.actions;

export default dataSlice.reducer;
