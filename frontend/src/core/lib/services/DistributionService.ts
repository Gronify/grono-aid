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
  DtoCreateDistributionResponse,
  DtoDistributionResponse,
} from "../dto/distribution";
import {
  OptionsObject,
  ProviderContext,
  SnackbarKey,
  SnackbarMessage,
} from "notistack";
import {
  DistributionEntityInterface,
  DistributionManagerEntityInterface,
} from "../entities/Distribution";

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
      .post<
        DtoCreateDistributionResponse,
        { data: DtoCreateDistributionResponse }
      >("/distribution", distribution)
      .then((response) => {
        this.getDistributions(dispatch, isLoading, response.data.humanId);
        this._enqueueSnackbar("Успішно!", {
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
        dispatch(distributionIsLoadingAction({ isLoading: false }));
      });
  }

  async getDistributionsByCenter(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    centerId: string
  ) {
    dispatch(distributionIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoDistributionResponse[]>("/distribution/center", {
        params: { centerId },
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

  async delete(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    distribution: DistributionEntityInterface,
    centerId: string
  ): Promise<Boolean> {
    dispatch(distributionIsLoadingAction({ isLoading: true }));

    return this._axios
      .delete<Boolean, { data: DtoGiftResponse }>("/distribution", {
        data: {
          ...distribution,
        },
      })
      .then((response) => {
        this.getDistributionsByCenter(dispatch, isLoading, centerId);
        this._enqueueSnackbar("Видачу видаленно!", {
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
