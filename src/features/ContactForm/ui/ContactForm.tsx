import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  ContactFormSchema,
  IContactFormSchemaInitialType,
  IContactFormSchemaType,
  useCreateNewApplicationMutation,
} from "@/entities/ContactForm";
import { dialogActions } from "@/entities/Dialog";
import { useAppDispatch } from "@/shared/hooks/use-redux";
import { useToast } from "@/shared/hooks/use-toast";
import {
  Button,
  ControlledCheckbox,
  ControlledInput,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  PhoneInput,
  Typography,
} from "@/shared/ui";

export const ContactForm = () => {
  const { selectCurrentDialog } = dialogActions;
  const dispatch = useAppDispatch();
  const [createApplication, { isLoading: isCreateApplicationLoading }] =
    useCreateNewApplicationMutation();

  const { toast } = useToast();

  const methods = useForm<
    IContactFormSchemaInitialType,
    unknown,
    IContactFormSchemaType
  >({
    resolver: zodResolver(ContactFormSchema),
    values: {
      full_name: "",
      email: "",
      is_company: false,
      phone: "",
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IContactFormSchemaType> = async (newData) => {
    try {
      await createApplication(newData).unwrap();
      dispatch(selectCurrentDialog("contactSuccess"));
    } catch (error) {
      toast({
        title: "Произошла ошибка",
        description: "Пожалуйста, попробуйте позже",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <DialogHeader className="gap-[10px] justify-center items-center">
        <DialogTitle className="text-modalTitle text-center ">
          Свяжитесь с нами
        </DialogTitle>
        <DialogDescription className="text-modalDesc text-center max-w-[68%] max-md:max-w-full">
          Если Вы хотите создать аккаунт, забыли пароль от существующего или у
          Вас есть вопросы, оставьте Ваши контакты в форме ниже — мы свяжемся с
          Вами
        </DialogDescription>
      </DialogHeader>
      <FormProvider {...methods}>
        <form
          id="contactForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <ControlledInput
            disabled={isCreateApplicationLoading}
            name="full_name"
            labelText="Ваше ФИО"
          />
          <ControlledInput
            disabled={isCreateApplicationLoading}
            name="email"
            labelText="Email"
          />
          <PhoneInput
            disabled={isCreateApplicationLoading}
            name="phone"
            labelText="Телефон"
          />
          <ControlledCheckbox
            disabled={isCreateApplicationLoading}
            id="is_company"
            label="Я компания"
            name="is_company"
            withIcon
          />
        </form>
      </FormProvider>
      <DialogFooter className="!flex-col gap-[30px]">
        <Button
          withLoading={isCreateApplicationLoading}
          disabled={isCreateApplicationLoading}
          type="submit"
          form="contactForm"
          className="flex-1 w-full min-h-[50px] !text-textL text-white !rounded-[8px]"
        >
          Отправить сообщение
        </Button>
        <Typography variant="modalDesc" className="max-md:text-center">
          Нажимая кнопку “Отправить сообщение”, Вы даете согласие
          <DialogTrigger asChild>
            <Link to="/agreement" className="underline text-blueCustom">
              {" "}
              на обработку персональных данных
            </Link>
          </DialogTrigger>{" "}
          и соглашаетесь{" "}
          <DialogTrigger asChild>
            <Link to="/policy" className="underline text-blueCustom">
              c политикой конфиденциальности
            </Link>
          </DialogTrigger>
        </Typography>
      </DialogFooter>
    </>
  );
};
