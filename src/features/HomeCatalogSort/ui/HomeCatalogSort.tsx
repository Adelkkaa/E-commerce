import { useSearchParams } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { Button, Typography } from "@/shared/ui";

export const HomeCatalogSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const order_by = searchParams.get("order_by");

  const handleSortClick = (orderBy: string) => {
    searchParams.set("page", "1");
    searchParams.set("order_by", orderBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="md:flex hidden gap-[20px]">
      <Typography variant="titleXS">Сортировка</Typography>

      <Button
        variant="link"
        size="link"
        className={cn("text-textS hover:text-main hover:underline", {
          "text-main underline": order_by === "name",
        })}
        onClick={() => handleSortClick("name")}
      >
        по названию
      </Button>
      <Button
        variant="link"
        size="link"
        className={cn("text-textS hover:text-main hover:underline", {
          "text-main underline": order_by === "price",
        })}
        onClick={() => handleSortClick("price")}
      >
        по цене
      </Button>
    </div>
  );
};
