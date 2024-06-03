import { FC, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/shared/ui";

interface IAgeDialog {
  setIsVerified: (arg: boolean) => void;
  isVerified: boolean;
}

export const AgeDialog: FC<IAgeDialog> = ({ setIsVerified, isVerified }) => {
  const [showAgeDialog, setShowAgeDialog] = useState(false);

  useEffect(() => {
    const localStorageIsVerified =
      localStorage.getItem("isVerifiedAge") === "true";
    setShowAgeDialog(!localStorageIsVerified);
  }, []);

  const handleClickButton = (result: boolean) => {
    localStorage.setItem("isVerifiedAge", String(result));
    setIsVerified(result);
    console.log(result);
    if (result) {
      setShowAgeDialog(false);
    }
  };
  return (
    <AlertDialog open={showAgeDialog}>
      <AlertDialogContent className="p-[50px] pt-[18px] min-w-[700px] gap-7 !rounded-[10px] !outline-none !border-none">
        <AlertDialogHeader>
          <AlertDialogDescription className="text-textAlertTitle !text-blueCustom mb-7 select-none">
            18+
          </AlertDialogDescription>
          <AlertDialogDescription className="text-textM !text-black select-none">
            {isVerified
              ? `Сайт содержит информацию для лиц совершеннолетнего возраста. ${(<br />)}
            Для продолжения просмотра сайта необходимо подтвердить свой возвраст`
              : "Содержание сайта предназначено для просмотра исключительно лицам достигшим совершеннолетия"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {isVerified && (
          <AlertDialogFooter className="flex items-center !justify-center gap-7">
            <AlertDialogAction
              onClick={() => handleClickButton(true)}
              className="flex-1 bg-blueCustom text-white font-bold text-[20px] hover:bg-blueCustom hover:scale-[1.05]"
            >
              Мне больше 18 лет
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() => handleClickButton(false)}
              className="flex-1 bg-grayCustom !text-white font-bold text-[20px] hover:bg-grayCustom hover:scale-[1.05] outline-none"
            >
              Мне нет 18 лет
            </AlertDialogCancel>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
