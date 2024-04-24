import { ResponseData } from "@utils/types/response.type";
import axios from "../../axios";
import { ROLE } from "@utils/types/user,type";

type PayloadLogin = {
  username: string;
  password: string;
};

type ResponseSession = {
  getSession: {
    id: number;
    name: string;
    username: string;
    role_id: number;
    role: {
      id: number;
      name: string;
      major: ROLE;
    };
  };
};

export const login = async (payload: PayloadLogin): Promise<any> => {
  const response = await axios.post("/auth/login", payload);
  return response.data;
};

export const logout = async (): Promise<any> => {
  const response = await axios.post("/auth/logout");
  return response.data;
};

export const getSession = async (): Promise<ResponseData<ResponseSession>> => {
  const response = await axios.get("/auth/get-session");
  return response.data;
};
