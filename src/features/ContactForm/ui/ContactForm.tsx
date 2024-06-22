import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { dialogActions } from "@/entities/Dialog";
import { useAppDispatch } from "@/shared/hooks/use-redux";
import {
  Button,
  ControlledInput,
  ControlledTextarea,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  PhoneInput,
  Typography,
} from "@/shared/ui";
import {
  ContactFormSchema,
  IContactFormSchemaInitialType,
  IContactFormSchemaType,
} from "../model/ContactForm.schema";

export const ContactForm = () => {
  const { selectCurrentDialog } = dialogActions;
  const dispatch = useAppDispatch();
  const methods = useForm<
    IContactFormSchemaInitialType,
    unknown,
    IContactFormSchemaType
  >({
    resolver: zodResolver(ContactFormSchema),
    values: {
      fio: "",
      email: "",
      message: "",
      phone: "",
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IContactFormSchemaType> = async (newData) => {
    console.log("Form Data", newData);
    dispatch(selectCurrentDialog("contactSuccess"));
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
          <ControlledInput name="fio" labelText="Ваше ФИО" />
          <ControlledInput name="email" labelText="Email" />
          <PhoneInput name="phone" labelText="Телефон" />
          <ControlledTextarea name="message" labelText="Сообщение" />
        </form>
      </FormProvider>
      <DialogFooter className="!flex-col gap-[30px]">
        <Button
          type="submit"
          form="contactForm"
          className="flex-1 w-full min-h-[50px] !text-textL text-white !rounded-[8px] "
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
