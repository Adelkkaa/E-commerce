import { Search } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui";

export const HeaderInput = () => {
  return (
    <label
      htmlFor="search"
      className={cn("relative flex items-center w-[50%]")}
    >
      <Search className=" absolute h-[16px] w-[16px] ml-[7px]" />
      <Input id="search" className="border-[2px] text-[20px] px-[32px]" />
    </label>
  );
};
