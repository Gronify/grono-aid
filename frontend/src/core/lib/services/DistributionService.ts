import { AxiosInstance } from "axios";

import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";

import { DtoGiftResponse } from "../dto/gift";
import {
  distributionIsLoadingAction,
  distributionsUpdateAction,
  giftIsLoadingAction,
  giftsUpdateAction,
} from "../adapters";
import {
  DtoCreateDistribution,
  DtoDistributionResponse,
} from "../dto/distribution";

export interface DistributionInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class DistributionService implements DistributionInterface {
  private _axios: AxiosInstance;

  //   constructor(tokenResponse?: DtoTokenResponse) {
  //     this._tokenResponse = tokenResponse;
  //     this._localStorageToken = new LocalStorageToken();
  //   }
  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  async getDistributions(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    humanId: string
  ) {
    dispatch(distributionIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoDistributionResponse[]>("/distribution", {
        params: { humanId },
      })
      .then((response) => {
        dispatch(distributionsUpdateAction(response.data));
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(distributionIsLoadingAction({ isLoading: false }));
      });
  }

  async create(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    distribution: DtoCreateDistribution
  ): Promise<DtoDistributionResponse> {
    dispatch(distributionIsLoadingAction({ isLoading: true }));

    return this._axios
      .post<DtoCreateDistribution, { data: DtoDistributionResponse }>(
        "/distribution",
        distribution
      )
      .then((response) => {
        this.getDistributions(dispatch, isLoading, response.data.humanId);

        return response.data;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(distributionIsLoadingAction({ isLoading: false }));
      });
  }
}
