import { Typography } from "@/shared/ui";
import { fillingPolicy } from "../constants/fillingPolicy";

export const Policy = () => {
  return (
    <section className="my-[40px] max-md:my-[20px] max-xl:padding flex flex-col gap-10 max-md:gap-4">
      <Typography variant="textM" className="max-md:text-[12px]">
        Настоящая Политика конфиденциальности персональной информации (далее —
        Политика конфиденциальности) действует в отношении всей информации,
        которую CASE (далее — Оператор) может получить от Пользователя сети
        Интернет (далее — Пользователь) во время использования им Сайта,
        размещённого в сети Интернет по адресу{" "}
        <span className="text-red-500 font-black">https://</span> (далее —
        Сайт). Использование Сайта означает безоговорочное согласие с настоящей
        Политикой конфиденциальности и указанными в ней условиями обработки его
        персональной информации. В случае несогласия с этими условиями
        Пользователь должен воздержаться от предоставления своих персональных
        данных Оператору.,
      </Typography>
      <ol className="flex flex-col gap-10 max-md:gap-4">
        {fillingPolicy.subtitles.map((title, index) => (
          <li key={index}>
            <Typography variant="textM" className="max-md:text-[12px]">
              {title.subtitle}
            </Typography>
            <ol className="flex flex-col gap-10 max-md:gap-4">
              {title.list.map((subtitle, index) => (
                <li key={index}>
                  <Typography variant="textM" className="max-md:text-[12px]">
                    {subtitle.listTitle}
                  </Typography>
                  {subtitle.listSubtitles && (
                    <ol className="flex flex-col gap-10 max-md:gap-4 mt-10">
                      {subtitle.listSubtitles.map((item, index) => (
                        <li key={index}>
                          <Typography
                            variant="textM"
                            className="max-md:text-[12px]"
                          >
                            {item.listSubtitle}
                          </Typography>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </section>
  );
};
