import { useQuery } from "@tanstack/react-query";
import { getItems } from "@utils/api/items/index.api";
import { CategoryItem } from "@utils/types/items.type";
import { useMemo } from "react";

export const useItems = (
  categoryItem: CategoryItem,
  page: number,
  take: number,
  classId?: number | null
) => {
  const { data, isLoading } = useQuery({
    queryKey: [
      "get_items",
      {
        category: categoryItem,
        classId,
        page,
        take,
      },
    ],
    queryFn: () =>
      getItems({
        category: categoryItem,
        classId: classId ? classId : null,
        orderBy: "ASC",
        page,
        take,
      }),
    staleTime: 2000,
  });

  return useMemo(
    () => ({
      data,
      isLoading,
    }),
    [categoryItem, page, take, classId, data, isLoading]
  );
};
