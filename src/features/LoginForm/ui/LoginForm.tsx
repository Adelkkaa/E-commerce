import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  ILoginFormSchemaInitialType,
  ILoginFormSchemaType,
  LoginFormSchema,
  useLoginMutation,
} from "@/entities/LoginForm";
import { useAppDispatch } from "@/shared/hooks/use-redux";
import { useToast } from "@/shared/hooks/use-toast";
import {
  Button,
  ControlledInput,
  dialogActions,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Typography,
} from "@/shared/ui";

export const LoginForm = () => {
  const { selectCurrentDialog } = dialogActions;
  const { toast } = useToast();

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

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<ILoginFormSchemaType> = async (newData) => {
    console.log("Form Data", newData);
    try {
      await login(newData).unwrap();
      dispatch(selectCurrentDialog("outlets-auth"));
      reset();
    } catch (error: any) {
      const errorMessage =
        error?.data?.detail === "Not Found"
          ? "Неверный логин или пароль"
          : (error?.data?.detail as string);
      toast({
        title: errorMessage ? errorMessage : "Произошла ошибка",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <DialogHeader className="gap-[10px] justify-center items-center">
        <DialogTitle className="text-modalTitle text-center ">
          Вход в аккаунт
        </DialogTitle>
        <DialogDescription className="text-modalDesc text-center max-w-[68%] max-md:max-w-full">
          Для оформления заказа, а также просмотра{" "}
          <br className="hidden max-md:block" /> индивидуальных предложений
          необходимо авторизоваться
        </DialogDescription>
      </DialogHeader>
      <FormProvider {...methods}>
        <form
          id="loginForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <ControlledInput
            disabled={isLoginLoading}
            name="login"
            labelText="Логин"
          />
          <ControlledInput
            disabled={isLoginLoading}
            type="password"
            name="password"
            labelText="Пароль"
          />
        </form>
      </FormProvider>
      <DialogFooter className="!justify-between max-md:flex-row">
        <Button
          type="submit"
          form="loginForm"
          className="flex-1 max-w-[160px] max-h-[40px] !text-textL text-white !rounded-[8px] "
          disabled={isLoginLoading}
        >
          Войти
        </Button>
        <div className="flex flex-col">
          <div className="flex max-md:gap-[10px]">
            <Typography
              variant="modalDesc"
              className="max-w-[50%] max-ml:text-[12px] text-end leading-[20px]"
            >
              Нет аккаунта?
            </Typography>
            <Button
              variant="link"
              className="!text-modalDesc max-ml:!text-[12px] items-start !gap-0 !p-0 !pl-1 h-auto"
              onClick={() => dispatch(selectCurrentDialog("contact"))}
            >
              <span className="text-blueCustom underline">
                Оставьте контакты
              </span>
              ,
            </Button>
          </div>
          <Typography
            variant="modalDesc"
            className="max-ml:text-[12px] text-end leading-[20px]"
          >
            чтобы мы связались с Вами
          </Typography>
        </div>
      </DialogFooter>
    </>
  );
};
