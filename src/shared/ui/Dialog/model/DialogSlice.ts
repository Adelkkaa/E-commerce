import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ICurrentDialog =
  | "login"
  | "outlets-auth"
  | "outlets"
  | "contact"
  | "contactSuccess"
  | "cartSuccess"
  | null;

interface IDialogSlice {
  isOpen: boolean;
  disableClose: boolean;
  currentDialog: ICurrentDialog;
}

const initialState: IDialogSlice = {
  isOpen: false,
  disableClose: false,
  currentDialog: null,
};

export const DialogSlice = createSlice({
  name: "Dialog",
  initialState,
  reducers: {
    selectCurrentDialog(state, { payload }: PayloadAction<ICurrentDialog>) {
      return {
        ...state,
        isOpen: true,
        currentDialog: payload,
        disableClose: payload === "outlets-auth",
      };
    },
    selectIsOpen(state, { payload }: PayloadAction<boolean>) {
      return {
        ...state,
        isOpen: payload,
        currentDialog: null,
        disableClose: false,
      };
    },
  },
});

export const dialogActions = DialogSlice.actions;
export const dialogReducer = DialogSlice.reducer;
