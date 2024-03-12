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
  data: Class[];
};

export const getClasses = createAsyncThunk(
  "class/getClasses",
  (): Promise<ResponseGetClasses> => {
    return axios.get("/class/find-all").then((res) => res.data);
  }
);
