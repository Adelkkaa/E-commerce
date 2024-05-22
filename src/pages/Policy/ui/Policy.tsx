import { Typography } from "@/shared/ui";
import { fillingPolicy } from "../constants/fillingPolicy";

export const Policy = () => {
  return (
    <section className="mt-[40px] flex flex-col gap-10">
      <Typography variant="textM">{fillingPolicy.title}</Typography>
      <ol className="flex flex-col gap-10">
        {fillingPolicy.subtitles.map((title, index) => (
          <li key={index}>
            <Typography variant="textM">{title.subtitle}</Typography>
            <ol className="flex flex-col gap-10">
              {title.list.map((subtitle, index) => (
                <li key={index}>
                  <Typography variant="textM">{subtitle.listTitle}</Typography>
                  {subtitle.listSubtitles && (
                    <ol className="flex flex-col gap-10 mt-10">
                      {subtitle.listSubtitles.map((item, index) => (
                        <li key={index}>
                          <Typography variant="textM">
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
