import Skeleton from "react-loading-skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="w-[230px] min-h-[288px] bg-whiteCustom p-3 pb-2 rounded-lg border ">
      <Skeleton className="h-[212px] overflow-x-hidden rounded-lg" />
      <Skeleton className="h-[76px] overflow-x-hidden rounded-lg" />
    </div>
  );
};
