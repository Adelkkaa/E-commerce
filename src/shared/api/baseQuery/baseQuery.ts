import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { outletsActions } from "@/entities/Outlets/model/OutletsSlice";
import { dialogActions } from "@/shared/ui";

export const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1/",
  credentials: "include",
});

export const baseQueryWithReauth: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;

    if (status === 401) {
      api.dispatch(outletsActions.resetOutlets());
      if (api.type === "mutation") {
        api.dispatch(dialogActions.selectCurrentDialog("login"));
      }
    }
  }

  return result;
};
