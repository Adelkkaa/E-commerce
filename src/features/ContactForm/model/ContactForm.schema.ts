import { z } from "zod";

export const ContactFormSchema = z.object({
  fio: z
    .string({ required_error: "Поле обязательно для заполнения" })
    .min(3, "Минимальное количество символов - 3"),
  email: z
    .string({ required_error: "Поле обязательно для заполнения" })
    .min(3, "Минимальное количество символов - 3"),
  phone: z
    .string({ required_error: "Поле обязательно для заполнения" })
    .min(3, "Минимальное количество символов - 3"),
  message: z
    .string({ required_error: "Поле обязательно для заполнения" })
    .min(3, "Минимальное количество символов - 3"),
});

export type IContactFormSchemaInitialType = z.input<typeof ContactFormSchema>;
export type IContactFormSchemaType = z.output<typeof ContactFormSchema>;
