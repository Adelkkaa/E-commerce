import { baseApi } from "@/shared/api/baseApi";
import { IContactFormSchemaType } from "../model/ContactForm.schema";

export const contactFormApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createNewApplication: build.mutation<
      IContactFormSchemaType,
      IContactFormSchemaType
    >({
      query: (body) => {
        return {
          url: `contact-me`,
          method: "post",
          body,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useCreateNewApplicationMutation } = contactFormApi;
