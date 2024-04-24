import PageLabel from "@components/ui/atoms/PageLabel";
import { CategoryItem } from "@utils/types/items.type";
import React from "react";
import { ContentDataBarang } from "../ContentDataBarang.admin";

function DataBarang_HabisPakai() {
  console.log("DataBarang_HabisPakai");
  return (
    <React.Fragment>
      <PageLabel label="Data Barang - Habis Pakai" />
      <ContentDataBarang categoryItem={CategoryItem.BARANG_HABIS_PAKAI} />
    </React.Fragment>
  );
}

export default DataBarang_HabisPakai;
