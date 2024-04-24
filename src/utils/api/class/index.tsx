import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export type Class = {
  id: number;
  class_name: string;
  major: string;
};

type ResponseGetClasses = {
  statusCode: number;
  message: string;
  payload: {
    findManyClass: Class[];
  };
};

export const getClasses = createAsyncThunk(
  "class/getClasses",
  async (): Promise<ResponseGetClasses> => {
    return axios.get("/class/find-all").then((res) => {
      return res.data;
    });
  }
);

export const getAllClasses = async (): Promise<ResponseGetClasses> => {
  const response = await axios.get("/class/find-all");
  return response.data;
};
