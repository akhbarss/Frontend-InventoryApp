import {
  CategoryItem,
  ItemCondition,
  ItemSource,
  ItemType,
  PayloadCreateItem,
  PayloadUpdateItem,
  ResponseCreateItem,
  ResponseUpdateItem,
  StatusItem,
} from "@utils/types/items.type";
import { OrderBy } from "@utils/types/pagination.type";
import axios from "../../axios";
import { BasicInfoItem } from "@store/features/basic-info-items.slice";
import { ResponseData } from "@utils/types/response.type";
import { ROLE } from "@utils/types/user,type";

export type Item = {
  created_at: string;
  updated_at: string;
  deleted_at: null;
  id: number;
  name: string;
  item_code: string;
  status_item: StatusItem;
  source_fund: ItemSource;
  unit_price: number;
  total_unit_price: null;
  total_unit: string;
  category_item: string;
  class_id: number;
  total_current_item: number;
  item_type: ItemType;
  item_condition: ItemCondition;
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
  major: string;
};

export const getItems = async (
  payload: PayloadGetItems
): Promise<ResponseData<ResponseGetItems>> => {
  const { category, classId, orderBy, page, take, major } = payload;
  const queryClassId = classId && classId ? classId : "";
  const categoryItem = category ? category : "";
  const selectedMajor = major ? major : "";
  const response = await axios.get(
    `/items/find-all?category=${categoryItem}&order=${orderBy}&page=${page}&take=${take}&classId=${queryClassId}&major=${selectedMajor}`
  );
  return response.data;
};

export type ResponseGetBasicInfoItems = {
  findManyItemsWithNoPagination: BasicInfoItem[];
};

export const getBasicInfoItems = async (
  categoryItem: CategoryItem,
  major: string
): Promise<ResponseData<ResponseGetBasicInfoItems>> => {
  const response = await axios.get(
    `/items/get-all-items?item-category=${categoryItem}&major=${major}`
  );
  return response.data;
};

export const createItem = async (
  payload: PayloadCreateItem
): Promise<ResponseData<ResponseCreateItem>> => {
  const response = await axios.post("/items/create", payload);
  return response.data;
};
export const updateItem = async (
  payload: PayloadUpdateItem
): Promise<ResponseData<ResponseUpdateItem>> => {
  const { id, ...data } = payload;
  const response = await axios.put(`/items/update?id=${id}`, data);
  return response.data;
};

export const deleteItem = async (itemId: number) => {
  const response = await axios.delete(`/items/delete?id=${itemId}`);
  return response.data;
};

export const exportExcelDataBarang = async (payload: {
  major: string;
  categoryItem: CategoryItem;
}) => {
  const { categoryItem, major } = payload;
  const selectedMajor = major ? major : "";
  const response = await axios.get(
    `/items/export-data-item?item_category=${categoryItem}&major=${selectedMajor}`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};

type ResponseItemCount = {
  statusCode: 200;
  timestamp: string;
  payload: {
    countItemByStatus: {
      goodItemCount: number;
      lightlyDamagedItemCount: number;
      severelyDamagedItemCount: number;
      outItemCount: number;
      totalItemCount: number;
      pendingRequestItemCount: number;
    };
  };
};

export const itemCount = async (major: string): Promise<ResponseItemCount> => {
  const selectedMajor = major ? major : "";
  const response = await axios.get(`/items/count-items?major=${selectedMajor}`);
  return response.data;
};

type ResponseGetMajorItemCount = {
  statusCode: 200;
  timestamp: string;
  payload: {
    countItemByMajor: {
      TE: number;
      TO: number;
      TJKT: number;
      AK: number;
    };
  };
};

export const getItemMajorCount = async (): Promise<ResponseGetMajorItemCount> =>
  (await axios.get("/items/count-items-by-major")).data;
