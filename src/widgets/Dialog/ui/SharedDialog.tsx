import { dialogActions } from "@/entities/Dialog";
import { LoginForm } from "@/features/LoginForm";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { Dialog } from "@/shared/ui";

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
      }}
    >
      {currentDialog === "login" && <LoginForm />}
    </Dialog>
  );
};
