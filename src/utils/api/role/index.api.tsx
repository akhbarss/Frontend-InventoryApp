import axios from "../../axios";

type ResponseGetRole = {
  statusCode: 200;
  timestamp: string;
  payload: {
    findAllRoles: {
      created_at: string;
      updated_at: string;
      deleted_at: string;
      id: number;
      name: string;
      major: string;
    }[];
  };
};

export const getAllRole = async (): Promise<ResponseGetRole> => {
  const response = await axios.get("/role/get");
  return response.data;
};
