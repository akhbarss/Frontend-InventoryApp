import {
  BaseModal,
  ButtonExport,
  FormDataBarang,
  PageContent,
} from "@components/ui/atoms";
import { ModalDetailImage } from "@components/ui/atoms/Modal/DetailImageModal/ModalDetailImage";
import Paginations from "@components/ui/atoms/Pagination";
import { SelectButtonQuery } from "@components/ui/atoms/SelectButtonQuery";
import CustomTable from "@components/ui/atoms/Table/CustomTable";
import { Group } from "@mantine/core";
import { useModalStore } from "@store/useModalStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ResponseError } from "@utils/ResponseError";
import { exportExcelDataBarang, getItems } from "@utils/api/items/index.api";
import { columnsDataBarangSuperAdmin } from "@utils/columns/data-barang.column";
import { useDataBarangFormContext } from "@utils/context/data-barang-form.context";
import usePagination from "@utils/hooks/usePagination";
import { showNotifications } from "@utils/showNotifications";
import { CategoryItem } from "@utils/types/items.type";
import { Major } from "@utils/types/major.enum";
import { saveAs } from "file-saver";
import { StringParam, useQueryParam } from "use-query-params";

type ContentDataBarangSuperAdminProps = {
  categoryItem: CategoryItem;
};

const ContentDataBarangSuperAdmin = ({
  categoryItem,
}: ContentDataBarangSuperAdminProps) => {
  const form = useDataBarangFormContext();
  const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/images/${
    form.values.item_image
  }`;
  const [major] = useQueryParam("major", StringParam);
  const {
    openedModalEdit,
    setOpenedModalEdit,
    openedModalDetailImage,
    setOpenedModalDetailImage,
  } = useModalStore();
  const { page, take, setActivePage, setItemPerPage } = usePagination();

  const exportMutation = useMutation({
    mutationFn: exportExcelDataBarang,
  });
  const { data, isLoading } = useQuery({
    queryKey: [
      "get_all_items_superadmin",
      { pagination: { page, take }, categoryItem, major },
    ],
    queryFn: () =>
      getItems({
        page,
        take,
        classId: null,
        major: major!,
        orderBy: "ASC",
        category: categoryItem,
      }),
  });
  return (
    <>
      <PageContent>
        <Group>
          <SelectButtonQuery
            queryName="major"
            placeholder="Jurusan"
            data={Object.values(Major)}
          />
          <ButtonExport
            onCancel={() => {}}
            onConfirm={() => {
              exportMutation.mutate(
                { categoryItem, major: "" },
                {
                  onSuccess: (response) => {
                    showNotifications({
                      title: "Success!",
                      type: "success",
                    });
                    const currentDate = new Date();
                    const formattedDate = currentDate
                      .toISOString()
                      .slice(0, 10);
                    const fileName = `${categoryItem.replace(
                      /\s+/g,
                      "-"
                    )}_${formattedDate}.xlsx`;
                    saveAs(response, fileName);
                  },
                  onError: (err: any) => ResponseError(err),
                }
              );
            }}
          />
        </Group>

        <CustomTable
          loading={isLoading}
          data={data?.payload.data!}
          columns={columnsDataBarangSuperAdmin(categoryItem)}
          totalPage={data?.payload?.meta.pageCount!}
        />

        <Paginations
          activePage={page}
          loading={isLoading}
          onPageChange={setActivePage}
          onItemPerPageChange={setItemPerPage}
          totalPage={data?.payload?.meta.pageCount!}
        />

        <BaseModal
          size={"md"}
          resetForm={form}
          title="Edit Barang"
          opened={openedModalEdit}
          onClose={() => setOpenedModalEdit(false)}
          onSubmit={form.onSubmit(() => {})}
        >
          <FormDataBarang readOnly categoryItem={categoryItem} />
        </BaseModal>

        {/* Modal Detail Image */}
        <ModalDetailImage
          opened={openedModalDetailImage}
          onClose={() => setOpenedModalDetailImage(false)}
          imageUrl={imageUrl}
        />
      </PageContent>
    </>
  );
};

export default ContentDataBarangSuperAdmin;
