import { FC } from "react";
import { useCart } from "@/entities/CartCard";
import { useFavorite } from "@/entities/Favorites";
import {
  getInStockValue,
  PackageSelect,
  SpecificationSelect,
} from "@/entities/ProductCard";
import {
  ProductContentDesktopCart,
  ProductContentInfo,
  ProductContentMobileCart,
  ProductContentProperties,
  ProductContentTabletCart,
} from "@/features/ProductContentBlocks";
import {
  IProductCardPriceV2,
  IProductPackage,
  ISingleProduct,
} from "@/shared/types/types";

interface IProductContentProps {
  productId: string;
  productCard: ISingleProduct;
  selectedSpecification: IProductCardPriceV2 | null;
  selectedPackage: IProductPackage | null;
  setSelectedPackage: (value: IProductPackage) => void;
  setSelectedSpecification: (value: IProductCardPriceV2) => void;
  quantity: number;
}

export const ProductContent: FC<IProductContentProps> = ({
  productId,
  quantity,
  productCard,
  selectedSpecification,
  setSelectedSpecification,
  selectedPackage,
  setSelectedPackage,
}) => {
  const {
    addProductToCart,
    decrementCount,
    incrementCount,
    isAddProductToCartLoading,
    isChangeProductCountLoading,
    isDeleteProductLoading,
  } = useCart();
  const { onChangeFavorite } = useFavorite();

  const handleAddProductToCart = async () => {
    await addProductToCart({
      quantity:
        selectedPackage && !isNaN(Number(selectedPackage.value))
          ? Number(selectedPackage.value)
          : 1,
      specification_guid: selectedSpecification?.specification_guid as string,
      good_guid: productId,
    });
  };

  const handleIncrementCount = async () => {
    await incrementCount({
      quantity,
      specification_guid: selectedSpecification?.specification_guid as string,
      good_guid: productId,
      incrementValue:
        selectedPackage && !isNaN(Number(selectedPackage.value))
          ? Number(selectedPackage.value)
          : 1,
    });
  };

  const handleDecrementCount = async () => {
    await decrementCount({
      quantity,
      specification_guid: selectedSpecification?.specification_guid as string,
      good_guid: productId,
      incrementValue:
        selectedPackage && !isNaN(Number(selectedPackage.value))
          ? Number(selectedPackage.value)
          : 1,
    });
  };

  const handleChangeFavorite = () => {
    onChangeFavorite({
      guid: productId,
      isFavorite: productCard.is_favorite,
    });
  };
  const inStockValue = getInStockValue({
    productInfo: productCard,
    selectedSpecification: selectedSpecification?.specification_guid || null,
  });

  return (
    <>
      <div className="flex mb:max-md:flex-col md:gap-[40px] dk:gap-[90px] max-md:gap-[33px]">
        {productCard.image_key ? (
          <img
            src={productCard.image_key}
            alt="card"
            className="border border-grayCustom rounded-[10px] md:max-dk:min-w-[400px] md:max-dk:max-w-[400px] dk:min-w-[500px] dk:max-w-[500px] h-[500px] bg-white object-contain"
          />
        ) : (
          <div className="border border-grayCustom rounded-[10px] md:max-dk:min-w-[400px] dk:min-w-[500px] h-[500px] bg-white " />
        )}
        <div className="flex flex-col flex-1 justify-between">
          <ProductContentInfo
            inStockValue={inStockValue}
            productCard={productCard}
            selectedSpecification={selectedSpecification}
          />

          <div className="flex flex-col gap-[20px]">
            {(productCard.specification.length > 1 ||
              (productCard.specification.length === 1 &&
                productCard.specification[0].specification_guid !==
                  "нет характеристики")) && (
              <SpecificationSelect
                disabled={isChangeProductCountLoading || isDeleteProductLoading}
                options={productCard.specification}
                value={selectedSpecification?.specification_guid || ""}
                labelText="МРЦ"
                placeholder="Выберите МРЦ"
                onChange={setSelectedSpecification}
              />
            )}

            {productCard.package.length > 1 && (
              <PackageSelect
                disabled={isChangeProductCountLoading || isDeleteProductLoading}
                options={productCard.package}
                value={selectedPackage?.value || ""}
                labelText="Количество"
                placeholder="Выберите количество"
                onChange={setSelectedPackage}
              />
            )}
          </div>

          {selectedSpecification && (
            <ProductContentDesktopCart
              quantity={quantity}
              handleAddProductToCart={handleAddProductToCart}
              handleDecrementCount={handleDecrementCount}
              handleIncrementCount={handleIncrementCount}
              isDisabled={
                isChangeProductCountLoading ||
                isDeleteProductLoading ||
                isAddProductToCartLoading
              }
              inStockValue={inStockValue}
              isFavorite={productCard.is_favorite}
              handleChangeFavorite={handleChangeFavorite}
            />
          )}

          {selectedSpecification && (
            <ProductContentTabletCart
              quantity={quantity}
              handleAddProductToCart={handleAddProductToCart}
              handleDecrementCount={handleDecrementCount}
              handleIncrementCount={handleIncrementCount}
              isDisabled={
                isChangeProductCountLoading ||
                isDeleteProductLoading ||
                isAddProductToCartLoading
              }
              inStockValue={inStockValue}
              isFavorite={productCard.is_favorite}
              handleChangeFavorite={handleChangeFavorite}
            />
          )}
        </div>
      </div>

      {productCard.properties && productCard.properties.length > 0 && (
        <ProductContentProperties productCard={productCard} />
      )}

      <ProductContentMobileCart
        quantity={quantity}
        handleChangeFavorite={handleChangeFavorite}
        handleAddProductToCart={handleAddProductToCart}
        handleDecrementCount={handleDecrementCount}
        handleIncrementCount={handleIncrementCount}
        isDisabled={
          isChangeProductCountLoading ||
          isDeleteProductLoading ||
          isAddProductToCartLoading
        }
        inStockValue={inStockValue}
        isFavorite={productCard.is_favorite}
      />
    </>
  );
};
