import axiosClient from "@/common/utils/axios";
import {  GET_DATA_CV} from "@/common/constants/api.constants";
import { DataTypeGetDataCv } from "./interfaces";


export const getDataCv = (data: DataTypeGetDataCv) => {
  return axiosClient.post(GET_DATA_CV, data);
};


