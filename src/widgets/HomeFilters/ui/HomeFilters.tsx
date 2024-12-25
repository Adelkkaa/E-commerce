import { useState } from "react";
import { useSearchParams } from "react-router-dom";
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

  const [searchParams, setSearchParams] = useSearchParams();
  const order_by = searchParams.get("order_by");

  const handleSortClick = (orderBy: string | null) => {
    searchParams.set("page", "1");
    if (orderBy) {
      searchParams.set("order_by", orderBy);
    } else {
      searchParams.delete("order_by");
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      {isMobile ? (
        <div className="flex justify-between h-[40px] items-center border-b border-grayCustom">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-[10px] text-titleXS items-center bg-transparent hover:strokeBlue p-2 outline-none">
              <HomeSort />
              {order_by === "+price" && "По цене: по возрастанию"}
              {order_by === "-price" && "По цене: по убыванию"}
              {order_by === "+name" && "По названию: по возрастанию"}
              {order_by === "-name" && "По названию: по убыванию"}
              {!order_by && "По типу"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[260px]">
              <DropdownMenuItem onClick={() => handleSortClick("+price")}>
                <Button
                  variant="ghost"
                  className="text-titleXS w-full text-center"
                >
                  По цене: по возрастанию
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortClick("-price")}>
                <Button
                  variant="ghost"
                  className="text-titleXS w-full text-center"
                >
                  По цене: по убыванию
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortClick("+name")}>
                <Button
                  variant="ghost"
                  className="text-titleXS w-full text-center"
                >
                  По названию: по возрастанию
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortClick("-name")}>
                <Button
                  variant="ghost"
                  className="text-titleXS w-full text-center"
                >
                  По названию: по убыванию
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortClick(null)}>
                <Button
                  variant="ghost"
                  className="text-titleXS w-full text-center"
                >
                  По типу
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} modal={true}>
            <SheetTrigger className="hidden mb:max-md:flex items-center">
              <div className="flex gap-[10px] items-center">
                <Typography variant="titleXS">Фильтры</Typography>
                <HomeFilter />
              </div>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="w-full min-h-full max-h-screen overflow-y-scroll flex flex-col justify-start items-center pb-[90px]"
            >
              <SheetHeader>
                <SheetTitle className="!text-textL">Фильтры</SheetTitle>
              </SheetHeader>
              <HomeFiltersContent
                onClickButton={() => setIsSheetOpen(false)}
                wrapperClassname="w-full"
              />
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <HomeFiltersContent />
      )}
    </>
  );
};
