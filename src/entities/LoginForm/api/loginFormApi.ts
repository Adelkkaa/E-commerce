import { outletsActions } from "@/entities/Outlets";
import { baseApi } from "@/shared/api/baseApi";
import { ILoginFormSchemaType } from "../model/LoginForm.schema";

export const loginFormApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<string, ILoginFormSchemaType>({
      query: (body) => {
        return {
          url: `auth/login`,
          method: "post",
          body,
        };
      },
    }),
    logout: build.mutation<string, void>({
      query: () => {
        return {
          url: `auth/logout`,
          method: "post",
          body: {},
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(outletsActions.resetOutlets());
        } catch (error) {}
      },
    }),
  }),

  overrideExisting: true,
});

export const { useLoginMutation, useLogoutMutation } = loginFormApi;
