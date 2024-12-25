import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { Button, Typography } from "@/shared/ui";

export const HomeCatalogSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const order_by = searchParams.get("order_by");

  const handleSortClick = (columnName: string) => {
    const order =
      order_by === `-${columnName}`
        ? `+${columnName}`
        : (order_by === `+${columnName}`
          ? null
          : `-${columnName}`);

    searchParams.set("page", "1");
    if (order) {
      searchParams.set("order_by", order);
    } else {
      searchParams.delete("order_by");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="md:flex hidden gap-[20px]">
      <Typography variant="titleXS">Сортировка</Typography>

      <Button
        variant="link"
        size="link"
        className={cn("text-textS hover:text-main hover:underline !gap-[1px]", {
          "text-main underline": order_by === "+name" || order_by === "-name",
        })}
        onClick={() => handleSortClick("name")}
        iconDirection="right"
        icon={
          <ChevronDown
            size={16}
            className={cn("transition-transform duration-200 hidden", {
              "rotate-180 text-main": order_by === "+name",
              "rotate-0 text-main": order_by === "-name",
              block: order_by === "+name" || order_by === "-name",
            })}
          />
        }
      >
        по названию
      </Button>
      <Button
        variant="link"
        size="link"
        className={cn("text-textS hover:text-main hover:underline !gap-[1px]", {
          "text-main underline": order_by === "+price" || order_by === "-price",
        })}
        onClick={() => handleSortClick("price")}
        iconDirection="right"
        icon={
          <ChevronDown
            size={16}
            className={cn("transition-transform duration-200 hidden", {
              "rotate-180 text-main": order_by === "+price",
              "rotate-0 text-main": order_by === "-price",
              block: order_by === "+price" || order_by === "-price",
            })}
          />
        }
      >
        по цене
      </Button>
    </div>
  );
};
