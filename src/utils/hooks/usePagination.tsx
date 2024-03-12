import { useState, useEffect } from "react";

interface PaginationData<T> {
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  currentData: T[];
  currentPage: number;
  maxPage: number;
}

// Custom hook untuk pagination
export function usePagination<T>(
  data: T[],
  itemsPerPage: number
): PaginationData<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);
  const [currentData, setCurrentData] = useState<T[]>([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentData(data.slice(startIndex, endIndex));
  }, [currentPage, data, itemsPerPage]);

  function nextPage() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prevPage() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function goToPage(page: number) {
    const pageNumber = Math.max(1, Math.min(page, maxPage));
    setCurrentPage(pageNumber);
  }

  return {
    nextPage,
    prevPage,
    goToPage,
    currentData,
    currentPage,
    maxPage,
  };
}
