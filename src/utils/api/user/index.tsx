import { ResponseData } from "@utils/types/response.type";
import axios from "../../axios";

type ResponseGetUsers = {
  data: {
    id: number;
    name: string;
    username: string;
    role_id: number;
  }[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

type PayloadGetUsers = {
  page: number;
  take: number;
};

export const getUsers = async (
  payload: PayloadGetUsers
): Promise<ResponseData<ResponseGetUsers>> => {
  const { page, take } = payload;
  const response = await axios.get(
    `/user/find-all?order=ASC&page=${page}&take=${take}`
  );
  return response.data;
};

export type PayloadCreateUser = {
  name: string;
  username: string;
  password: string;
  role_id: number;
};

export const createUser = async (payload: PayloadCreateUser): Promise<any> => {
  const response = await axios.post("/user/create", payload);
  return response.data;
};

export type PayloadUpdateUser = {
  userId: number;
  password?: string;
} & PayloadCreateUser;

export const updateUser = async (payload: PayloadUpdateUser): Promise<any> => {
  const { userId, password, ...data } = payload;

  const newData = password.trim().length > 0 ? { ...data, password } : data;

  const response = await axios.put(`/user/update?id=${userId}`, newData);
  return response.data;
};

export const deleteUser = async (userId: number): Promise<any> => {
  const response = await axios.delete(`/user/delete-hard?id=${userId}`);
  return response.data;
};

export const updatePassword = async (payload: {
  userId: number;
  password: string;
}): Promise<any> => {
  const { password, userId } = payload;
  const response = await axios.patch(`/user/update-user?user-id=${userId}`, {
    password,
  });
  return response.data;
};
