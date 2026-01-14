import { cn } from "@/lib/utils";
import { usePagination } from "../_hooks/usePagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type DynamicPaginationProps = {
  totalPage: number;
};

export const DynamicPagination = ({ totalPage }: DynamicPaginationProps) => {
  const {
    currentPage,
    handleNext,
    handlePageChange,
    handlePrevious,
    totalPages,
    displayPages,
  } = usePagination();
  return (
    <div className="relative">
      <div className="absolute">
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={handlePrevious} />
              </PaginationItem>
            )}
            {displayPages.map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={handlePageChange(pageNumber)}
                  className={cn(pageNumber === currentPage && "bg-gray-200")}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < totalPage - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={handleNext} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
