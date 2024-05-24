import { Button } from "@/shared/ui";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  ILoginFormSchemaInitialType,
  ILoginFormSchemaType,
  LoginFormSchema,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledSelect } from "@/shared/ui/ControlledSelect";

export const About = () => {
  const methods = useForm<
    ILoginFormSchemaInitialType,
    unknown,
    ILoginFormSchemaType
  >({
    resolver: zodResolver(LoginFormSchema),
    values: {
      select: "",
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ILoginFormSchemaType> = async (newData) => {
    console.log("Form Data", newData);
  };
  return (
    <section className="mt-[72px] max-w-[500px]">
      About
      <FormProvider {...methods}>
        <form
          id="loginForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <ControlledSelect
            name="select"
            labelText="Тп"
            options={[{ label: "hello", value: "123" }]}
            placeholder="Привет"
          />
        </form>
      </FormProvider>
      <Button
        type="submit"
        form="loginForm"
        className="flex-1 max-w-[160px] max-h-[40px] !text-textL text-white !rounded-[8px] "
      >
        Войти
      </Button>
    </section>
  );
};
