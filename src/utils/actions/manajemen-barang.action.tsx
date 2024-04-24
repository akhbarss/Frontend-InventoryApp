import ResultTable from "@components/ui/atoms/Table/ResultTable";
import { modals } from "@mantine/modals";
import { useModalStore } from "@store/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResponseError } from "@utils/ResponseError";
import { generateCode as generateCodeApi } from "@utils/api/reedem_code/index.api";
import { useManajemenBarangFormContext } from "@utils/context/manajermen-barang.context";
import { formatFullDate } from "@utils/format-date";
import { useGetClassRoom } from "@utils/hooks/useGetClassRoom";
import { showNotifications } from "@utils/showNotifications";
import { CategoryItem } from "@utils/types/items.type";
import { PayloadGenerateCode } from "@utils/types/redeem-code.type";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

type ShowModalProps = {
  dataBarang: {
    itemDetail: number[] | string[];
    tipeBarang: string;
    jumlahKeluar: string | number;
    ruangan: string;
    namaPeminjam: string;
    nomorPeminjam: string;
  };
  kodeReedem: {
    kode: string;
    waktuDibuat: string;
  };
};

function showModal({ dataBarang, kodeReedem }: ShowModalProps) {
  const {
    itemDetail,
    jumlahKeluar,
    namaPeminjam,
    nomorPeminjam,
    ruangan,
    tipeBarang,
  } = dataBarang;
  const table = [
    {
      label: "Tipe Barang",
      value: tipeBarang,
    },
    {
      label: "Nama Barang",
      value: (
        <>
          {itemDetail.map((item, i) => (
            <React.Fragment key={i}>
              {item} <br />
            </React.Fragment>
          ))}
        </>
      ),
    },
    {
      label: "Jumlah Keluar",
      value: jumlahKeluar,
    },
    {
      label: "Ruangan",
      value: ruangan,
    },
    {
      label: "Nama Peminjam",
      value: namaPeminjam,
    },
    {
      label: "Nomor Peminjam",
      value: nomorPeminjam,
    },
  ];
  const tableCodeReedem = [
    {
      label: "Kode Reedem",
      value: kodeReedem.kode,
    },
    {
      label: "Waktu Dibuat",
      value: formatFullDate(kodeReedem.waktuDibuat),
    },
  ];

  modals.openConfirmModal({
    title: "Barang Keluar",
    closeOnConfirm: false,
    closeOnClickOutside: false,
    closeOnEscape: false,
    withCloseButton: false,
    labels: { confirm: "Konfirmasi", cancel: "" },
    cancelProps: { display: "none" },
    children: <ResultTable data={table} />,
    onConfirm: () =>
      modals.openConfirmModal({
        title: "Barang Keluar",
        labels: { confirm: "Konfirmasi", cancel: "Kembali" },
        cancelProps: {
          variant: "default",
          leftSection: <IoIosArrowRoundBack size={30} />,
          style: { border: "none" },
        },
        closeOnConfirm: false,
        children: <ResultTable data={tableCodeReedem} />,
        onConfirm: modals.closeAll,
      }),
  });
}
export const useActionManajemenBarang = () => {
  const classRoom = useGetClassRoom();
  const queryClient = useQueryClient();
  const form = useManajemenBarangFormContext();
  const { setOpenedModalCreate } = useModalStore();
  const generateRedeemCodeMutation = useMutation({
    mutationFn: generateCodeApi,
  });

  const generateCodeHandler = (categoryItem: CategoryItem) => {
    const { exit_class, item_details, major_class, name, phone, status_exit } =
      form.values;

    const findNameClass = classRoom.find(
      (classes) => classes.value == major_class
    )?.label;
    console.log({ item_details });
    const payload: PayloadGenerateCode = {
      name,
      phone,
      major_class: findNameClass!,
      exit_class,
      item_category: categoryItem,
      item_details: item_details.map(({ item_id, jumlah }) => ({
        item_id,
        total_exit_item:
          categoryItem == CategoryItem.BARANG_HABIS_PAKAI ? jumlah! : +jumlah!,
      }))!,
      status_exit,
      total: item_details.length,
    };
    console.log({ payload });
    generateRedeemCodeMutation.mutate(payload, {
      onSuccess: ({ payload: { createRedeemCode } }) => {
        const { exitLog, generated_date, redeem_code } = createRedeemCode;

        form.reset();
        if (categoryItem == CategoryItem.BARANG_HABIS_PAKAI) {
          showNotifications({
            title: "success",
            type: "success",
          });
          setOpenedModalCreate(false);
          queryClient.invalidateQueries({ queryKey: ["get_exit_logs"] });
        } else {
          setOpenedModalCreate(false);
          queryClient.invalidateQueries({ queryKey: ["get_exit_logs"] });
          showModal({
            dataBarang: {
              itemDetail: exitLog.item_details.map((item) => {
                const itemCode =
                  item.item_code !== null ? `- ${item.item_code}` : "";
                return `${item.item_name} ${itemCode}`;
              }),
              jumlahKeluar: exitLog.item_details.length,
              namaPeminjam: exitLog.name,
              nomorPeminjam: exitLog.phone,
              ruangan: exitLog.major_class,
              tipeBarang: exitLog.item_category,
            },
            kodeReedem: {
              kode: redeem_code!,
              waktuDibuat: generated_date!,
            },
          });
        }
      },
      onError: (error: any) => ResponseError(error),
    });
  };
  return {
    generateCode: generateCodeHandler,
  };
};
