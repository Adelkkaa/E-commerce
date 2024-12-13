import { dialogActions } from "@/entities/Dialog";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { useToast } from "@/shared/hooks/use-toast";
import { useChangeProductFavoritesMutation } from "..";

export const useFavorite = () => {
  const { toast } = useToast();

  const { price_type_guid, guid: outletGuid } = useAppSelector(
    (state) => state.outletsReducer,
  );

  const { selectCurrentDialog } = dialogActions;

  const dispatch = useAppDispatch();

  const [changeFavorites] = useChangeProductFavoritesMutation();

  const errorHandler = (error: any) => {
    console.log(error);
    toast({
      title: "Произошла ошибка",
      description: error?.data?.detail || "Попробуйте еще раз",
      variant: "destructive",
    });
  };

  const onChangeFavorite = async ({
    e,
    guid,
    isFavorite,
  }: {
    guid: string;
    isFavorite: boolean;
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  }) => {
    if (e) {
      e.preventDefault();
    }
    if (!price_type_guid || !outletGuid) {
      dispatch(selectCurrentDialog("login"));
      return;
    }
    try {
      await changeFavorites({
        cart_outlet_guid: outletGuid,
        good_guid: guid,
        isFavorite,
      }).unwrap();
      toast({
        title: `Товар ${isFavorite ? "удален из избранного" : "добавлен в избранное"}`,
      });
    } catch (error: any) {
      errorHandler(error);
    }
  };

  return {
    onChangeFavorite,
  };
};
