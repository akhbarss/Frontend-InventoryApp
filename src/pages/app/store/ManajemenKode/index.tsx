import { PageContent } from "@components/ui/atoms";
import PageLabel from "@components/ui/atoms/PageLabel";
import Paginations from "@components/ui/atoms/Pagination";
import { SelectButtonQuery } from "@components/ui/atoms/SelectButtonQuery";
import CustomTable from "@components/ui/atoms/Table/CustomTable";
import { Group } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { getAllReedemCode } from "@utils/api/reedem_code/index.api";
import { columnReedemCode } from "@utils/columns/reedem-code.columns";
import { ManajemenBarangFormValues } from "@utils/context/manajermen-barang.context";
import { useAuth } from "@utils/hooks/useAuth";
import usePagination from "@utils/hooks/usePagination";
import { StatusExit } from "@utils/types/exit-logs.type";
import { StringParam, useQueryParam } from "use-query-params";
import ModalManajemenKode from "./ModalManajemenKode";

export enum STATUS_REDEEM_CODE {
  VALID = "VALID",
  NOT_VALID = "NOT VALID",
}

export type FormValuesManajemenRedeemCode = ManajemenBarangFormValues & {
  redeeem_code: string;
};
const ManajemenKode = () => {
  const { user } = useAuth();
  const major = user.role?.major;
  const [statusRedeemCode] = useQueryParam("status", StringParam);
  const { page, take, setActivePage, setItemPerPage } = usePagination();

  const formManajemenKode = useForm<FormValuesManajemenRedeemCode>({
    initialValues: {
      id: null,
      item_details: [{ item_id: null, jumlah: "", key: randomId() }],
      major_class: "",
      exit_class: "",
      name: "",
      phone: "",
      status_exit: StatusExit.PEMINJAMAN,
      redeeem_code: "",
    },
    validate: {
      item_details: {
        item_id: isNotEmpty(),
      },
      major_class: isNotEmpty(),
      name: isNotEmpty(),
      phone: isNotEmpty(),
      status_exit: isNotEmpty(),
      exit_class: isNotEmpty(),
    },
  });

  const queryRedeemCode = useQuery({
    queryKey: ["get_all_reedem_code", { take, page, statusRedeemCode }],
    queryFn: () =>
      getAllReedemCode({
        page,
        take,
        orderBy: "ASC",
        status_code: statusRedeemCode as STATUS_REDEEM_CODE,
        major: major!,
      }),
    enabled: major !== null,
  });

  return (
    <>
      <PageLabel label="Manajemen Kode" />
      <PageContent>
        <Group>
          <SelectButtonQuery
            queryName="status"
            placeholder="Status"
            data={Object.values(STATUS_REDEEM_CODE)}
          />
        </Group>
        <CustomTable
          loading={queryRedeemCode.isLoading}
          data={queryRedeemCode.data?.payload?.data!}
          totalPage={queryRedeemCode.data?.payload?.meta.pageCount!}
          columns={columnReedemCode({ form: formManajemenKode })}
        />
        <Paginations
          activePage={page}
          loading={queryRedeemCode.isLoading}
          onPageChange={setActivePage}
          onItemPerPageChange={setItemPerPage}
          totalPage={queryRedeemCode.data?.payload?.meta.pageCount!}
        />
        <ModalManajemenKode data={queryRedeemCode} form={formManajemenKode} />
      </PageContent>
    </>
  );
};

export default ManajemenKode;
