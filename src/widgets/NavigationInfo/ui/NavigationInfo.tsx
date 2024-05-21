import { useLocation } from "react-router-dom";
import { navigationLinks } from "@/shared/constants/navigationLinks";
import { Typography } from "@/shared/ui";

export const NavigationInfo = () => {
  const { pathname } = useLocation();
  const currentPageTitle = navigationLinks.find(
    (link) => link.href === pathname,
  )?.title;
  return (
    <div className="fullWidth py-[49px] bg-whiteCustom ">
      <div className="subContainer flex flex-col">
        <Typography variant="h3" className="text-grayCustom">
          {currentPageTitle}
        </Typography>
        <Typography variant="h1">Все категории</Typography>
      </div>
    </div>
  );
};
