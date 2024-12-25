import { Link } from "react-router-dom";
import { Typography } from "@/shared/ui";

export const NotFound = () => {
  return (
    <section className="max-xl:padding md:mt-[100px] max-md:items-center flex flex-col gap-10 max-md:gap-4 max-w-[794px] my-[40px] max-md:my-[20px]">
      <Typography
        variant="textAlertTitle"
        className="font-bold max-md:text-[100px] max-md:leading-[90px]"
      >
        404
      </Typography>
      <Typography
        variant="modalTitle"
        className="leading-[20px] max-md:text-[16px]"
      >
        К сожалению, такой страницы не существует,
      </Typography>
      <div className="flex gap-3">
        <Typography
          variant="modalTitle"
          className="leading-[20px] max-md:text-[16px]"
        >
          перейдите на
        </Typography>
        <Link
          to="/"
          className="!text-modalTitle leading-[20px] p-0 text-blueCustom max-md:!text-[16px]"
        >
          Главную
        </Link>
      </div>
    </section>
  );
};
