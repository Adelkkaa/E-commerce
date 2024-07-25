import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { scrollToTop } from "@/shared/lib/scrollToTop";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui";

interface IProductsPaginationProps {
  activePage: number;
  totalPages: number;
}

export const ProductsPagination: FC<IProductsPaginationProps> = ({
  activePage,
  totalPages,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    scrollToTop();
  };

  const generatePageLinks = () => {
    const pages = [];
    const pageRange = 2; // Number of pages to show around the active page

    // Always show the first page
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          isActive={activePage === 1}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(1);
          }}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    if (activePage > pageRange + 2) {
      pages.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Pages around the active page
    for (
      let i = Math.max(2, activePage - pageRange);
      i <= Math.min(totalPages - 1, activePage + pageRange);
      i++
    ) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === activePage}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (activePage < totalPages - pageRange - 1) {
      pages.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Always show the last page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            isActive={totalPages === activePage}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (activePage > 1) handlePageChange(activePage - 1);
            }}
          />
        </PaginationItem>
        {generatePageLinks()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (activePage < totalPages) handlePageChange(activePage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
