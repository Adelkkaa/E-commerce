import clsx from "clsx";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { dialogActions } from "@/entities/Dialog";
import { useLogoutMutation } from "@/entities/LoginForm";
import { mobileHeaderLinks } from "@/shared/constants/navigationLinks";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { useToast } from "@/shared/hooks/use-toast";
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
  Typography,
} from "@/shared/ui";

export const MenuSheet = () => {
  const { toast } = useToast();
  const { pathname } = useLocation();
  const { name } = useAppSelector((state) => state.outletsReducer);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { selectCurrentDialog } = dialogActions;
  const dispatch = useAppDispatch();

  const [logout] = useLogoutMutation();

  const handleLogin = () => {
    setIsSheetOpen(false);
    dispatch(selectCurrentDialog("login"));
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      setIsSheetOpen(false);
    } catch (error) {
      toast({
        title: "Произошла ошибка",
        description: "Попробуйте еще раз",
        variant: "destructive",
      });
    }
  };

  const handleSelectOutlet = () => {
    setIsSheetOpen(false);
    dispatch(selectCurrentDialog("outlets"));
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
                {name ? (
                  <>
                    <Typography
                      className="font-semibold text-grayCustom"
                      variant="textS"
                    >
                      Торговая точка
                    </Typography>
                    <Typography
                      className="text-center text-blueCustom pb-[14px] border-b border-whiteCustom"
                      variant="tableText"
                    >
                      {name}
                    </Typography>
                    <Button
                      variant="ghost"
                      className="text-textM w-full text-center pb-[14px] border-b border-whiteCustom"
                      onClick={handleSelectOutlet}
                    >
                      Торговые точки
                    </Button>
                    <Link
                      onClick={() => setIsSheetOpen(false)}
                      className={clsx(
                        "text-textM hover:text-blueCustom pb-[14px] border-b border-whiteCustom",
                      )}
                      to="/orders"
                    >
                      Заказы
                    </Link>
                    <Button
                      variant="ghost"
                      className="text-textM w-full text-center"
                      onClick={handleLogout}
                    >
                      Выйти
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className="text-textM w-full text-center"
                    onClick={handleLogin}
                  >
                    Войти
                  </Button>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
