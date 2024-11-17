import { dialogActions } from "@/entities/Dialog";
import { CartSuccess } from "@/features/CartSuccess";
import { ContactForm } from "@/features/ContactForm";
import { ContactSuccess } from "@/features/ContactSuccess";
import { LoginForm } from "@/features/LoginForm";
import { OutletsDialog } from "@/features/OutletsDialog";
import { PreviewDialog } from "@/features/PreviewDialog";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { cn } from "@/shared/lib/utils";
import { Dialog, DialogContent } from "@/shared/ui";

export const SharedDialog = () => {
  const { selectIsOpen } = dialogActions;
  const { isOpen, currentDialog, disableClose } = useAppSelector(
    (state) => state.dialogReducer,
  );

  console.log(isOpen, currentDialog, disableClose);

  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        if (!disableClose) {
          dispatch(selectIsOpen(e));
        }
      }}
    >
      <DialogContent
        className={cn(
          "!max-w-500 px-[20px] gap-[30px] max-md:max-w-[96%] max-md:py-[30px] max-md:px-[10px] max-md:rounded-[10px]",
          {
            "!max-w-[550px]": currentDialog === "contactSuccess",
            "!max-w-[80%]": currentDialog === "productPreview",
          },
        )}
      >
        {currentDialog === "login" && <LoginForm />}
        {currentDialog === "contact" && <ContactForm />}
        {currentDialog === "contactSuccess" && <ContactSuccess />}
        {(currentDialog === "outlets" || currentDialog === "outlets-auth") && (
          <OutletsDialog />
        )}
        {currentDialog === "cartSuccess" && <CartSuccess />}
        {currentDialog === "productPreview" && <PreviewDialog />}
      </DialogContent>
    </Dialog>
  );
};
