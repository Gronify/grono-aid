import { Token } from "../entities";

import { DtoTokenResponse } from "../dto/token";
import { DtoUserLogin } from "../dto/user";
import { useAxios } from "../../../hooks";
import { AxiosInstance } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../frameworks/redux";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { UserEntityInterface } from "../entities/User";
import { centerIsLoadingAction, centersUpdateAction } from "../adapters";
import { DtoCenterResponse } from "../dto/center";

export interface CenterInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class CenterService implements CenterInterface {
  private _axios: AxiosInstance;

  //   constructor(tokenResponse?: DtoTokenResponse) {
  //     this._tokenResponse = tokenResponse;
  //     this._localStorageToken = new LocalStorageToken();
  //   }
  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  async getCenters(dispatch: Dispatch<AnyAction>, isLoading: boolean) {
    dispatch(centerIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoCenterResponse[]>("/center")
      .then((response) => {
        dispatch(centersUpdateAction(response.data));
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(centerIsLoadingAction({ isLoading: false }));
      });
  }
}
