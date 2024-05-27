import { z } from "zod";

export const StoreDialogSchema = z.object({
  store: z
    .string({ required_error: "Поле обязательно для заполнения" })
    .min(2, "Поле обязательно для заполнения"),
});

export type IStoreDialogSchemaInitialType = z.input<typeof StoreDialogSchema>;
export type IStoreDialogSchemaType = z.output<typeof StoreDialogSchema>;
