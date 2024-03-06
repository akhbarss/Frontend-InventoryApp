import axios from "../../axios";

type PayloadLogin = {
  username: string;
  password: string;
};

type ResponseSession = {
    user: {
      id: number;
      name: string;
      username: string;
      role_id: number;
      role: {
        id: number;
        name: string;
        major: string;
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

export const getSession = async (): Promise<ResponseSession> => {
  const response = await axios.get("/auth/get-session");
  return response.data.data;
};
