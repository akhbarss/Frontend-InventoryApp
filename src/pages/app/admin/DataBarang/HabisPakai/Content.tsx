import { PageContent } from "@components/ui/atoms";
import Pagination from "@components/ui/atoms/Pagination";
import CustomTable from "@components/ui/atoms/Table/CustomTable";
import { HeadDataBarang } from "@components/ui/moleculs/DataBarang/HeadDataBarangAdmin";
import { useAppSelector } from "@store/store";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@utils/api/items";
import { columnsDataBarangAdmin } from "@utils/columns/data-barang";
import { ITEM_PER_PAGE } from "@utils/constant";
import { CategoryItem } from "@utils/types/items.type";
import { useState } from "react";
import Modal_DataBarangHabisPakai from "./Modal";

const Content_DataBarang_HabisPakai = () => {
  const [activePage, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(ITEM_PER_PAGE);
  const classId = useAppSelector((st) => st.class.selectedClasses);

  const { data, isLoading } = useQuery({
    queryKey: [
      "get_items",
      {
        category: CategoryItem.BARANG_HABIS_PAKAI,
        classId,
        page: activePage,
        take: itemPerPage,
      },
    ],
    queryFn: () =>
      getItems({
        category: CategoryItem.BARANG_HABIS_PAKAI,
        classId,
        orderBy: "ASC",
        page: activePage,
        take: itemPerPage,
      }),
  });

  return (
    <>
      <PageContent>
        <HeadDataBarang />

        <CustomTable
          key={classId}
          loading={isLoading}
          totalData={100}
          totalPage={10}
          totalRecords={10}
          columns={columnsDataBarangAdmin()}
          data={data?.data!}
        />

        <Pagination
          loading={isLoading}
          onPageChange={setPage}
          activePage={activePage}
          totalPage={data?.meta.pageCount}
          onItemPerPageChange={setItemPerPage}
        />
      </PageContent>

      <Modal_DataBarangHabisPakai />
    </>
  );
};

export default Content_DataBarang_HabisPakai;
