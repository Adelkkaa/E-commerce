import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { HeaderInput } from "@/features/HeaderInput";
import mainLogo from "@/shared/assets/images/MainLogo.jpg";
import ProfileIcon from "@/shared/assets/images/Profile.svg";
import CartIcon from "@/shared/assets/images/ShoppingCart.svg";
import { navigationLinks } from "../constants/navigationLinks";

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="flex items-end gap-[81px] py-[20px]">
      <Link to="/" className="min-w-[160px] max-w-[160px]">
        <img src={mainLogo} alt="mainLogo" />
      </Link>
      <div className="flex w-full gap-[81px]">
        <nav className="flex gap-[44px]">
          {navigationLinks.map((item) => (
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
          <CartIcon className="cursor-pointer " />
          <ProfileIcon className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
};
