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
import {
  OptionsObject,
  ProviderContext,
  SnackbarKey,
  SnackbarMessage,
} from "notistack";

export interface DistributionInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class DistributionService implements DistributionInterface {
  private _axios: AxiosInstance;
  private _enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey;

  constructor(axios: AxiosInstance, snackbar: ProviderContext) {
    this._axios = axios;
    this._enqueueSnackbar = snackbar.enqueueSnackbar;
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
        this._enqueueSnackbar("Помилка!", {
          variant: "error",
        });
        return error;
      })
      .finally(() => {
        dispatch(distributionIsLoadingAction({ isLoading: false }));
      });
  }
}
