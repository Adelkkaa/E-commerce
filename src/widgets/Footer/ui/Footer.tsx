import { Link } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/use-redux";
import { Button, dialogActions, Typography } from "@/shared/ui";
import {
  firstFooterLinks,
  footerLinks,
  secondFooterLinks,
} from "../constants/footerLinks";

export const Footer = () => {
  const { selectCurrentDialog } = dialogActions;
  const dispatch = useAppDispatch();
  return (
    <footer className="padding flex flex-col">
      <div className="hidden pl-[84px] md:grid py-[21px] border-grayCustom border-b-2 border-t-2 grid-cols-3">
        <div className="flex flex-col gap-[16px]">
          <Typography variant="titleXS">Поддержка</Typography>
          <div className="flex gap-[48px]">
            <div className="flex flex-col">
              <a href="tel:+79189407000" className="text-titleXS">
                +7 (918) 940-70-00
              </a>
              <Typography variant="textXXS">
                звоните в будние дни,
                <br /> 9-18:00
              </Typography>
            </div>
            <div className="flex flex-col">
              <a href="mailto:info@dk-ltd.ru" className="text-titleXS">
                info@dk-ltd.ru
              </a>
              <Typography variant="textXXS">или можете написать нам</Typography>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <ul>
            {firstFooterLinks.map((item) => (
              <li key={item.title}>
                <Link className="text-titleXS font-bold" to={item.href}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <ul>
            {secondFooterLinks.map((item) => (
              <li key={item.title}>
                <Link className="text-titleXS font-bold" to={item.href}>
                  {item.title}
                </Link>
              </li>
            ))}
            <li key="Свяжитесь с нами">
              <Button
                onClick={() => dispatch(selectCurrentDialog("contact"))}
                variant="ghost"
                className="p-0 hover:bg-transparent text-titleXS font-bold"
              >
                Форма связи
              </Button>
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile links */}
      <div className="mb:max-md:flex hidden flex-col items-center py-[21px] border-grayCustom border-b border-t">
        <Typography variant="titleXS">Поддержка</Typography>
        <div className="grid grid-cols-3 gap-[15px] justify-center">
          <div className="flex flex-col text-center ">
            <a href="tel:+79189407000" className="text-titleXS text-blueCustom">
              +7 (918) 940-70-00
            </a>
            <Typography variant="textXXS">
              звоните в будние дни,
              <br /> 9-18
            </Typography>
          </div>
          <div className="flex flex-col text-center">
            <a
              href="mailto:info@dk-ltd.ru"
              className="text-titleXS text-blueCustom"
            >
              info@dk-ltd.ru
            </a>
            <Typography variant="textXXS">или можете написать нам</Typography>
          </div>
          <div className="flex flex-col text-center">
            <Button
              variant="ghost"
              className="!text-titleXS text-blueCustom py-0 px-0"
              onClick={() => dispatch(selectCurrentDialog("contact"))}
            >
              форма связи
            </Button>
            <Typography variant="textXXS">
              или можете написать нам здесь
            </Typography>
          </div>
        </div>
        <ul className="w-full grid grid-cols-2 gap-x-[33px] max-w-[380px]">
          {footerLinks.map((item) => (
            <li key={item.title}>
              <Link className="text-titleXS font-bold" to={item.href}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center py-[20px] mb:max-md:text-center ">
        <Typography variant="textS">
          © 2024. ООО “Два капитана”. Использование материалов сайта в любых
          целях без письменного согласия владельца запрещено.{" "}
          <Link to="/policy" className="text-blueCustom underline">
            Политика конфиденциальности
          </Link>
        </Typography>
      </div>
    </footer>
  );
};
