import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  ControlledInput,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Typography,
} from "@/shared/ui";
import {
  ILoginFormSchemaInitialType,
  ILoginFormSchemaType,
  LoginFormSchema,
} from "../model/LoginForm.schema";
import { dialogActions } from "@/entities/Dialog";
import { useAppDispatch } from "@/shared/hooks/use-redux";

export const LoginForm = () => {
    const { selectCurrentDialog } = dialogActions;
    const dispatch = useAppDispatch();
  const methods = useForm<
    ILoginFormSchemaInitialType,
    unknown,
    ILoginFormSchemaType
  >({
    resolver: zodResolver(LoginFormSchema),
    values: {
      login: "",
      password: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<ILoginFormSchemaType> = async (newData) => {
    console.log("Form Data", newData);
    reset();
  };
  return (
    <>
      <DialogHeader className="gap-[10px] justify-center items-center">
        <DialogTitle className="text-modalTitle text-center ">
          Вход в аккаунт
        </DialogTitle>
        <DialogDescription className="text-modalDesc text-center max-w-[68%]">
          Для оформления заказа, а также просмотра индивидуальных предложений
          необходимо авторизоваться
        </DialogDescription>
      </DialogHeader>
      <FormProvider {...methods}>
        <form
          id="loginForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <ControlledInput name="login" labelText="Логин" />
          <ControlledInput type="password" name="password" labelText="Пароль" />
        </form>
      </FormProvider>
      <DialogFooter className="!justify-between">
        <Button
          type="submit"
          form="loginForm"
          className="flex-1 max-w-[160px] max-h-[40px] !text-textL text-white !rounded-[8px] "
        >
          Войти
        </Button>
        <div className="flex flex-col">
          <div className="flex">
            <Typography
              variant="modalDesc"
              className="max-w-[50%] text-end leading-[20px]"
            >
              Нет аккаунта?
            </Typography>
            <Button
              variant="link"
              className="!text-modalDesc  items-start !p-0 !pl-1 h-auto"
              onClick={() => dispatch(selectCurrentDialog("contact"))}

            >
              <span className="text-blueCustom underline">
                Оставьте контакты
              </span>
              ,
            </Button>
          </div>
          <Typography variant="modalDesc" className="text-end leading-[20px]">
            чтобы мы связались с Вами
          </Typography>
        </div>
      </DialogFooter>
      </>
  );
};
