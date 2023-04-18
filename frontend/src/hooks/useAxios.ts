import axios, { AxiosInstance } from "axios";
import { useDispatch } from "react-redux";

import {
  LocalStorageToken,
  userSingOutAction,
  PossibleErrorCodes,
  ERROR,
} from "../core/lib/adapters";

const API_URL = "http://localhost:5000/";

export const useAxios = (): AxiosInstance => {
  const dispatch = useDispatch();
  const localStorageToken = new LocalStorageToken();
  const token = localStorageToken.getAccessToken();

  const axiosInstance = axios.create({
    // withCredentials: true,
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleSuccess = (response: any) => {
    return response;
  };

  const handleError = (error: any): Error | Promise<AxiosInstance> => {
    const errorCode: PossibleErrorCodes =
      error?.response?.data?.message || ERROR.UNDEFINED;
    const existingError = ERROR[errorCode] ? errorCode : ERROR.UNDEFINED;

    const originalRequest = error.config;

    if (
      existingError === ERROR.UNAUTHORIZED &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        axios
          .get(`${API_URL}user/refresh`, {
            // withCredentials: true,
          })
          .then((response) => {
            localStorageToken.setAccessToken(response.data.accessToken);
            return axiosInstance.request(originalRequest);
          })
          .catch((e) => {
            dispatch(userSingOutAction());
            localStorage.removeItem("token");
            console.log(e);
            console.log("Unauthorized");
          });
      } catch (e) {
        dispatch(userSingOutAction());
        localStorage.removeItem("token");
        console.log("Unauthorized");
      }
    }

    throw new Error(existingError);
  };

  axiosInstance.interceptors.response.use(handleSuccess, handleError);

  return axiosInstance;
};
