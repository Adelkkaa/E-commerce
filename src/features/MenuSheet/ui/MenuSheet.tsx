import clsx from "clsx";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { mobileHeaderLinks } from "@/shared/constants/navigationLinks";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui";

export const MenuSheet = () => {
  const { pathname } = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="hidden mb:max-md:flex items-center">
        <Menu />
      </SheetTrigger>
      <SheetContent className="w-full h-full flex flex-col justify-center items-center">
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
        </nav>
      </SheetContent>
    </Sheet>
  );
};
