import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { HeaderInput } from "@/features/HeaderInput";
import { MenuSheet } from "@/features/MenuSheet";
import FavoritesIcon from "@/shared/assets/images/Favorites.svg";
import mainLogo from "@/shared/assets/images/MainLogo.jpg";
import CartIcon from "@/shared/assets/images/ShoppingCart.svg";
import { headerLinks } from "@/shared/constants/navigationLinks";
import { ProfileDropdownMenu } from "./ProfileDropdownMenu";

export const Header = () => {
  const { pathname } = useLocation();

  const handleReturnToHome = () => {
    sessionStorage.clear();
  };

  return (
    <header className="padding flex flex-col py-[8px] md:py-[20px]">
      <div className="flex mb:max-md:justify-between md:items-end tb:gap-[81px] md:gap-[20px] mb:max-md:border-b border-grayCustom pb-[8px]">
        <MenuSheet />
        <Link
          to="/"
          className="mb:min-w-[160px] mb:max-w-[160px] mb:max-md:h-[40px]"
          onClick={handleReturnToHome}
        >
          <img
            src={mainLogo}
            alt="mainLogo"
            className="w-full h-full object-contain"
          />
        </Link>
        <div className="flex md:w-full tb:gap-[81px] md:gap-[20px]">
          <nav className="hidden md:flex tb:gap-[44px] md:gap-[10px]">
            {headerLinks.map((item) => (
              <Link
                key={item.href}
                className={clsx("text-[20px] hover:text-blueCustom font-bold", {
                  "text-blueCustom": item.href === pathname,
                })}
                to={item.href}
                onClick={item.href === "/" ? handleReturnToHome : undefined}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="flex-1 w-full hidden md:flex">
            <HeaderInput />
          </div>

          <div className="flex tb:gap-[20px] md:gap-[10px] items-center">
            <Link
              to="/favorites"
              className="hover:strokeBlue w-[36px] h-[36px] flex justify-center items-center"
            >
              <FavoritesIcon className="cursor-pointer w-[20px] h-[20px]" />
            </Link>
            <Link
              to="/cart"
              className="hover:strokeBlue w-[36px] h-[36px] flex justify-center items-center"
            >
              <CartIcon className="cursor-pointer w-[20px] h-[20px]" />
            </Link>

            <ProfileDropdownMenu />
          </div>
        </div>
      </div>
      <div className="flex-1 w-full flex md:hidden pt-[8px] h-[40px]">
        <HeaderInput />
      </div>
    </header>
  );
};
