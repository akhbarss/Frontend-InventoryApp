import { ButtonPlus, PageContent } from "@components/ui/atoms";
import Paginations from "@components/ui/atoms/Pagination";
import { SelectButtonQuery } from "@components/ui/atoms/SelectButtonQuery";
import CustomTable from "@components/ui/atoms/Table/CustomTable";
import { Group } from "@mantine/core";
import { useModalStore } from "@store/useModalStore";
import { useQuery } from "@tanstack/react-query";
import {
  LabelStatusRequestItem,
  StatusRequestItem,
  getAllItemRequest,
} from "@utils/api/item-request/item-request.api";
import { useAuth } from "@utils/hooks/useAuth";
import usePagination from "@utils/hooks/usePagination";
import { ItemType } from "@utils/types/items.type";
import React, { useCallback, useMemo } from "react";
import { StringParam, useQueryParam } from "use-query-params";
import ModalPermintaanBarang from "./ModalPermintaanBarang";
import { columnsPermintaanBarangStore } from "@utils/columns/permintaan-barang.store.column";

type ContentPermintaanBarangProps = {
  itemType: ItemType;
};

const ContentPermintaanBarang = React.memo(
  ({ itemType }: ContentPermintaanBarangProps) => {
    console.log("Content");
    const { user } = useAuth();
    const major = user.role?.major;
    const { setOpenedModalCreate } = useModalStore();
    const [status] = useQueryParam("status", StringParam);
    const { page, take, setActivePage, setItemPerPage } = usePagination();
    const openModalCreate = useCallback(() => setOpenedModalCreate(true), []);

    const { data, isLoading } = useQuery({
      queryKey: [
        "get_all_item_request",
        { itemType, page, take, major, status },
      ],
      queryFn: () =>
        getAllItemRequest({
          itemType,
          status: status as StatusRequestItem,
          major: major!,
          orderBy: "ASC",
          page,
          take,
        }),
    });

    const dataLabel: { label: string; value: string }[] = Object.entries(
      LabelStatusRequestItem
    ).map((item) => {
      return {
        label: item[1],
        value: item[0],
      };
    });

    const head = useMemo(
      () => (
        <Group>
          <SelectButtonQuery
            queryName="status"
            placeholder="Status"
            // data={Object.values(StatusRequestItem)}
            dataLabel={dataLabel}
          />
          <ButtonPlus ml={"auto"} onClick={openModalCreate}>
            Ajukan Barang
          </ButtonPlus>
        </Group>
      ),
      []
    );

    const modal = useMemo(
      () => <ModalPermintaanBarang itemType={itemType} />,
      []
    );

    return (
      <PageContent>
        {head}
        <CustomTable
          totalPage={10}
          totalData={100}
          totalRecords={10}
          loading={isLoading}
          data={data?.payload.data!}
          columns={columnsPermintaanBarangStore()}
        />
        <Paginations
          activePage={page}
          loading={isLoading}
          onPageChange={setActivePage}
          onItemPerPageChange={setItemPerPage}
          totalPage={data?.payload?.meta.pageCount!}
        />
        {modal}
      </PageContent>
    );
  }
);

export default ContentPermintaanBarang;
