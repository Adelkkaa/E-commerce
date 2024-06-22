import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Typography,
} from "@/shared/ui";

export const ContactSuccess = () => {
  return (
    <>
      <DialogHeader className="gap-[10px] justify-center items-center">
        <DialogTitle className="text-modalTitle text-center ">
          Сообщение успешно отправлено
        </DialogTitle>
        <DialogDescription className="!text-modalDesc text-black text-center max-w-[68%] max-md:max-w-full">
          Мы уже работаем над Вашим обращением.
          <br /> Вы получите ответ в будние дни в 9-18:00 мск
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="!flex-col gap-[30px]">
        <Typography variant="modalDesc" className="text-grayCustom text-center">
          Нажмите в любое место экрана, чтобы убрать уведомление
        </Typography>
      </DialogFooter>
    </>
  );
};
