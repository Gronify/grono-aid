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
import { regionIsLoadingAction, regionsUpdateAction } from "../adapters";
import { RoleEntityInterface } from "../entities/Role";
import { DtoRegionResponse } from "../dto/address";
export interface AddressInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class AddressService implements AddressInterface {
  private _axios: AxiosInstance;

  //   constructor(tokenResponse?: DtoTokenResponse) {
  //     this._tokenResponse = tokenResponse;
  //     this._localStorageToken = new LocalStorageToken();
  //   }
  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  async getRegions(dispatch: Dispatch<AnyAction>, isLoading: boolean) {
    dispatch(regionIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoRegionResponse[]>("/address/region")
      .then((response) => {
        dispatch(regionsUpdateAction(response.data));
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(regionIsLoadingAction({ isLoading: false }));
      });
  }
}
