import { Fragment } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { allLinks, redirectLinks } from "@/shared/constants/navigationLinks";
import {
  Breadcrumb as DefaultBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Typography,
} from "@/shared/ui";

export const Breadcrumb = () => {
  const { pathname } = useLocation();
  const params = useParams();
  let currentLink = "";
  const crumbs = pathname.split("/").filter((crumb) => crumb);
  return (
    <DefaultBreadcrumb>
      <BreadcrumbList>
        {pathname !== "/" ? (
          <BreadcrumbItem>
            <BreadcrumbLink asChild={true}>
              <Link to="/">Главная</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          <Typography variant="h3" className="text-grayCustom select-none">
            Главная
          </Typography>
        )}

        {crumbs.length > 0 && (Object.keys(params)[0] !== '*')&& <BreadcrumbSeparator>|</BreadcrumbSeparator>}
        {crumbs.map((crumb, index) => {
          currentLink += `/${crumb}`;
          const isHidden = redirectLinks.includes(currentLink);
          const currentName = allLinks.find((link) =>
            Object.entries(params).length > 0
              ? Object.keys(params)[0] === link.searchBreadcrumb
              : link.href === pathname,
          )?.title;
          return (
            <Fragment key={currentLink}>
              {!isHidden && (
                <>
                  {pathname !== currentLink ? (
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild={true}>
                        <Link to={currentLink}>{currentName}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  ) : (
                    <Typography
                      variant="h3"
                      className="text-grayCustom select-none"
                    >
                      {currentName}
                    </Typography>
                  )}
                  {crumbs.length - 1 > index && currentName && (
                    <BreadcrumbSeparator>|</BreadcrumbSeparator>
                  )}
                </>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </DefaultBreadcrumb>
  );
};
