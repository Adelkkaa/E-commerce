import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, ControlledInput } from "@/shared/ui";
import {
  ILoginFormSchemaInitialType,
  ILoginFormSchemaType,
  LoginFormSchema,
} from "../model/LoginForm.schema";

export const LoginForm = () => {
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
    <div className="max-w-[500px]">
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

      <Button type="submit" form="loginForm">
        Войти
      </Button>
    </div>
  );
};
