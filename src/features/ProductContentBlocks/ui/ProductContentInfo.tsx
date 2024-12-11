import { FC } from "react";
import { getPreviewPriceForSinglePage } from "@/entities/ProductCard";
import { IProductCardPriceV2, IProductCardV2 } from "@/shared/types/types";
import { Typography } from "@/shared/ui";

interface IProductContentInfoProps {
  productCard: IProductCardV2;
  selectedSpecification: IProductCardPriceV2 | null;
  inStockValue: number;
}

export const ProductContentInfo: FC<IProductContentInfoProps> = ({
  productCard,
  selectedSpecification,
  inStockValue,
}) => {
  return (
    <div className="flex flex-col gap-[20px]">
      <Typography variant="titleL" className="max-md:text-textL">
        {productCard.name}
      </Typography>
      <Typography variant="titleL" className="max-md:text-textL">
        {productCard &&
          getPreviewPriceForSinglePage({
            prices: productCard.specification,
            selectedSpecification:
              selectedSpecification?.specification_guid || null,
          })}
      </Typography>
      <div className="border border-grayCustom" />
      <Typography variant="textL" className="font-semibold max-md:text-titleXS">
        В наличии на складе:{" "}
        <span className="text-blueCustom">
          {inStockValue > 10 ? "Больше 10 шт" : `${inStockValue} шт`}
        </span>
      </Typography>
      <Typography variant="textM" className="text-textS">
        {productCard.description}
      </Typography>
    </div>
  );
};
