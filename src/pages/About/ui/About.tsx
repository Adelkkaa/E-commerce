import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/shared/ui";
import { ControlledSelect } from "@/shared/ui/ControlledSelect";
import {
  ILoginFormSchemaInitialType,
  ILoginFormSchemaType,
  LoginFormSchema,
} from "./schema";

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
      {/* About */}
      <FormProvider {...methods}>
        <form
          id="loginForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <ControlledSelect
            name="select"
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
