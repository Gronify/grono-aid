import { AxiosInstance } from "axios";

import { Dispatch } from "react";
import { AnyAction, Observable } from "@reduxjs/toolkit";
import {
  userIsLoadingAction,
  userUpdateAction,
  usersUpdateAction,
} from "../adapters";
import { UserEntityInterface } from "../entities/User";
import { DtoShortStatResponse, DtoUserResponse } from "../dto/user";
import {
  userShortStatSliceIsLoadingAction,
  userShortStatUpdateAction,
} from "../adapters/redux/slices/userShortStat";

import {
  OptionsObject,
  ProviderContext,
  SnackbarKey,
  SnackbarMessage,
} from "notistack";

export interface UserInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class UserService implements UserInterface {
  private _axios: AxiosInstance;
  private _enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey;

  constructor(axios: AxiosInstance, snackbar: ProviderContext) {
    this._axios = axios;
    this._enqueueSnackbar = snackbar.enqueueSnackbar;
  }

  async getDataByUserId(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    user: UserEntityInterface
  ) {
    dispatch(userIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoUserResponse>("/user/id", {
        params: { _id: user._id },
      })
      .then((response) => {
        dispatch(userUpdateAction(response.data));
        return true;
      })
      .catch((error: any) => {
        return error;
      })
      .finally(() => {
        dispatch(userIsLoadingAction({ isLoading: false }));
      });
  }

  async getUserShortStatByUserId(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    user: UserEntityInterface
  ) {
    dispatch(userIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoShortStatResponse>("/user/shortStat", {
        params: { _id: user._id },
      })
      .then((response) => {
        dispatch(userShortStatUpdateAction(response.data));
        return true;
      })
      .catch((error: any) => {
        return error;
      })
      .finally(() => {
        dispatch(userShortStatSliceIsLoadingAction({ isLoading: false }));
      });
  }

  async getUsers(dispatch: Dispatch<AnyAction>, isLoading: boolean) {
    dispatch(userIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoUserResponse[]>("/user/all")
      .then((response) => {
        dispatch(usersUpdateAction(response.data));
        return true;
      })
      .catch((error: any) => {
        return error;
      })
      .finally(() => {
        dispatch(userIsLoadingAction({ isLoading: false }));
      });
  }

  async edit(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    user: UserInterface
  ): Promise<Boolean> {
    dispatch(userIsLoadingAction({ isLoading: true }));

    return this._axios
      .patch<Boolean, { data: DtoUserResponse }>("/user", {
        ...user,
      })
      .then((response) => {
        this.getUsers(dispatch, isLoading);
        this._enqueueSnackbar("Користувача відредаговано!", {
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
        dispatch(userIsLoadingAction({ isLoading: false }));
      });
  }

  async delete(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    user: UserInterface
  ): Promise<Boolean> {
    dispatch(userIsLoadingAction({ isLoading: true }));

    return this._axios
      .delete<Boolean, { data: DtoUserResponse }>("/gift", {
        data: {
          ...user,
        },
      })
      .then((response) => {
        this.getUsers(dispatch, isLoading);
        this._enqueueSnackbar("Користувача видалено!", {
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
        dispatch(userIsLoadingAction({ isLoading: false }));
      });
  }
}
