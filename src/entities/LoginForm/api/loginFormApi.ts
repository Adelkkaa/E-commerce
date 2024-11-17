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
  }),
  overrideExisting: true,
});

export const { useLoginMutation } = loginFormApi;
