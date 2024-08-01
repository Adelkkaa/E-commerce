import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className=" absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <Loader2
        width={64}
        height={64}
        className="animate-spin text-blueCustom"
      />
    </div>
  );
};
