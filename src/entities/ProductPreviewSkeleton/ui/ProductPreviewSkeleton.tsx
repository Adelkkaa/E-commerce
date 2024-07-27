import Skeleton from "react-loading-skeleton";

export const ProductPreviewSkeleton = () => {
  return (
    <>
      <Skeleton className="border border-grayCustom rounded-[10px] mb:min-w-[300px] xl:min-w-[500px] lg:h-[500px] max-lg:h-[300px] overflow-x-hidden" />
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-[20px]">
          <Skeleton className="h-[60px] w-full overflow-x-hidden rounded-lg" />
          <Skeleton className="h-[60px] overflow-x-hidden rounded-lg" />

          <div className="border border-grayCustom" />
          <Skeleton className="h-[60px] overflow-x-hidden rounded-lg" />

          <Skeleton className="h-[60px] overflow-x-hidden rounded-lg" />
        </div>
        <div className="hidden md:flex gap-[20px]">
          <div className="flex justify-center items-center gap-[30px] !h-full">
            <Skeleton className="h-[60px] overflow-x-hidden rounded-lg" />
          </div>
          <Skeleton className="h-[60px] overflow-x-hidden rounded-lg" />
        </div>
      </div>
    </>
  );
};
