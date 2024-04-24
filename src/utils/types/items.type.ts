export enum CategoryItem {
  BARANG_HABIS_PAKAI = "Barang Habis Pakai",
  BARANG_TIDAK_HABIS_PAKAI = "Barang Tidak Habis Pakai",
}

export enum ItemCondition {
  BAIK = "BAIK",
  RUSAK_RINGAN = "RUSAK RINGAN",
  RUSAK_BERAT = "RUSAK BERAT",
}

export enum ItemType {
  ATK = "ATK",
  NON_ATK = "NON ATK",
}
export enum ItemSource {
  BOSDA = "BOSDA",
  NON_BOSDA = "NON BOSDA",
}

export enum StatusItem {
  TERSEDIA = "TERSEDIA",
  SEDANG_DIPAKAI = "SEDANG DIPAKAI",
  SEDANG_DIPINJAM = "SEDANG DIPINJAM",
  TIDAK_TERSEDIA = "TIDAK TERSEDIA",
}

export type PayloadCreateItem = {
  name: string;
  item_code: string;
  status_item: string;
  source_fund: string;
  category_item: CategoryItem;
  total_unit: string;
  unit_price: number;
  class_id: number;
  item_type: ItemType;
};
export type PayloadUpdateItem = PayloadCreateItem & { id: number };

export type ResponseCreateItem = {
  statusCode: number;
  message: "OK";
  data: {
    item: {
      name: string;
      item_code: string;
      status_item: string;
      source_fund: string;
      unit_price: number;
      category_item: string;
      class_id: number;
      item_type: string;
      class: {
        id: number;
        class_name: string;
        major: string;
      };
      deleted_at: string;
      total_unit_price: string;
      created_at: string;
      updated_at: string;
      id: number;
      total_current_item: number;
    };
  };
};
export type ResponseUpdateItem = ResponseCreateItem;
