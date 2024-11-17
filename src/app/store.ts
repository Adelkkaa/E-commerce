import { configureStore } from "@reduxjs/toolkit";
import { dialogReducer } from "@/entities/Dialog";
import { outletsReducer } from "@/entities/Outlets";
import { productListReducer } from "@/entities/ProductList";
import { baseApi } from "@/shared/api/baseApi";

export const store = configureStore({
  reducer: {
    dialogReducer,
    productListReducer,
    outletsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([baseApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
