import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { HeaderInput } from "@/features/HeaderInput";
import FavoritesIcon from "@/shared/assets/images/Favorites.svg";
import mainLogo from "@/shared/assets/images/MainLogo.jpg";
import CartIcon from "@/shared/assets/images/ShoppingCart.svg";
import { headerLinks } from "@/shared/constants/navigationLinks";
import { ProfileDropdownMenu } from "./ProfileDropdownMenu";

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="flex items-end gap-[81px] py-[20px]">
      <Link to="/" className="min-w-[160px] max-w-[160px]">
        <img src={mainLogo} alt="mainLogo" />
      </Link>
      <div className="flex w-full gap-[81px]">
        <nav className="flex gap-[44px]">
          {headerLinks.map((item) => (
            <Link
              key={item.href}
              className={clsx("text-[20px] hover:text-blueCustom font-bold", {
                "text-blueCustom": item.href === pathname,
              })}
              to={item.href}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <HeaderInput />
        <div className="flex gap-[20px] items-center">
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
    </header>
  );
};
