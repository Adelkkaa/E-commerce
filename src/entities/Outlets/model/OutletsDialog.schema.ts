import { z } from "zod";

export const OutletsDialogSchema = z.object({
  outlet: z
    .string({ required_error: "Поле обязательно для заполнения" })
    .min(2, "Поле обязательно для заполнения"),
});

export type IOutletsDialogSchemaInitialType = z.input<
  typeof OutletsDialogSchema
>;
export type IOutletsDialogSchemaType = z.output<typeof OutletsDialogSchema>;
