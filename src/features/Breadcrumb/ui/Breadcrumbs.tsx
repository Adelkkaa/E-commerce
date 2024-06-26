// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useMatches } from "react-router-dom";
import { cn } from "@/shared/lib/utils";

export function Breadcrumbs() {
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));

  return (
    <ol className="flex gap-[10px] text-buttonM max-md:text-[12px]">
      {crumbs.map((crumb, index) => (
        <li
          key={index}
          className={cn("text-white flex gap-[10px]", {
            "select-none [&_a]:cursor-default":
              index === crumbs.length - 1 || crumbs.length === 1,
            "[&_a]:hover:text-white [&_a]:hover:opacity-80 ":
              index < crumbs.length - 1,
          })}
        >
          {crumb}
          {index < crumbs.length - 1 && <span>|</span>}
        </li>
      ))}
    </ol>
  );
}
