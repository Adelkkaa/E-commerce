import clsx from "clsx";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { dialogActions } from "@/entities/Dialog";
import { mobileHeaderLinks } from "@/shared/constants/navigationLinks";
import { useAppDispatch } from "@/shared/hooks/use-redux";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui";

export const MenuSheet = () => {
  const { pathname } = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { selectCurrentDialog } = dialogActions;
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    setIsSheetOpen(false);
    dispatch(selectCurrentDialog("login"));
  };
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="hidden mb:max-md:flex items-center">
        <Menu />
      </SheetTrigger>
      <SheetContent className="w-full min-h-full flex flex-col justify-center items-center">
        <SheetHeader>
          <SheetTitle className="text-textL">Навигация</SheetTitle>
        </SheetHeader>
        <nav className="hidden mb:max-md:flex mb:max-md:flex-col min-w-[204px] text-center tb:gap-[44px] md:gap-[10px]">
          {mobileHeaderLinks.map((item) => (
            <Link
              key={item.href}
              onClick={() => setIsSheetOpen(false)}
              className={clsx(
                "text-textM hover:text-blueCustom p-[14px] border-b border-whiteCustom",
                {
                  "text-blueCustom": item.href === pathname,
                },
              )}
              to={item.href}
            >
              {item.title}
            </Link>
          ))}
          <Accordion type="multiple">
            <AccordionItem value="hello">
              <AccordionTrigger
                className="border-none justify-center !text-textM"
                headerClassname="border-b border-whiteCustom p-[14px]"
                withIcon={false}
              >
                Аккаунт
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-[9px]">
                <Button
                  variant="ghost"
                  className="text-textM w-full text-center"
                  onClick={handleLogin}
                >
                  Войти
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
