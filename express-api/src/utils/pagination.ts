// src/utils/pagination.ts

interface Pagination {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export function getPagination(
  count: number,
  limit: number,
  offset: number
): Pagination {
  const totalPages = Math.ceil(count / limit);
  const currentPage = Math.ceil(offset / limit) + 1;
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    totalItems: count,
    itemsPerPage: limit,
    currentPage: currentPage,
    totalPages: totalPages,
    hasNextPage: hasNextPage,
    hasPreviousPage: hasPreviousPage,
    nextPage: hasNextPage ? currentPage + 1 : null,
    previousPage: hasPreviousPage ? currentPage - 1 : null,
  };
}
