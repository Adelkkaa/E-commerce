import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  Typography,
} from "@/shared/ui";
import { FC, useEffect, useState } from "react";

interface IAgeDialog {
  setIsVerified: (arg: boolean) => void
}

export const AgeDialog: FC<IAgeDialog> = ({setIsVerified}) => {
  const [showAgeDialog, setShowAgeDialog] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem("isVerifiedAge") === "true";
    setShowAgeDialog(!isVerified);
  }, []);

  const handleClickButton = (result: boolean) => {
    localStorage.setItem("isVerifiedAge", String(result))
    setShowAgeDialog(false)
    setIsVerified(result)
  }
  return (
    <AlertDialog open={showAgeDialog}>
      <AlertDialogContent className="p-[50px] min-w-[700px]">
        <AlertDialogHeader>
          <AlertDialogDescription className="flex flex-col gap-8 mb-8">
            <Typography
              variant="textAlertTitle"
              as={"span"}
              className="text-blueCustom"
            >
              18+
            </Typography>
            <Typography variant="textM" as={"span"} className="text-black">
              Сайт содержит информацию для лиц совершеннолетнего возраста. Для
              продолжения просмотра сайта необходимо подтвердить свой возвраст
            </Typography>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center !justify-center gap-7">
          <AlertDialogAction onClick={() => handleClickButton(true)} className="flex-1 bg-grayCustom text-white font-bold text-[20px]">
            Мне больше 18 лет
          </AlertDialogAction>
          <AlertDialogCancel onClick={() => handleClickButton(false)} className="flex-1 bg-blueCustom text-white font-bold text-[20px]">
            Мне нет 18 лет
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
