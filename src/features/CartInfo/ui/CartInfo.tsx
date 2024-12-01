import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { dialogActions } from "@/entities/Dialog";
import { useAppDispatch } from "@/shared/hooks/use-redux";
import {
  Button,
  ControlledTextarea,
  DatePicker,
  Typography,
} from "@/shared/ui";
import {
  CartInfoSchema,
  ICartInfoSchemaInitialType,
  ICartInfoSchemaType,
} from "../model/CartInfo.schema";

interface ICartInfoProps {
  containerClassName?: string;
  onCloseSheet?: () => void;
  totalCost: number;
  outletName: string;
}

export const CartInfo: FC<ICartInfoProps> = ({
  containerClassName,
  onCloseSheet,
  outletName,
  totalCost,
}) => {
  const { selectCurrentDialog } = dialogActions;
  const dispatch = useAppDispatch();
  const methods = useForm<
    ICartInfoSchemaInitialType,
    unknown,
    ICartInfoSchemaType
  >({
    resolver: zodResolver(CartInfoSchema),
    values: {
      comment: "",
      date: null,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ICartInfoSchemaType> = async (newData) => {
    console.log("Form Data", newData);
    dispatch(selectCurrentDialog("cartSuccess"));
    if (onCloseSheet) {
      onCloseSheet();
    }
  };
  return (
    <div
      className={clsx(
        "py-[30px] px-[26px] bg-white rounded-[10px] flex md:flex flex-col gap-[32px]",
        containerClassName,
      )}
    >
      <div>
        <Typography variant="textL">Торговая точка</Typography>
        <Typography variant="textM">{outletName}</Typography>
      </div>
      <div className="flex justify-between">
        <Typography variant="textL">Сумма заказа</Typography>
        <Typography variant="textL">{totalCost} ₽</Typography>
      </div>
      <FormProvider {...methods}>
        <form
          id="cartInfo"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <DatePicker
            name="date"
            label="Дата доставки"
            placeholderText="ДД.ММ.ГГГГ"
            startDate={new Date()}
          />
          <ControlledTextarea
            className="min-h-[173px]"
            name="comment"
            labelText="Комментарий"
            placeholder="Введите комментарий..."
          />

          <Button
            type="submit"
            className="flex-1 w-full min-h-[50px] !text-textL text-white !rounded-[8px]"
          >
            Заказать
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
