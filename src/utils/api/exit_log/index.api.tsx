import { ResponseExitLogs } from "@utils/types/exit-logs.type";
import axios from "../../axios";
import { OrderBy } from "@utils/types/pagination.type";
import { CategoryItem } from "@utils/types/items.type";
import { ResponseData } from "@utils/types/response.type";

type PayloadGetExitLogs = {
  category: CategoryItem;
  orderBy: OrderBy;
  page: number;
  take: number;
  major: string;
};

export const getExitLogs = async (
  payload: PayloadGetExitLogs
): Promise<ResponseData<ResponseExitLogs>> => {
  const { category, orderBy, page, take, major } = payload;
  const response = await axios.get(
    `/exit-logs/find-all?category=${category}&order=${orderBy}&page=${page}&take=${take}&major=${major}`
  );
  return response.data;
};

type ResponseGetExitLogById = {
  statusCode: 200;
  timestamp: string;
  payload: {
    findLogById: {
      created_at: string;
      updated_at: string;
      deleted_at: string;
      id: number;
      name: string;
      phone: string;
      major_class: string;
      item_category: string;
      exit_class: string;
      status_exit: string;
      redeem_code: {
        created_at: string;
        updated_at: string;
        deleted_at: string;
        id: number;
        redeem_code: string;
        generated_date: string;
        is_valid: boolean;
        destroyed_date: string;
        log_id: number;
      };
      item_details: [
        {
          id: number;
          item_id: number;
          item_name: string;
          item_code: string;
          category_item: string;
          total_exit_item: string;
        }
      ];
    };
  };
};

export const getExitLogById = async (
  id: number
): Promise<ResponseGetExitLogById> => {
  const response = await axios.get(`/exit-logs/find-log-by-id?log-id=${id}`);
  return response.data;
};
