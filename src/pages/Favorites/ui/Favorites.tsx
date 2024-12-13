import { dialogActions } from "@/entities/Dialog";
import { useGetFavoritesListQuery } from "@/entities/Favorites";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { Loader, Typography } from "@/shared/ui";
import { FavoritesTable } from "@/widgets/FavoritesTable";

export const Favorites = () => {
  const { price_type_guid, guid } = useAppSelector(
    (state) => state.outletsReducer,
  );

  const { selectCurrentDialog } = dialogActions;

  const dispatch = useAppDispatch();

  const { data: favoritesList, isLoading } = useGetFavoritesListQuery(
    {
      cart_outlet_guid: guid as string,
      price_type_guid: price_type_guid as string,
    },
    { skip: !guid || !price_type_guid },
  );

  const handleAuthClick = () => {
    dispatch(selectCurrentDialog("login"));
  };

  if (!guid || !price_type_guid) {
    return (
      <section className="padding bg-whiteCustom max-md:relative">
        <div className="max-md:py-[20px] md:py-[71px] justify-center flex items-start gap-[5px]">
          <Typography variant="textXl">
            Для просмотра избранного необходимо{" "}
            <span
              className="text-blueCustom underline underline-offset-8 cursor-pointer"
              role="link"
              aria-disabled="true"
              onClick={handleAuthClick}
            >
              авторизоваться
            </span>
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <section className="max-md:my-[20px] my-[71px]">
      {isLoading ? (
        <Loader />
      ) : (
        favoritesList && <FavoritesTable favorites={favoritesList.goods} />
      )}
    </section>
  );
};
