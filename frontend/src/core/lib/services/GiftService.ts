import { AxiosInstance } from "axios";

import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";

import { DtoGiftResponse } from "../dto/gift";
import { giftIsLoadingAction, giftsUpdateAction } from "../adapters";

export interface GiftInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class GiftService implements GiftInterface {
  private _axios: AxiosInstance;

  //   constructor(tokenResponse?: DtoTokenResponse) {
  //     this._tokenResponse = tokenResponse;
  //     this._localStorageToken = new LocalStorageToken();
  //   }
  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  async getGifts(dispatch: Dispatch<AnyAction>, isLoading: boolean) {
    dispatch(giftIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoGiftResponse[]>("/gift")
      .then((response) => {
        dispatch(giftsUpdateAction(response.data));
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(giftIsLoadingAction({ isLoading: false }));
      });
  }
}
