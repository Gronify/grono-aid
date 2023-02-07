import { AxiosInstance } from "axios";

import { Dispatch } from "react";
import { AnyAction, Observable } from "@reduxjs/toolkit";
import { humanIsLoadingAction, humanSearchIsLoadingAction } from "../adapters";

import {
  humansSearchUpdateAction,
  humanSearchUpdateAction,
} from "../adapters/redux/slices/humanSearch";
import { DtoCreateHuman, DtoHumanSearchResponse } from "../dto/human";
import { HumanEntityInterface } from "../entities/Human";

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
    humanSearch: HumanEntityInterface
  ) {
    dispatch(humanSearchIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoHumanSearchResponse[]>("/human/search", {
        params: { ...humanSearch },
      })
      .then((response) => {
        dispatch(humansSearchUpdateAction(response.data));
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(humanSearchIsLoadingAction({ isLoading: false }));
      });
  }

  async createHuman(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    human: DtoCreateHuman
  ): Promise<DtoHumanSearchResponse> {
    dispatch(humanIsLoadingAction({ isLoading: true }));

    return this._axios
      .post<DtoCreateHuman, { data: DtoHumanSearchResponse }>("/human", human)
      .then((response) => {
        return response.data;
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
    dispatch(humanSearchIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoHumanSearchResponse>("/human", {
        params: { _id },
      })
      .then((response) => {
        dispatch(humanSearchUpdateAction(response.data));
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(humanSearchIsLoadingAction({ isLoading: false }));
      });
  }
}
