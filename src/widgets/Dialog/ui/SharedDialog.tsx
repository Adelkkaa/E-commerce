import { dialogActions } from "@/entities/Dialog";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Typography,
} from "@/shared/ui";

export const SharedDialog = () => {
  const { selectIsOpen } = dialogActions;
  const { isOpen, currentDialog } = useAppSelector(
    (state) => state.dialogReducer,
  );

  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        dispatch(selectIsOpen(e));
        console.log(e);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[2rem]">Сообщить об ошибке</DialogTitle>
        </DialogHeader>
        <Typography variant="buttonM">Hello</Typography>

        <DialogFooter className="sm:justify-start">
          <Button
            type="submit"
            className="text-white bg-redCustom hover:bg-redHover py-[2.5rem] px-[4.5rem] rounded-[1rem] text-[1.6rem] mt-[4.5rem]"
            variant="secondary"
            form="errorReport"
          >
            Отправить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
