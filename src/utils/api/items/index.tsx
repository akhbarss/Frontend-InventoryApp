import {
  CategoryItem,
  ItemSource,
  ItemType,
  PayloadCreateItem,
  PayloadUpdateItem,
  ResponseCreateItem,
  ResponseUpdateItem,
} from "@utils/types/items.type";
import { OrderBy } from "@utils/types/pagination.type";
import axios from "../../axios";

export type Item = {
  created_at: string;
  updated_at: string;
  deleted_at: null;
  id: number;
  name: string;
  item_code: string;
  status_item: string;
  source_fund: ItemSource;
  unit_price: number;
  total_unit_price: null;
  total_unit: string;
  category_item: string;
  class_id: number;
  total_current_item: number;
  item_type: ItemType;
};

type ResponseGetItems = {
  data: Item[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

type PayloadGetItems = {
  category: CategoryItem;
  classId: number | null;
  orderBy: OrderBy;
  page: number;
  take: number;
};

export const getItems = async (
  payload: PayloadGetItems
): Promise<ResponseGetItems> => {
  console.log("getItems")
  const { category, classId, orderBy, page, take } = payload;
  const queryClassId = classId && classId ? classId : "";
  const response = await axios.get(
    `/items/find-all?category=${category}&order=${orderBy}&page=${page}&take=${take}&classId=${queryClassId}`
  );
  return response.data;
};

export const createItem = async (
  payload: PayloadCreateItem
): Promise<ResponseCreateItem> => {
  const response = await axios.post("/items/create", payload);
  return response.data;
};
export const updateItem = async (
  payload: PayloadUpdateItem
): Promise<ResponseUpdateItem> => {
  const { id, ...data } = payload;
  const response = await axios.put(`/items/update?id=${id}`, data);
  return response.data;
};

export const deleteItem = async (itemId: number) => {
  const response = await axios.delete(`/items/delete?id=${itemId}`);
  return response.data;
};
