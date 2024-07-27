import Skeleton from "react-loading-skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="flex mb:max-md:flex-col md:gap-[90px] max-md:gap-[33px]">
      <Skeleton className="border border-grayCustom rounded-[10px] md:max-dk:min-w-[400px] dk:min-w-[500px] h-[500px] overflow-x-hidden " />
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-[20px]">
          <Skeleton className="h-[120px] w-full overflow-x-hidden rounded-lg" />
          <Skeleton className="h-[60px] overflow-x-hidden rounded-lg" />

          <div className="border border-grayCustom" />
          <Skeleton className="h-[120px] overflow-x-hidden rounded-lg" />

          <Skeleton className="h-[120px] overflow-x-hidden rounded-lg" />
        </div>
        <div className="hidden md:flex gap-[50px]">
          <div className="flex justify-center items-center gap-[30px] !h-full">
            <Skeleton className="h-[120px] overflow-x-hidden rounded-lg" />
          </div>
          <Skeleton className="h-[120px] overflow-x-hidden rounded-lg" />
        </div>
      </div>
    </div>
  );
};
