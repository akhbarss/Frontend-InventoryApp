import { ButtonExport, ButtonPlus } from "@components/ui/atoms";
import { SelectButtonQuery } from "@components/ui/atoms/SelectButtonQuery";
import { Group } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { ResponseError } from "@utils/ResponseError";
import { exportExcelDataBarang } from "@utils/api/items/index.api";
import { useAuth } from "@utils/hooks/useAuth";
import { useGetClassRoom } from "@utils/hooks/useGetClassRoom";
import { useModal } from "@utils/hooks/useModal";
import { showNotifications } from "@utils/showNotifications";
import { CategoryItem } from "@utils/types/items.type";
import { saveAs } from "file-saver";
import React, { useCallback, useMemo } from "react";

type HeadDataBarangProps = {
  categoryItem: CategoryItem;
};

function SelectButtonClass() {
  const classRooms = useGetClassRoom();
  return (
    <SelectButtonQuery
      data={classRooms}
      queryName="classId"
      placeholder="Ruangan"
    />
  );
}

export const HeadDataBarang = ({ categoryItem }: HeadDataBarangProps) => {
  console.log("head");
  const { user } = useAuth();
  const major = user.role?.major;
  const downloadMutation = useMutation({
    mutationFn: exportExcelDataBarang,
  });
  const { openModalCreate } = useModal();
  const onExport = useCallback(() => {
    downloadMutation.mutate(
      { major: major!, categoryItem },
      {
        onSuccess: (response) => {
          showNotifications({
            title: "Success!",
            type: "success",
          });
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().slice(0, 10);
          const fileName = `${categoryItem.replace(
            /\s+/g,
            "-"
          )}_${formattedDate}.xlsx`;
          saveAs(response, fileName);
        },
        onError: (error: any) => ResponseError(error),
      }
    );
  }, []);

  const memoizedComponent = useMemo(() => {
    return (
      <Group justify="space-between" component={"section"}>
        <Group>
          <SelectButtonClass />
          <ButtonExport onCancel={() => {}} onConfirm={onExport} />
        </Group>
        <ButtonPlus onClick={openModalCreate}>Tambah Barang</ButtonPlus>
      </Group>
    );
  }, [openModalCreate]);

  return memoizedComponent;
};

export const MemoizedComponent = React.memo(HeadDataBarang);
