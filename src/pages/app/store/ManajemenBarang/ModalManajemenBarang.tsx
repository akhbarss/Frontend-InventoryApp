import { BaseModal } from "@components/ui/atoms";
import { FormTambahBarangKeluarHabisPakai } from "@components/ui/atoms/Form/FormTambahBarangKeluarHabisPakai/FormTambahBarangKeluarHabisPakai";
import { FormTambahBarangKeluarTidakHabisPakai } from "@components/ui/atoms/Form/FormTambahBarangKeluarTidakHabisPakai/FormTambahBarangKeluarTidakHabisPakai";
import ResultTable from "@components/ui/atoms/Table/ResultTable";
import { useModalStore } from "@store/useModalStore";
import { useQuery } from "@tanstack/react-query";
import { useActionManajemenBarang } from "@utils/actions/manajemen-barang.action";
import { getExitLogById } from "@utils/api/exit_log/index.api";
import { useManajemenBarangFormContext } from "@utils/context/manajermen-barang.context";
import { CategoryItem } from "@utils/types/items.type";
import React from "react";

type ModalManajemenBarangProps = {
  categoryItem: CategoryItem;
};

type DetailManajemenBarangProps = {
  categoryItem: CategoryItem;
};

function DetailManajemenBarang({ categoryItem }: DetailManajemenBarangProps) {
  const form = useManajemenBarangFormContext();
  console.log(form.values)
  const { name, exit_class, major_class, phone, status_exit, id } = form.values;
  const { data, isLoading } = useQuery({
    queryKey: ["get_exit_log_by_id"],
    queryFn: () => getExitLogById(id!),
  });
  console.log(name)

  const itemDetail = data?.payload.findLogById.item_details.map((item) => {
    const itemCode =
      item.item_code !== null ? <>&ndash; {item.item_code}</> : "";
    return (
      <>
        {item.item_name} {itemCode}{" "}
        {item.total_exit_item && categoryItem == CategoryItem.BARANG_HABIS_PAKAI
          ? ` (${item.total_exit_item})`
          : ""}
      </>
    );
  });
  console.log({ itemDetail });

  const formatItemDetail =
    itemDetail && itemDetail?.length > 0
      ? itemDetail?.map((item, i) => (
          <React.Fragment key={i}>
            {item} <br />
          </React.Fragment>
        ))
      : "-";

  const redeemCode = data?.payload.findLogById?.redeem_code?.redeem_code;

  const dataTable = [
    categoryItem == CategoryItem.BARANG_TIDAK_HABIS_PAKAI
      ? {
          label: "Reedem Code",
          value: redeemCode ? redeemCode : "-",
        }
      : undefined,
    {
      label: "Barang",
      value: formatItemDetail,
    },
    {
      label: "Nama",
      value: name,
    },
    {
      label: "Kelas",
      value: exit_class,
    },
    {
      label: "Ruangan",
      value: major_class,
    },
    {
      label: "No Telepon",
      value: phone,
    },
    {
      label: "Status",
      value: status_exit,
    },
  ];

  const filteredDataTable = dataTable.filter(Boolean) as {
    label: string;
    value: any;
  }[];
  return <ResultTable isLoading={isLoading} data={filteredDataTable} />;
}

// function DetailMana

export const ModalManajemenBarang = React.memo(
  ({ categoryItem }: ModalManajemenBarangProps) => {
    console.log("modal");
    const form = useManajemenBarangFormContext();
    const { generateCode } = useActionManajemenBarang();
    const {
      openedModalCreate,
      openedModalEdit,
      setOpenedModalCreate,
      setOpenedModalEdit,
    } = useModalStore();

    return (
      <>
        <BaseModal
          size={"lg"}
          resetForm={form}
          opened={openedModalCreate}
          title="Tambah Barang Keluar"
          onClose={() => setOpenedModalCreate(false)}
          onSubmit={form.onSubmit(() => generateCode(categoryItem))}
        >
          {categoryItem == CategoryItem.BARANG_HABIS_PAKAI ? (
            <FormTambahBarangKeluarHabisPakai
              categoryItem={CategoryItem.BARANG_HABIS_PAKAI}
            />
          ) : (
            <FormTambahBarangKeluarTidakHabisPakai
              categoryItem={CategoryItem.BARANG_TIDAK_HABIS_PAKAI}
            />
          )}
        </BaseModal>

        <BaseModal
          onClose={() => {
            setOpenedModalEdit(false);
          }}
          onSubmit={(e) => {
            e.preventDefault();
            setOpenedModalEdit(false);
          }}
          opened={openedModalEdit}
          resetForm={form}
          size={"lg"}
          title={`Barang Keluar ${
            categoryItem == CategoryItem.BARANG_TIDAK_HABIS_PAKAI ? "Tidak" : ""
          } Habis Pakai`}
        >
          <DetailManajemenBarang categoryItem={categoryItem} />
        </BaseModal>
      </>
    );
  }
);
