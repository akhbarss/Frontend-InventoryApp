import { OrderBy } from "@utils/types/pagination.type";
import axios from "../../axios";
import { ItemType } from "@utils/types/items.type";

export type DataRequestItem = {
  created_at: string;
  updated_at: string;
  deleted_at: null;
  id: number;
  item_name: string;
  total_request: number;
  status: string;
  item_type: string;
  description: string;
  from_major: string;
  is_arrive: null;
  request_date: string;
  arrive_date: string;
  accepted_date: string;
  on_the_way_date: string
  class_id: number;
};

type ResponseGetAllItemRequest = {
  statusCode: number;
  timestamp: string;
  payload: {
    data: DataRequestItem[];
    meta: {
      page: number;
      take: number;
      itemCount: number;
      pageCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  };
};

export type MAJOR = "TJKT" | "TE" | "TO" | "AK";

export enum StatusRequestItem {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  ON_THE_WAY = "ON_THE_WAY",
  ARRIVED = "ARRIVED",
}
export enum LabelStatusRequestItem {
  PENDING = "BELUM DIPROSES",
  ACCEPTED = "DI TERIMA",
  REJECTED = "DI TOLAK",
  ON_THE_WAY = "DALAM PERJALANAN",
  ARRIVED = "TELAH SAMPAI",
}

type PayloadGetAllItemRequest = {
  major?: MAJOR;
  itemType?: ItemType;
  status: StatusRequestItem;
  orderBy: OrderBy;
  page: number;
  take: number;
};
export const getAllItemRequest = async (
  payload: PayloadGetAllItemRequest
): Promise<ResponseGetAllItemRequest> => {
  const { major, orderBy, page, take, itemType, status } = payload;

  const response = await axios.get(
    `/request-items/find-all?major=${major ? major : ""}&status=${
      status ? status : ""
    }&item_type=${
      itemType ? itemType : ""
    }&order=${orderBy}&page=${page}&take=${take}`
  );
  return response.data;
};

export type PayloadCreateItemRequest = {
  item_name: string;
  total_request: number;
  item_type: string;
  description: string;
  class_id: number;
};

export const createItemRequest = async (payload: PayloadCreateItemRequest) => {
  const response = await axios.post("/request-items/create", payload);
  return response.data;
};

export type PayloadUpdateItemRequest = PayloadCreateItemRequest & {
  id: number;
};
export const updateItemRequest = async (payload: PayloadUpdateItemRequest) => {
  const { id, ...data } = payload;
  const response = await axios.patch(`/request-items/update?id=${id}`, data);
  return response.data;
};
export const deleteItemRequest = async (id: number) => {
  const response = await axios.delete(`/request-items/delete?id=${id}`);
  return response.data;
};

export const acceptItemRequest = async (requestId: number) => {
  const response = await axios.patch(
    `/request-items/update-status/to-accept?id=${requestId}`
  );
  return response.data;
};
export const rejectItemRequest = async (requestId: number) => {
  const response = await axios.patch(
    `/request-items/update-status/to-reject?id=${requestId}`
  );
  return response.data;
};
export const arriveItemRequest = async (requestId: number) => {
  const response = await axios.patch(
    `/request-items/update-status/to-arrive?id=${requestId}`
  );
  return response.data;
};
export const toOnTheWayItemRequest = async (requestId: number) => {
  const response = await axios.patch(
    `/request-items/update-status/to-on-the-way?id=${requestId}`
  );
  return response.data;
};
