"use strict";
// src/utils/pagination.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = getPagination;
function getPagination(count, limit, offset) {
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
