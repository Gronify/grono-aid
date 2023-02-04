import { AxiosInstance } from "axios";

import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import {
  centerIsLoadingAction,
  centersUpdateAction,
  humanIsLoadingAction,
} from "../adapters";

import {
  humansUpdateAction,
  humanUpdateAction,
} from "../adapters/redux/slices/human";
import { DtoHumanSearchResponse } from "../dto/human";
import { HumanSearchEntityInterface } from "../entities/Human";

export interface HumanInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class HumanService implements HumanInterface {
  private _axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  async findHumans(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    humanSearch: HumanSearchEntityInterface
  ) {
    dispatch(humanIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoHumanSearchResponse[]>("/human/search", {
        params: { ...humanSearch },
      })
      .then((response) => {
        dispatch(humansUpdateAction(response.data));
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(humanIsLoadingAction({ isLoading: false }));
      });
  }

  async findHumanById(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    _id: string | undefined
  ) {
    dispatch(humanIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoHumanSearchResponse>("/human", {
        params: { _id },
      })
      .then((response) => {
        dispatch(humanUpdateAction(response.data));
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(humanIsLoadingAction({ isLoading: false }));
      });
  }
}
