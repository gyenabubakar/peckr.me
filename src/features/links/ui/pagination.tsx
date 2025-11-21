import { Button } from 'shadcn/button';
import { Card, CardContent } from 'shadcn/card';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Card className="fixed bottom-6 left-[calc(50%+var(--sidebar-full-width)/2)] w-6/12 -translate-x-1/2 z-5 drop-shadow-2xl border-border py-3">
      <CardContent className="flex items-center justify-between gap-8 px-4">
        <p className="font-medium text-gray-600">
          Viewing{' '}
          <span className="font-semibold text-gray-900">
            {startItem}-{endItem}
          </span>{' '}
          of <span className="font-semibold text-gray-900">{totalItems}</span>{' '}
          {totalItems === 1 ? 'link' : 'links'}
        </p>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
