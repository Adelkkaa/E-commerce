import { Link } from "react-router-dom";
import { Typography } from "@/shared/ui";

export const HomeCatalogSort = () => {
  return (
    <div className="md:flex hidden gap-[20px]">
      <Typography variant="titleXS">Сортировка</Typography>
      <Link to="/" className="text-textS hover:text-blueCustom hover:underline">
        по популярности
      </Link>
      <Link to="/" className="text-textS hover:text-blueCustom hover:underline">
        по названию
      </Link>
      <Link to="/" className="text-textS hover:text-blueCustom hover:underline">
        по цене
      </Link>
    </div>
  );
};
