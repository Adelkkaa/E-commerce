import { isAfter, isValid } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { z } from "zod";

export const CartInfoSchema = z.object({
  store: z
    .string({ required_error: "Поле обязательно для заполнения" })
    .min(3, "Поле обязательно для заполнения"),
  date: z
    .date({
      required_error: "Введите дату рождения",
    })
    .nullable()
    .refine(
      (arg) => {
        if (!arg) return false;
        const today = new Date();
        return isValid(arg) && isAfter(arg, today);
      },
      { message: "Дата доставки должна быть позже сегодняшней даты" },
    )
    .transform((date) => {
      if (!date) return null;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return formatInTimeZone(date, timeZone, "yyyy-MM-dd");
    }),
  comment: z
    .string({ required_error: "Поле обязательно для заполнения" })
    .min(3, "Поле обязательно для заполнения"),
});

export type ICartInfoSchemaInitialType = z.input<typeof CartInfoSchema>;
export type ICartInfoSchemaType = z.output<typeof CartInfoSchema>;
