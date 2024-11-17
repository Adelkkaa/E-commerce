import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IOutletsSlice {
  _init: boolean;
  guid: string | null;
  name: string | null;
  price_type_guid: string | null;
}

const initialState: IOutletsSlice = {
  _init: false,
  guid: null,
  name: null,
  price_type_guid: null,
};

export const OutletsSlice = createSlice({
  name: "Outlets",
  initialState,
  reducers: {
    setOutlet(
      state,
      { payload }: PayloadAction<Omit<IOutletsSlice, "_init"> | null>,
    ) {
      localStorage.setItem("outlet", JSON.stringify(payload));
      return {
        ...state,
        ...payload,
      };
    },
    initOutlets(state) {
      const payload = JSON.parse(localStorage.getItem("outlet") || "{}");
      return {
        ...state,
        ...payload,
        _init: true,
      };
    },
  },
});

export const outletsActions = OutletsSlice.actions;
export const outletsReducer = OutletsSlice.reducer;
