import { DialogDescription, DialogHeader, DialogTitle } from "@/shared/ui";

export const DevelopmentDialog = () => {
  return (
    <>
      <DialogHeader className="gap-[10px] justify-center items-center">
        <DialogTitle className="text-modalTitle text-center ">
          Уважаемый клиент!
        </DialogTitle>
        <DialogDescription className="!text-modalDesc text-black text-center max-w-[68%] max-md:max-w-full">
          В данный момент сайт находится в разработке, поэтому в случае
          возникновения ошибок, вопросов или предложений просим Вас сообщить о
          них через форму обратной связи.
        </DialogDescription>
      </DialogHeader>
    </>
  );
};
