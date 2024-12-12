import { CookieIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";

export const CookieConsent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  const accept = () => {
    setIsOpen(false);
    document.cookie =
      "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    setTimeout(() => {
      setHide(true);
    }, 700);
  };

  useEffect(() => {
    try {
      setIsOpen(true);
      if (document.cookie.includes("cookieConsent=true")) {
        setIsOpen(false);
        setTimeout(() => {
          setHide(true);
        }, 700);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }, []);

  return (
    <div
      className={cn(
        "fixed z-[200] bottom-0 right-0 sm:right-4 sm:bottom-4 w-full sm:max-w-md duration-700",
        !isOpen
          ? "transition-[opacity,transform] translate-y-8 opacity-0"
          : "transition-[opacity,transform] translate-y-0 opacity-100",
        hide && "hidden",
      )}
    >
      <div className="m-3 dark:bg-card bg-background border border-border rounded-lg">
        <div className="flex items-center justify-between p-3">
          <h1 className="text-lg font-medium">Мы используем cookies</h1>
          <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
        </div>
        <div className="p-3 -mt-2">
          <p className="text-sm text-left text-muted-foreground">
            Продолжая пользоваться данным сайтом, вы подтверждаете свое согласие
            на использование файлов cookie в соответствии с настоящим
            уведомлением.
          </p>
        </div>
        <div className="p-3 flex items-center gap-2 mt-2 border-t">
          <Button
            onClick={accept}
            className="w-full h-9 rounded-full uppercase"
          >
            принять
          </Button>
        </div>
      </div>
    </div>
  );
};
