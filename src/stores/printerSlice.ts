import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@stores/store";

export type SliceState = {
  displayPrinterOnMenu: boolean;
  printerAvailable: boolean;
  printerPrinting: boolean;
  printerTooltip: string;
  printerName: string;
};

const initialState: SliceState = {
  displayPrinterOnMenu: false,
  printerAvailable: false,
  printerPrinting: false,
  printerTooltip: "",
  printerName: "loading...",
};

const printerSlice = createSlice({
  name: "printer",
  initialState,
  reducers: {
    changeAvailable: (
      state,
      { payload }: { payload: { available: boolean; tooltipMessage: string } }
    ) => {
      state.printerAvailable = payload.available;
      state.printerTooltip = payload.tooltipMessage;
    },
    displayOnMenu: (state, { payload }: { payload: boolean }) => {
      state.displayPrinterOnMenu = payload;
    },
    printing: (state, { payload }: { payload: boolean }) => {
      state.printerPrinting = payload;
    },
    resetState: () => initialState,
  },
});

export const printerTooltipState = (state: RootState): string =>
  state.printer.printerTooltip;
export const printerAvailableState = (state: RootState): boolean =>
  state.printer.printerAvailable;
export const printerDisplayOnMenuState = (state: RootState): boolean =>
  state.printer.displayPrinterOnMenu;
export const printerPrintingState = (state: RootState): boolean =>
  state.printer.printerPrinting;
export const { changeAvailable, displayOnMenu, printing, resetState } =
  printerSlice.actions;
export default printerSlice;
