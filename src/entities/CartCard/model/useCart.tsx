import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { useToast } from "@/shared/hooks/use-toast";
import { dialogActions } from "@/shared/ui";
import {
  useAddProductToCartMutation,
  useChangeProductCountMutation,
  useDeleteProductMutation,
} from "../api";
import { IChangeProductCountResponse } from "../api/cartApi";

export const useCart = () => {
  const { toast } = useToast();

  const { price_type_guid, guid: outletGuid } = useAppSelector(
    (state) => state.outletsReducer,
  );

  const { selectCurrentDialog } = dialogActions;
  const dispatch = useAppDispatch();

  const [
    changeProductCountMutation,
    { isLoading: isChangeProductCountLoading },
  ] = useChangeProductCountMutation();
  const [addProductToCartMutation, { isLoading: isAddProductToCartLoading }] =
    useAddProductToCartMutation();
  const [deleteProductMutation, { isLoading: isDeleteProductLoading }] =
    useDeleteProductMutation();

  const errorHandler = (error: any) => {
    console.log(error);
    toast({
      title: "Произошла ошибка",
      description: error?.data?.detail || "Попробуйте еще раз",
      variant: "destructive",
    });
  };

  const addProductToCart = async ({
    quantity,
    specification_guid,
    good_guid,
  }: Omit<IChangeProductCountResponse, "price_type_guid">) => {
    if (!price_type_guid || !outletGuid) {
      dispatch(selectCurrentDialog("login"));
      return;
    }
    try {
      await addProductToCartMutation({
        cart_outlet_guid: outletGuid,
        body: {
          specification_guid,

          quantity,
          price_type_guid,
          good_guid,
        },
      }).unwrap();
      toast({
        title: "Товар добавлен в корзину",
      });
    } catch (error: any) {
      errorHandler(error);
    }
  };
  const incrementCount = async ({
    quantity,
    specification_guid,
    good_guid,
  }: Omit<IChangeProductCountResponse, "price_type_guid">) => {
    if (!price_type_guid || !outletGuid) {
      dispatch(selectCurrentDialog("login"));
      return;
    }
    try {
      await changeProductCountMutation({
        cart_outlet_guid: outletGuid,
        body: {
          specification_guid,
          quantity: quantity + 1,
          price_type_guid,
          good_guid,
        },
      }).unwrap();
      toast({
        title: "Товар добавлен в корзину",
      });
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const decrementCount = async ({
    quantity,
    specification_guid,
    good_guid,
  }: Omit<IChangeProductCountResponse, "price_type_guid">) => {
    if (!price_type_guid || !outletGuid) {
      dispatch(selectCurrentDialog("login"));
      return;
    }
    if (quantity > 1) {
      try {
        await changeProductCountMutation({
          cart_outlet_guid: outletGuid,
          body: {
            specification_guid,
            quantity: quantity - 1,
            price_type_guid,
            good_guid,
          },
        }).unwrap();
        toast({
          title: "Товар удален из корзины",
        });
      } catch (error: any) {
        errorHandler(error);
      }
    } else {
      deleteProduct({
        specification_guid,
        good_guid,
      });
    }
  };

  const deleteProduct = async ({
    specification_guid,
    good_guid,
  }: Omit<IChangeProductCountResponse, "price_type_guid" | "quantity">) => {
    if (!price_type_guid || !outletGuid) {
      dispatch(selectCurrentDialog("login"));
      return;
    }
    try {
      await deleteProductMutation({
        cart_outlet_guid: outletGuid,
        good_guid,
        specification_guid,
      }).unwrap();
      toast({
        title: "Товар удален из корзины",
      });
    } catch (error: any) {
      errorHandler(error);
    }
  };

  return {
    isChangeProductCountLoading,
    isAddProductToCartLoading,
    isDeleteProductLoading,
    addProductToCart,
    incrementCount,
    decrementCount,
    deleteProduct,
  };
};
