import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@stores/store";

export type SliceState = {
  drawerOpen: boolean;
};

const initialState: SliceState = {
  drawerOpen: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    changeOpenState: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
  },
});

export const drawerState = (state: RootState): boolean =>
  state.drawer.drawerOpen;
export const { changeOpenState } = drawerSlice.actions;
export default drawerSlice;
