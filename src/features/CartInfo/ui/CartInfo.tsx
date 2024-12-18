import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { dialogActions } from "@/entities/Dialog";
import { useAddOrderMutation } from "@/entities/Orders";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { useToast } from "@/shared/hooks/use-toast";
import { ICartGood } from "@/shared/types/types";
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
  goods: ICartGood[];
}

export const CartInfo: FC<ICartInfoProps> = ({
  containerClassName,
  onCloseSheet,
  outletName,
  totalCost,
  goods,
}) => {
  const { toast } = useToast();
  const { selectCurrentDialog } = dialogActions;
  const { guid } = useAppSelector((state) => state.outletsReducer);

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

  const [addOrder, { isLoading: isAddOrderLoading }] = useAddOrderMutation();

  const errorHandler = (error: any) => {
    console.log(error);
    toast({
      title: "Произошла ошибка",
      description: error?.data?.detail || "Попробуйте еще раз",
      variant: "destructive",
    });
  };

  const onSubmit: SubmitHandler<ICartInfoSchemaType> = async (newData) => {
    try {
      console.log("Form Data", newData);
      const preparedProducts = goods.map(
        ({ guid, specification_guid, quantity, price }) => ({
          good_guid: guid,
          specification_guid,
          quantity,
          price,
        }),
      );
      await addOrder({
        cart_outlet_guid: guid as string,
        body: {
          goods: preparedProducts,
        },
      }).unwrap();
      dispatch(selectCurrentDialog("cartSuccess"));
      if (onCloseSheet) {
        onCloseSheet();
      }
    } catch (error) {
      console.log(error);
      errorHandler(error);
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
        <Typography variant="textL">{totalCost.toFixed(2)} ₽</Typography>
      </div>
      <FormProvider {...methods}>
        <form
          id="cartInfo"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <DatePicker
            disabled={isAddOrderLoading}
            name="date"
            label="Дата доставки"
            placeholderText="ДД.ММ.ГГГГ"
            startDate={new Date()}
          />
          <ControlledTextarea
            disabled={isAddOrderLoading}
            className="min-h-[173px]"
            name="comment"
            labelText="Комментарий"
            placeholder="Введите комментарий..."
          />

          <Button
            type="submit"
            className="flex-1 w-full min-h-[50px] !text-textL text-white !rounded-[8px]"
            withLoading={isAddOrderLoading}
            disabled={isAddOrderLoading}
          >
            Заказать
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
