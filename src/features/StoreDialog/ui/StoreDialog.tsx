import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { dialogActions } from "@/entities/Dialog";
import { useAppDispatch } from "@/shared/hooks/use-redux";
import {
  Button,
  ControlledSelect,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";
import {
  IStoreDialogSchemaInitialType,
  IStoreDialogSchemaType,
  StoreDialogSchema,
} from "../model/StoreDialog.schema";

export const StoreDialog = () => {
  const { selectIsOpen } = dialogActions;
  const dispatch = useAppDispatch();
  const methods = useForm<
    IStoreDialogSchemaInitialType,
    unknown,
    IStoreDialogSchemaType
  >({
    resolver: zodResolver(StoreDialogSchema),
    values: {
      store: "",
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IStoreDialogSchemaType> = async (newData) => {
    console.log("Form Data", newData);
    dispatch(selectIsOpen(false));
  };
  return (
    <>
      <DialogHeader className="gap-[10px] justify-center items-center">
        <DialogTitle className="text-modalTitle text-center ">
          Выберите торговую точку{" "}
        </DialogTitle>
      </DialogHeader>
      <FormProvider {...methods}>
        <form
          id="storeFoem"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <ControlledSelect
            name="store"
            labelText="Торговая точка"
            options={[
              { label: "hello", value: "123" },
              { label: "poka", value: "321" },
              { label: "huy", value: "333" },
              { label: "123", value: "4444" },
            ]}
            placeholder="Выберите торговую точку"
          />
        </form>
      </FormProvider>
      <DialogFooter className="!flex-col gap-[30px]">
        <Button
          type="submit"
          form="storeFoem"
          className="flex-1 w-full min-h-[50px] !text-textL text-white !rounded-[8px] "
        >
          Выбрать
        </Button>
      </DialogFooter>
    </>
  );
};
