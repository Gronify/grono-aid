import axios, { AxiosInstance } from "axios";
import { useDispatch } from "react-redux";

import {
  // LocalStorageToken,
  // userSingOutAction,
  PossibleErrorCodes,
  ERROR,
} from "../core/lib/adapters";

export const useAxios = (): AxiosInstance => {
  const dispatch = useDispatch();
  // const token = new LocalStorageToken().getAccessToken();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  });

  const handleSuccess = (response: any) => {
    return response;
  };

  const handleError = (error: any): Error => {
    const errorCode: PossibleErrorCodes =
      error?.response?.data?.message || ERROR.UNDEFINED;
    const existingError = ERROR[errorCode] ? errorCode : ERROR.UNDEFINED;

    if (existingError === ERROR.UNAUTHORIZED) {
      // dispatch(userSingOutAction());
    }

    throw new Error(existingError);
  };

  axiosInstance.interceptors.response.use(handleSuccess, handleError);

  return axiosInstance;
};
