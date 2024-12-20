import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  IOutletsDialogSchemaInitialType,
  IOutletsDialogSchemaType,
  IOutletsItem,
  outletsActions,
  OutletsDialogSchema,
  useGetOutletsQuery,
} from "@/entities/Outlets";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import {
  Button,
  ControlledSelect,
  dialogActions,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";

export const OutletsDialog = () => {
  const { selectIsOpen, selectCurrentDialog } = dialogActions;
  const { setOutlet } = outletsActions;

  const { guid } = useAppSelector((state) => state.outletsReducer);
  const { currentDialog } = useAppSelector((state) => state.dialogReducer);

  const dispatch = useAppDispatch();
  const { data: outlets, isLoading } = useGetOutletsQuery();
  const methods = useForm<
    IOutletsDialogSchemaInitialType,
    unknown,
    IOutletsDialogSchemaType
  >({
    resolver: zodResolver(OutletsDialogSchema),
    values: {
      outlet: guid || "",
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IOutletsDialogSchemaType> = async (
    formData,
  ) => {
    const currentOutlet = outlets?.find(
      (outlet) => outlet.guid === formData.outlet,
    );
    dispatch(setOutlet(currentOutlet as IOutletsItem));
    dispatch(selectIsOpen(false));

    if (currentDialog === "outlets-auth") {
      dispatch(selectCurrentDialog("development"));
    }
  };

  const selectData =
    outlets?.map((outlet) => ({
      value: outlet.guid,
      label: outlet.name,
    })) || [];
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
            options={selectData}
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
