import { useState } from "react";
import { HomeFilters as HomeFiltersContent } from "@/features/HomeFilters";
import HomeFilter from "@/shared/assets/images/HomeFilter.svg";
import HomeSort from "@/shared/assets/images/Sort.svg";
import { useBreakpoint } from "@/shared/hooks/use-breakpoint";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Typography,
} from "@/shared/ui";

export const HomeFilters = () => {
  const { isMobile } = useBreakpoint();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      {isMobile ? (
        <div className="flex justify-between h-[40px] items-center border-b border-grayCustom">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-[10px] text-titleXS items-center bg-transparent hover:strokeBlue p-2 outline-none">
              <HomeSort />
              По популярности
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[260px]">
              <DropdownMenuItem
              // onClick={() => dispatch(selectCurrentDialog("login"))}
              >
                <Button
                  variant="ghost"
                  className="text-titleXS w-full text-center"
                >
                  По популярности
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem
              // onClick={() => dispatch(selectCurrentDialog("login"))}
              >
                <Button
                  variant="ghost"
                  className="text-titleXS w-full text-center"
                >
                  По названию
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem
              // onClick={() => dispatch(selectCurrentDialog("login"))}
              >
                <Button
                  variant="ghost"
                  className="text-titleXS w-full text-center"
                >
                  По цене
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="hidden mb:max-md:flex items-center">
              <div className="flex gap-[10px] items-center">
                <Typography variant="titleXS">Фильтры</Typography>
                <HomeFilter />
              </div>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="w-full min-h-full flex flex-col justify-start  items-center"
            >
              <SheetHeader>
                <SheetTitle className="!text-textL">Фильтры</SheetTitle>
              </SheetHeader>
              <HomeFiltersContent wrapperClassname="w-full" />
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <HomeFiltersContent />
      )}
    </>
  );
};
