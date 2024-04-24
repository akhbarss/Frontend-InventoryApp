import {
  PayloadGenerateCode,
  ResponseGenerateCode,
  ResponseGetAllReedemCode,
} from "@utils/types/redeem-code.type";
import axios from "../../axios";
import { OrderBy } from "@utils/types/pagination.type";
import { BASE_URL } from "../../../config/index";
import { STATUS_REDEEM_CODE } from "@pages/app/admin/ManajemenKode";

const baseUrlWithReedemCode = `${BASE_URL}/redeem-code`;

export const generateCode = async (
  payload: PayloadGenerateCode
): Promise<ResponseGenerateCode> => {
  const response = await axios.post(
    `${baseUrlWithReedemCode}/generate-code`,
    payload
  );
  return response.data;
};
type PayloadGetAllReedemCode = {
  orderBy: OrderBy;
  page: number;
  take: number;
  status_code: STATUS_REDEEM_CODE;
  major: string;
};

export const getAllReedemCode = async (
  payload: PayloadGetAllReedemCode
): Promise<ResponseGetAllReedemCode> => {
  const { orderBy, page, take, status_code, major } = payload;
  const statusCode = status_code ? status_code : "";
  const response = await axios.get(
    `${baseUrlWithReedemCode}/find-all-codes?status-code=${statusCode}&order=${orderBy}&page=${page}&take=${take}&major=${major}`
  );
  return response.data;
};

export const storeReedemCode = async (reedemCode: string) => {
  console.log({ reedemCode });
  const response = await axios.post(
    `${baseUrlWithReedemCode}/store-redeem-code?redeem-code=${reedemCode}`
  );
  return response.data;
};

type ResponseFindReedemCodeByCode = {
  statusCode: number;
  timestamp: string;
  payload: {
    findByRedeemCode: {
      created_at: string;
      updated_at: string;
      deleted_at: null;
      id: number;
      redeem_code: string;
      generated_date: string;
      is_valid: true;
      destroyed_date: null;
      log_id: number;
      exitLog: {
        created_at: string;
        updated_at: string;
        deleted_at: null;
        id: number;
        name: string;
        phone: string;
        major_class: string;
        item_category: string;
        exit_class: string;
        status_exit: string;
        item_details: {
          id: number;
          item_id: number;
          item_name: string;
          item_code: string;
          category_item: string;
          total_exit_item: string;
        }[];
      };
    };
  };
};

export const findReedemCodeByCode = async (
  reedemCode: string
): Promise<ResponseFindReedemCodeByCode> => {
  console.log({ reedemCode });
  const response = await axios.get(
    `${baseUrlWithReedemCode}/find-by-code?redeem-code=${reedemCode}`
  );
  return response.data;
};

export type PayloadUpdateRedeemCode = PayloadGenerateCode & {
  redeemCode: string;
};

export const updateRedeemCode = async (payload: PayloadUpdateRedeemCode) => {
  const { redeemCode, ...data } = payload;
  const response = await axios.patch(
    `${baseUrlWithReedemCode}/update-redeem-code?redeem-code=${redeemCode}`,
    data
  );
  return response.data;
};
