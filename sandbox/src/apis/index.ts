import axios, {
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
const instance: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api"
      : import.meta.env.VITE_HTTP_BASE_URL,
  timeout: 10000,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  //进行特殊请求操作
  return config;
});

instance.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
});

export function get<T>(
  url: string,
  params?: any,
  config?: any
): Promise<AxiosResponse> {
  return instance.get(url, { params, ...config });
}

export function post<T>(
  url: string,
  params?: any,
  config?: any
): Promise<AxiosResponse> {
  return instance.post(url, params, config);
}

export default instance;