import { Search } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui";

export const HeaderInput = () => {
  return (
    <label htmlFor="search" className={cn("relative flex items-center flex-1")}>
      <Search className=" absolute h-[16px] w-[16px] ml-[7px] cursor-pointer" />
      <Input
        id="search"
        className="border-[2px] text-[20px] px-[32px]"
        placeholder="Введите ваш запрос..."
      />
    </label>
  );
};
