import { FC } from "react";
import {
  useAddProductToCartMutation,
  useChangeProductCountMutation,
  useDeleteProductMutation,
} from "@/entities/CartCard";
import { dialogActions } from "@/entities/Dialog";
import { getInStockValue, SpecificationSelect } from "@/entities/ProductCard";
import {
  ProductContentDesktopCart,
  ProductContentInfo,
  ProductContentMobileCart,
  ProductContentProperties,
  ProductContentTabletCart,
} from "@/features/ProductContentBlocks";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { useToast } from "@/shared/hooks/use-toast";
import { IProductCardPriceV2, ISingleProduct } from "@/shared/types/types";

interface IProductContentProps {
  productId: string;
  productCard: ISingleProduct;
  selectedSpecification: IProductCardPriceV2 | null;
  setSelectedSpecification: (value: IProductCardPriceV2) => void;
  quantity: number;
}

export const ProductContent: FC<IProductContentProps> = ({
  productId,
  quantity,
  productCard,
  selectedSpecification,
  setSelectedSpecification,
}) => {
  const { toast } = useToast();
  const { price_type_guid, guid: outletGuid } = useAppSelector(
    (state) => state.outletsReducer,
  );
  const dispatch = useAppDispatch();
  const { selectCurrentDialog } = dialogActions;

  const [changeProductCount, { isLoading: isChangeProductCountLoading }] =
    useChangeProductCountMutation();
  const [addProductToCart, { isLoading: isAddProductToCartLoading }] =
    useAddProductToCartMutation();
  const [deleteProduct, { isLoading: isDeleteProductLoading }] =
    useDeleteProductMutation();

  const errorHandler = (error: any) => {
    console.log(error);
    toast({
      title: "Произошла ошибка",
      description: error?.data?.detail || "Попробуйте еще раз",
      variant: "destructive",
    });
  };

  const handleAddProductToCart = async () => {
    if (!price_type_guid || !outletGuid) {
      dispatch(selectCurrentDialog("login"));
      return;
    }
    try {
      await addProductToCart({
        cart_outlet_guid: outletGuid,
        body: {
          specification_guid:
            selectedSpecification?.specification_guid as string,
          quantity: 1,
          price_type_guid,
          good_guid: productId,
        },
      }).unwrap();
      toast({
        title: "Товар добавлен в корзину",
      });
    } catch (error: any) {
      errorHandler(error);
    }
  };
  const handleIncrementCount = async () => {
    if (!price_type_guid || !outletGuid) {
      dispatch(selectCurrentDialog("login"));
      return;
    }
    try {
      await changeProductCount({
        cart_outlet_guid: outletGuid,
        body: {
          specification_guid:
            selectedSpecification?.specification_guid as string,
          quantity: quantity + 1,
          price_type_guid,
          good_guid: productId,
        },
      }).unwrap();
      toast({
        title: "Товар добавлен в корзину",
      });
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const handleDecrementCount = async () => {
    if (!price_type_guid || !outletGuid) {
      dispatch(selectCurrentDialog("login"));
      return;
    }
    if (quantity > 1) {
      try {
        await changeProductCount({
          cart_outlet_guid: outletGuid,
          body: {
            specification_guid:
              selectedSpecification?.specification_guid as string,
            quantity: quantity - 1,
            price_type_guid,
            good_guid: productId,
          },
        }).unwrap();
        toast({
          title: "Товар удален из корзины",
        });
      } catch (error: any) {
        errorHandler(error);
      }
    } else {
      handleDeleteProduct();
    }
  };

  const handleDeleteProduct = async () => {
    if (!price_type_guid || !outletGuid) {
      dispatch(selectCurrentDialog("login"));
      return;
    }
    try {
      await deleteProduct({
        cart_outlet_guid: outletGuid,
        good_guid: productId,
        specification_guid: selectedSpecification?.specification_guid as string,
      }).unwrap();
      toast({
        title: "Товар удален из корзины",
      });
    } catch (error: any) {
      errorHandler(error);
    }
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
            />
          )}
        </div>
      </div>

      {productCard.properties && productCard.properties.length > 0 && (
        <ProductContentProperties productCard={productCard} />
      )}

      <ProductContentMobileCart
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
      />
    </>
  );
};
