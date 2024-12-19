import { AccordionHeader } from "@radix-ui/react-accordion";
import { FilterCheckbox } from "@/entities/FilterCheckbox";
import { cn } from "@/shared/lib/utils";
import { IProductGroups } from "@/shared/types/types";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui";

interface IRenderProductGroupsArgs {
  productGroups: IProductGroups[];
  nesting: number;
  categories: string[];
  handleCategoriesFilterChange: (value: string) => void;
}

export const renderProductGroups = ({
  categories,
  handleCategoriesFilterChange,
  nesting,
  productGroups,
}: IRenderProductGroupsArgs) => {
  return productGroups.map((item) => {
    if (item.child_groups.length === 0) {
      return (
        <FilterCheckbox
          key={item.guid}
          id={item.guid}
          label={item.name}
          value={item.guid}
          checked={categories.includes(item.guid)}
          onChange={handleCategoriesFilterChange}
          className={cn({
            "ml-[10px]": nesting === 1,
            "ml-[20px]": nesting === 2,
            "ml-[30px]": nesting === 3,
            "ml-[40px]": nesting === 4,
            "ml-[50px]": nesting === 5,
          })}
        />
      );
    }
    return (
      <AccordionItem key={item.guid} value={item.guid}>
        <div className="flex justify-between items-center">
          <AccordionHeader>
            <FilterCheckbox
              id={item.guid}
              label={item.name}
              value={item.guid}
              checked={categories.includes(item.guid)}
              onChange={handleCategoriesFilterChange}
              className={cn({
                "ml-[10px]": nesting === 1,
                "ml-[20px]": nesting === 2,
                "ml-[30px]": nesting === 3,
                "ml-[40px]": nesting === 4,
                "ml-[50px]": nesting === 5,
              })}
            />
          </AccordionHeader>
          <AccordionTrigger
            headerClassname="border-b-0 mb-0"
            className="pb-0"
            iconVariant="chevron"
          />
        </div>
        <AccordionContent className="flex flex-col gap-[20px] mt-[20px] pb-0">
          {renderProductGroups({
            categories,
            handleCategoriesFilterChange,
            nesting: nesting + 1,
            productGroups: item.child_groups,
          })}
        </AccordionContent>
      </AccordionItem>
    );
  });
};

const handleSearchCategory = (
  productGroups: IProductGroups[],
  guid: string,
): IProductGroups | null => {
  if (productGroups.length === 0) {
    return null;
  }

  for (const item of productGroups) {
    if (item.guid === guid) {
      return item;
    }

    const nestedResult = handleSearchCategory(item.child_groups, guid);
    if (nestedResult) {
      return nestedResult;
    }
  }

  return null;
};

export const handleSearchParentCategories = (
  productGroups: IProductGroups[],
  guid: string,
) => {
  const parentItems: string[] = [];
  const currentGroup = handleSearchCategory(productGroups, guid);
  if (currentGroup?.parent_group_guid) {
    parentItems.push(currentGroup.parent_group_guid);
    const result = handleSearchParentCategories(
      productGroups,
      currentGroup.parent_group_guid,
    );
    parentItems.push(...result);
  } else {
    return [];
  }
  return parentItems;
};

export const handleInitializeOpenState = (
  productGroups: IProductGroups[],
  selectedCategories: string[],
) => {
  if (selectedCategories.length === 0 || productGroups.length === 0) {
    return [];
  }
  const res: string[] = [];

  for (const item of selectedCategories) {
    const parentItems = handleSearchParentCategories(productGroups, item);
    res.push(...parentItems);
  }

  return res;
};

export const prepareAddCategoriesData = ({
  productGroups,
  guid,
  categories,
}: {
  productGroups: IProductGroups[];
  guid: string;
  categories: string[];
}) => {
  const parentItems = handleSearchParentCategories(productGroups, guid);

  return categories.filter((item) => !parentItems.includes(item));
};
