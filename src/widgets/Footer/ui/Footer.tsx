import { Link } from "react-router-dom";
import { Typography } from "@/shared/ui";
import { firstFooterLinks, secondFooterLinks } from "../constants/footerLinks";

export const Footer = () => {
  return (
    <footer className="padding flex flex-col">
      <div className="py-[21px] border-grayCustom border-b-2 border-t-2 grid grid-cols-3">
        <div className="pl-[84px] flex flex-col gap-[16px]">
          <Typography variant="titleXS">Поддержка</Typography>
          <div className="flex gap-[48px]">
            <div className="flex flex-col">
              <a href="tel:+79991234567" className="text-titleXS">
                +7 (999) 123-45-67
              </a>
              <Typography variant="textXXS">
                звоните в будние дни,
                <br /> 9-18:00
              </Typography>
            </div>
            <div className="flex flex-col">
              <a href="mailto:support@dvakapitana.ru" className="text-titleXS">
                support@dvakapitana.ru
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
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center py-[20px]">
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
