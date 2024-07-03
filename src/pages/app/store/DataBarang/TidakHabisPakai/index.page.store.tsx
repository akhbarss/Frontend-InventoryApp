import PageLabel from "@components/ui/atoms/PageLabel";
import { CategoryItem } from "@utils/types/items.type";
import React from "react";
import { ContentDataBarang } from "../ContentDataBarang.store";

function DataBarang_TidakHabisPakai() {
  return (
    <React.Fragment>
      <PageLabel label="Data Barang - Tidak Habis Pakai" />
      <ContentDataBarang categoryItem={CategoryItem.BARANG_TIDAK_HABIS_PAKAI} />
    </React.Fragment>
  );
}

export default DataBarang_TidakHabisPakai;
