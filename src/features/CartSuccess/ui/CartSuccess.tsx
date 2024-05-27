import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Typography,
} from "@/shared/ui";

export const CartSuccess = () => {
  return (
    <>
      <DialogHeader className="gap-[10px] justify-center items-center">
        <DialogTitle className="text-modalTitle text-center ">
          Заказ успешно создан{" "}
        </DialogTitle>
        <DialogDescription className="!text-modalDesc text-black text-center max-w-[68%]">
          Для уточнения деталей с Вами свяжется менеджер. <br /> Время работы:
          будние дни, 9-18:00 мск
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
