import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { IProductCardV2 } from "@/shared/types/types";
import { Typography } from "@/shared/ui";

interface IProductContentPropertiesProps {
  productCard: IProductCardV2;
}

export const ProductContentProperties: FC<IProductContentPropertiesProps> = ({
  productCard,
}) => {
  return (
    <div className="flex flex-col mt-[50px] gap-[30px]">
      <Typography variant="titleL" className="max-md:text-textL">
        Дополнительная информация
      </Typography>
      <div>
        {productCard.properties.map((item, index) => {
          return (
            <div
              key={index}
              className={cn("flex justify-between rounded-[10px] p-1", {
                "bg-whiteBg": index % 2 === 0,
              })}
            >
              <Typography variant="textL" className="w-[50%] text-center">
                {item.name}
              </Typography>
              <Typography variant="textL" className="w-[50%] text-center">
                {item.value}
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};
