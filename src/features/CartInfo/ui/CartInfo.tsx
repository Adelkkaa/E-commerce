import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { dialogActions } from "@/entities/Dialog";
import { useAppDispatch } from "@/shared/hooks/use-redux";
import {
  Button,
  ControlledSelect,
  ControlledTextarea,
  DatePicker,
  Typography,
} from "@/shared/ui";
import {
  CartInfoSchema,
  ICartInfoSchemaInitialType,
  ICartInfoSchemaType,
} from "../model/CartInfo.schema";

export const CartInfo = () => {
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
      store: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<ICartInfoSchemaType> = async (newData) => {
    console.log("Form Data", newData);
    dispatch(selectCurrentDialog("cartSuccess"));
  };
  return (
    <div className="py-[30px] px-[26px] bg-whiteCustom rounded-[10px] w-[30%] flex flex-col gap-[32px]">
      <div className="flex justify-between">
        <Typography variant="textL">Сумма заказа</Typography>
        <Typography variant="textL">19 804.8 ₽</Typography>
      </div>
      <FormProvider {...methods}>
        <form
          id="contactForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <ControlledSelect
            labelClassname="bg-whiteCustom"
            selectClassname="bg-whiteCustom"
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
          <DatePicker
            name="date"
            label="Дата доставки"
            placeholderText="ДД.ММ.ГГГГ"
            startDate={new Date()}
          />
          <ControlledTextarea
            labelClassname="bg-whiteCustom"
            labelTextClassname="bg-whiteCustom"
            className="bg-whiteCustom min-h-[173px]"
            name="comment"
            labelText="Комментарий"
            placeholder="Введите комментарий..."
          />

          <Button
            type="submit"
            className="flex-1 w-full min-h-[50px] !text-textL text-white !rounded-[8px]"
          >
            Войти
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
