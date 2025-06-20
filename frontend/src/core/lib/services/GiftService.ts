import { AxiosInstance } from "axios";

import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";

import { DtoCreateGift, DtoGiftResponse } from "../dto/gift";
import {
  giftIsLoadingAction,
  giftUpdateAction,
  giftsUpdateAction,
} from "../adapters";

import {
  OptionsObject,
  ProviderContext,
  SnackbarKey,
  SnackbarMessage,
} from "notistack";

export interface GiftInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class GiftService implements GiftInterface {
  private _axios: AxiosInstance;
  private _enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey;

  constructor(axios: AxiosInstance, snackbar: ProviderContext) {
    this._axios = axios;
    this._enqueueSnackbar = snackbar.enqueueSnackbar;
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
      })
      .then((response) => {
        dispatch(
          giftUpdateAction({
            _id: "",
            name: "",
            description: "",
            period: 0,
            measurement: "",
            centerId: "",
          })
        );
        this.getGifts(dispatch, isLoading);
        this._enqueueSnackbar("Вид допомоги створено!", {
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
        dispatch(giftIsLoadingAction({ isLoading: false }));
      });
  }

  async edit(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    gift: GiftInterface
  ): Promise<Boolean> {
    dispatch(giftIsLoadingAction({ isLoading: true }));

    return this._axios
      .patch<Boolean, { data: DtoGiftResponse }>("/gift", {
        ...gift,
      })
      .then((response) => {
        dispatch(
          giftUpdateAction({
            _id: "",
            name: "",
            description: "",
            period: 0,
            measurement: "",
            centerId: "",
          })
        );
        this.getGifts(dispatch, isLoading);
        this._enqueueSnackbar("Вид допомоги відредаговано!", {
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
        dispatch(giftIsLoadingAction({ isLoading: false }));
      });
  }

  async delete(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    gift: GiftInterface
  ): Promise<Boolean> {
    dispatch(giftIsLoadingAction({ isLoading: true }));

    return this._axios
      .delete<Boolean, { data: DtoGiftResponse }>("/gift", {
        data: {
          ...gift,
        },
      })
      .then((response) => {
        dispatch(
          giftUpdateAction({
            _id: "",
            name: "",
            description: "",
            period: 0,
            measurement: "",
            centerId: "",
          })
        );
        this.getGifts(dispatch, isLoading);
        this._enqueueSnackbar("Вид допомоги видалено!", {
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
        dispatch(giftIsLoadingAction({ isLoading: false }));
      });
  }
}
