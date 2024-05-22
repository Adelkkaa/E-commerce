import { useLocation, useParams } from "react-router-dom";
import { Breadcrumb } from "@/features/Breadcrumb";
import { allLinks } from "@/shared/constants/navigationLinks";
import { Typography } from "@/shared/ui";
import useDocumentTitle from "@/shared/hooks/use-documentTitle";

export const NavigationInfo = () => {
  const { pathname } = useLocation();
  const params = useParams();
  const currentDesc = allLinks.find((link) =>
    Object.entries(params).length > 0
      ? Object.keys(params)[0] === link.searchBreadcrumb
      : link.href === pathname,
  )?.description || '404';
  useDocumentTitle(currentDesc || 'e-commerce');


  return (
    <div className="fullWidth py-[49px] bg-whiteCustom ">
      <div className="subContainer flex flex-col">
        <Breadcrumb />
        <Typography variant="h1">{currentDesc}</Typography>
      </div>
    </div>
  );
};
