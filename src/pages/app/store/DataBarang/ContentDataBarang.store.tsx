import { PageContent } from "@components/ui/atoms";
import Paginations from "@components/ui/atoms/Pagination";
import CustomTable from "@components/ui/atoms/Table/CustomTable";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@utils/api/items/index.api";
import { useAuth } from "@utils/hooks/useAuth";
import usePagination from "@utils/hooks/usePagination";
import { CategoryItem } from "@utils/types/items.type";
import React, { useMemo } from "react";
import { StringParam, useQueryParam } from "use-query-params";
import { ModalDataBarang } from "./ModalDataBarang.store";
import { HeadDataBarang } from "@components/ui/moleculs/DataBarang/HeadDataBarangStore";
import { columnsDataBarangStore } from "@utils/columns/data-barang.store.column";

export const ContentDataBarang = ({
  categoryItem,
}: {
  categoryItem: CategoryItem;
}) => {
  console.log("content");
  const { user } = useAuth();
  const major = user?.role?.major;

  const [classIdValue] = useQueryParam("classId", StringParam);
  const { page, take, setActivePage, setItemPerPage } = usePagination();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "get_items",
      {
        category: categoryItem,
        classId: classIdValue,
        page,
        take,
      },
    ],
    queryFn: () =>
      getItems({
        category: categoryItem,
        classId: classIdValue ? +classIdValue : null,
        orderBy: "ASC",
        page,
        take,
        major: major!,
      }),
    staleTime: 2000,
    enabled: major !== null,
  });

  if (isError) {
    return (
      <PageContent>
        <p>{JSON.stringify(error)}</p>
      </PageContent>
    );
  }

  const head = useMemo(
    () => <HeadDataBarang categoryItem={categoryItem} />,
    []
  );
  const paginations = useMemo(
    () => (
      <Paginations
        activePage={page}
        loading={isLoading}
        onPageChange={setActivePage}
        onItemPerPageChange={setItemPerPage}
        totalPage={data?.payload?.meta.pageCount!}
      />
    ),
    [page, isLoading]
  );

  const modal = useMemo(
    () => <ModalDataBarang categoryItem={categoryItem} />,
    [categoryItem]
  );

  return (
    <PageContent>
      {head}
      <CustomTable
        loading={isLoading}
        data={data?.payload.data!}
        columns={columnsDataBarangStore(categoryItem)}
        totalPage={data?.payload?.meta.pageCount!}
      />
      {paginations}
      {modal}
    </PageContent>
  );
};

export const ContentDataBarangMemoized = React.memo(
  ContentDataBarang
) as typeof ContentDataBarang;
