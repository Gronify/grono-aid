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
import { DtoCenterResponse, DtoCreateCenter } from "../dto/center";
import {
  OptionsObject,
  ProviderContext,
  SnackbarKey,
  SnackbarMessage,
} from "notistack";
export interface CenterInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class CenterService implements CenterInterface {
  private _axios: AxiosInstance;
  private _enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey;

  //   constructor(tokenResponse?: DtoTokenResponse) {
  //     this._tokenResponse = tokenResponse;
  //     this._localStorageToken = new LocalStorageToken();
  //   }
  constructor(axios: AxiosInstance, snackbar: ProviderContext) {
    this._axios = axios;
    this._enqueueSnackbar = snackbar.enqueueSnackbar;
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
      })
      .finally(() => {
        dispatch(centerIsLoadingAction({ isLoading: false }));
      });
  }

  async create(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    center: DtoCreateCenter
  ): Promise<DtoCenterResponse> {
    dispatch(centerIsLoadingAction({ isLoading: true }));

    return this._axios
      .post<DtoCreateCenter, { data: DtoCenterResponse }>("/center", {
        name: center.name,
        address: center.address,
        phone: center.phone,
        director: center.director,
        phoneDirector: center.phoneDirector,
      })
      .then((response) => {
        this.getCenters(dispatch, isLoading);
        this._enqueueSnackbar("Центр створенно!", {
          variant: "success",
        });
        return response.data;
      })
      .catch((error: any) => {
        this._enqueueSnackbar("Помилка!", {
          variant: "error",
        });
        return error;
      })
      .finally(() => {
        dispatch(centerIsLoadingAction({ isLoading: false }));
      });
  }
}
