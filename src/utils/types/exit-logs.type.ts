import { CategoryItem } from "./items.type";

export enum StatusExit {
  PEMINJAMAN = "PEMINJAMAN",
  PRODUKTIF = "PRODUKTIF",
}

export type ExitLog = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  phone: string;
  major_class: string;
  item_category: CategoryItem;
  exit_class: string;
  status_exit: StatusExit;
};

export type ResponseExitLogs = {
  data: ExitLog[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};
