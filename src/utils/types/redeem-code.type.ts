import { ExitLog, StatusExit } from "./exit-logs.type";
import { CategoryItem } from "./items.type";

type PayloadItemDetail = {
  item_id: number | null;
  category_item?: CategoryItem;
  total_exit_item: number | string;
};

export type PayloadGenerateCode = {
  name: string;
  phone: string;
  major_class: string;
  item_category: CategoryItem;
  exit_class: string;
  status_exit: StatusExit;
  total: number;
  item_details: PayloadItemDetail[];
};

export type ResponseGenerateCode = {
  statusCode: 201;
  timestamp: string;
  payload: {
    createRedeemCode: {
      redeem_code: null | string;
      generated_date: null | string;
      is_valid: null | boolean;
      destroyed_date: null | string;
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
          item_id: string;
          category_item: string;
          total_exit_item: string;
          item_name: string;
          item_code: string;
        }[];
      };
      created_at: string;
      updated_at: string;
      deleted_at: null;
      id: number;
    };
  };
};

export type ReedemCode = {
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date;
  id: number;
  redeem_code: string;
  generated_date: string | Date;
  is_valid: boolean;
  destroyed_date: string | Date;
  log_id: number;
};

export type ItemDetails = {
  id: number;
  item_id: number;
  item_name: string;
  item_code: string;
  category_item: string;
  total_exit_item: string;
};

export type ExitLogRelation = ExitLog & { item_details: ItemDetails[] };

export type RelationReedemCode = ReedemCode & { exitLog: ExitLogRelation };

export type ResponseGetAllReedemCode = {
  statusCode: number;
  timestamp: string;
  payload: {
    data: RelationReedemCode[];
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
