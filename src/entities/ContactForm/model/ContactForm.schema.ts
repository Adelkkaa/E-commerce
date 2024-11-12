import { z } from "zod";

export const ContactFormSchema = z.object({
  full_name: z
    .string({ required_error: "Поле обязательно для заполнения" })
    .min(8, "Минимальное количество символов - 8"),
  email: z
    .string({ required_error: "Поле обязательно для заполнения" })
    .email("Введите корректный Email"),
  phone: z
    .string({
      required_error: "Поле обязательно для заполнения",
    })
    .transform((val) => val.replaceAll(" ", ""))
    .refine((val) => val.length === 16, { message: "Неправильный номер" }),
  is_company: z.boolean(),
});

export type IContactFormSchemaInitialType = z.input<typeof ContactFormSchema>;
export type IContactFormSchemaType = z.output<typeof ContactFormSchema>;
