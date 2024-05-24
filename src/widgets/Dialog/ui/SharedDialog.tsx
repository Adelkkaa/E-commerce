import { dialogActions } from "@/entities/Dialog";
import { ContactForm } from "@/features/ContactForm";
import { LoginForm } from "@/features/LoginForm";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { Dialog, DialogContent } from "@/shared/ui";

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
        console.log(e)
        dispatch(selectIsOpen(e));
      }}
    >
    <DialogContent className="!max-w-500 px-[20px] gap-[30px]">

      {currentDialog === "login" && <LoginForm />}
      {currentDialog === "contact" && <ContactForm />}
    </DialogContent>
    </Dialog>
  );
};
