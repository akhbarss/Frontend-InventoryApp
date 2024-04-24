import { ITEM_PER_PAGE } from "@utils/constant";
import { useCallback, useMemo, useState } from "react";

const usePagination = () => {
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(ITEM_PER_PAGE);

  const setActivePage = useCallback((value: number) => {
    setPage(value);
  }, []);
  const setItemPerPage = useCallback((value: number) => {
    setTake(value);
    setPage(1)
  }, []);

  const paginationProps = useMemo(() => {
    return {
      take,
      page,
      setActivePage,
      setItemPerPage,
    };
  }, [page, take]);

  return paginationProps;
};

export default usePagination;
