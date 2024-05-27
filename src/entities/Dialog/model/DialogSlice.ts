import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ICurrentDialog =
  | "login"
  | "trading"
  | "contact"
  | "contactSuccess"
  | "cartSuccess"
  | "productPreview"
  | null;

interface IDialogSlice {
  isOpen: boolean;
  currentDialog: ICurrentDialog;
}

const initialState: IDialogSlice = {
  isOpen: false,
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
      };
    },
    selectIsOpen(state, { payload }: PayloadAction<boolean>) {
      return {
        ...state,
        isOpen: payload,
        currentDialog: null,
      };
    },
  },
});

export const dialogActions = DialogSlice.actions;
export const dialogReducer = DialogSlice.reducer;
