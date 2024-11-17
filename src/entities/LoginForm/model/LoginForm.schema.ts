import { z } from "zod";

export const LoginFormSchema = z.object({
  login: z
    .string({ required_error: "Поле обязательно для заполнения" })
    .min(3, "Минимальное количество символов - 3"),
  password: z
    .string({ required_error: "Поле обязательно для заполнения" })
    .min(3, "Минимальное количество символов - 3"),
});

export type ILoginFormSchemaInitialType = z.input<typeof LoginFormSchema>;
export type ILoginFormSchemaType = z.output<typeof LoginFormSchema>;
