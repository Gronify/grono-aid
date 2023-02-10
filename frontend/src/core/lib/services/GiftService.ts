import { AxiosInstance } from "axios";

import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";

import { DtoCreateGift, DtoGiftResponse } from "../dto/gift";
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

  async create(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    gift: DtoCreateGift
  ): Promise<DtoGiftResponse> {
    dispatch(giftIsLoadingAction({ isLoading: true }));

    return this._axios
      .post<DtoCreateGift, { data: DtoGiftResponse }>("/gift", {
        ...gift,
        centerId: "",
      })
      .then((response) => {
        this.getGifts(dispatch, isLoading);

        return response.data;
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
