import Paginations from "@components/ui/atoms/Pagination";
import { SelectButtonQuery } from "@components/ui/atoms/SelectButtonQuery";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@utils/api/items/index.api";
import usePagination from "@utils/hooks/usePagination";
import { CategoryItem } from "@utils/types/items.type";
import { Major } from "@utils/types/major.enum";
import { StringParam, useQueryParam } from "use-query-params";
import { ButtonExport, PageContent } from "../../../../components/ui/atoms";
import PageLabel from "../../../../components/ui/atoms/PageLabel";
import CustomTable from "../../../../components/ui/atoms/Table/CustomTable";
import { columnsDataBarangSuperAdmin } from "../../../../utils/columns/data-barang.column";

const DataBarang_SuperAdmin = () => {
  const [major] = useQueryParam("major", StringParam);
  const { page, take, setActivePage, setItemPerPage } = usePagination();

  const { data, isLoading } = useQuery({
    queryKey: [
      "get_all_items_superadmin",
      { pagination: { page, take }, major },
    ],
    queryFn: () =>
      getItems({
        category: null!,
        classId: null,
        major: major!,
        orderBy: "ASC",
        page,
        take,
      }),
  });

  return (
    <>
      <PageLabel label="Data Barang" />
      <PageContent>
        <Group>
          <SelectButtonQuery
            queryName="major"
            placeholder="Jurusan"
            data={Object.values(Major)}
          />
          <ButtonExport onCancel={() => {}} onConfirm={() => {}} />
        </Group>

        <CustomTable
          loading={isLoading}
          data={data?.payload.data!}
          columns={columnsDataBarangSuperAdmin(CategoryItem.BARANG_TIDAK_HABIS_PAKAI)}
          totalPage={data?.payload?.meta.pageCount!}
        />

        <Paginations
          activePage={page}
          loading={isLoading}
          onPageChange={setActivePage}
          onItemPerPageChange={setItemPerPage}
          totalPage={data?.payload?.meta.pageCount!}
        />
      </PageContent>
    </>
  );
};

export default DataBarang_SuperAdmin;
