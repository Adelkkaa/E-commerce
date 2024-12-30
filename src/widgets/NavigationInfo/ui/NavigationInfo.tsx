import { useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "@/features/Breadcrumb";
import { allLinks } from "@/shared/constants/navigationLinks";
import useDocumentTitle from "@/shared/hooks/use-documentTitle";
import { Typography } from "@/shared/ui";

export const NavigationInfo = () => {
  const { pathname } = useLocation();
  const params = useParams();
  const currentDesc =
    allLinks.find((link) =>
      Object.entries(params).length > 0
        ? Object.keys(params)[0] === link.searchBreadcrumb
        : link.href === pathname,
    )?.description || "Такой страницы не существует";
  useDocumentTitle(currentDesc || "Два капитана");

  return (
    <div className="fullWidth md:py-[49px] py-[26px] bg-blueCustom ">
      <div className="subContainer flex flex-col">
        <Breadcrumbs />
        <Typography
          variant="h1"
          className="select-none text-white max-md:text-[20px]"
        >
          {(params.orderId && `Заказ #${params.orderId}`) || currentDesc}
        </Typography>
      </div>
    </div>
  );
};
