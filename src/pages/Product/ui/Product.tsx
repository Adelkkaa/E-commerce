import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductInCartQuery } from "@/entities/CartCard";
import { useGetProductCardSingleQuery } from "@/entities/ProductCard";
import { ProductSkeleton } from "@/entities/ProductSkeleton";
import { useAppSelector } from "@/shared/hooks/use-redux";
import { scrollToTop } from "@/shared/lib/scrollToTop";
import { IProductCardPriceV2, IProductPackage } from "@/shared/types/types";
import { ProductContent } from "@/widgets/ProductContent";

export const Product = () => {
  const { productId } = useParams();
  const [selectedSpecification, setSelectedSpecification] =
    useState<IProductCardPriceV2 | null>(null);
  const { price_type_guid, guid } = useAppSelector(
    (state) => state.outletsReducer,
  );
  const [selectedPackage, setSelectedPackage] =
    useState<IProductPackage | null>(null);

  const {
    data: productCard,
    isLoading,
    isSuccess,
  } = useGetProductCardSingleQuery({
    guid: productId as string,
    price_type_guid,
    cart_outlet_guid: guid,
  });

  const { data: productInCart, isLoading: isProductInCartLoading } =
    useGetProductInCartQuery(
      {
        cart_outlet_guid: guid as string,
        good_guid: productId as string,
        specification_guid: selectedSpecification?.specification_guid as string,
      },
      {
        skip:
          !guid ||
          !productCard?.specification.length ||
          !selectedSpecification?.specification_guid,
      },
    );

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setSelectedSpecification(productCard.specification[0]);
      setSelectedPackage(productCard.package[0]);
    }
  }, [isSuccess]);

  return (
    <section className="relative mb-[71px] mt-[26px] max-md:px-[20px]">
      {isLoading || isProductInCartLoading ? (
        <ProductSkeleton />
      ) : (
        productCard && (
          <ProductContent
            quantity={productInCart?.quantity || 0}
            productId={productId as string}
            productCard={productCard}
            selectedPackage={selectedPackage}
            selectedSpecification={selectedSpecification}
            setSelectedSpecification={setSelectedSpecification}
            setSelectedPackage={setSelectedPackage}
          />
        )
      )}
    </section>
  );
};
