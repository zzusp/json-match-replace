import { get, post } from "./index";
import { AxiosResponse } from "axios";

// 解析json
export const jsonParse = (data: any): Promise<AxiosResponse> =>
  post("/jsonmr/parse", data);

// 校验json
export const jsonCheck = (data: any): Promise<AxiosResponse> =>
  post("/jsonmr/check", data);