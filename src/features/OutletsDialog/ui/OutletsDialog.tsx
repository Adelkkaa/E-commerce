import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { dialogActions } from "@/entities/Dialog";
import {
  IOutletsDialogSchemaInitialType,
  IOutletsDialogSchemaType,
  OutletsDialogSchema,
  useGetOutletsQuery,
} from "@/entities/Outlets";
import { useAppDispatch } from "@/shared/hooks/use-redux";
import {
  Button,
  ControlledSelect,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";

export const OutletsDialog = () => {
  const { selectIsOpen } = dialogActions;
  const dispatch = useAppDispatch();
  const { data: outlets, isLoading } = useGetOutletsQuery();
  const methods = useForm<
    IOutletsDialogSchemaInitialType,
    unknown,
    IOutletsDialogSchemaType
  >({
    resolver: zodResolver(OutletsDialogSchema),
    values: {
      outlet: "",
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IOutletsDialogSchemaType> = async (newData) => {
    console.log("Form Data", newData);
    dispatch(selectIsOpen(false));
  };
  return (
    <>
      <DialogHeader className="gap-[10px] justify-center items-center">
        <DialogTitle className="text-modalTitle max-md:text-[30px] text-center ">
          Выберите торговую точку
        </DialogTitle>
      </DialogHeader>
      <FormProvider {...methods}>
        <form
          id="outletsForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <ControlledSelect
            name="outlet"
            labelText="Торговая точка"
            disabled={isLoading}
            options={outlets || []}
            placeholder="Выберите торговую точку"
          />
        </form>
      </FormProvider>
      <DialogFooter className="!flex-col gap-[30px]">
        <Button
          type="submit"
          form="outletsForm"
          className="flex-1 w-full min-h-[50px] !text-textL text-white !rounded-[8px] "
        >
          Выбрать
        </Button>
      </DialogFooter>
    </>
  );
};
