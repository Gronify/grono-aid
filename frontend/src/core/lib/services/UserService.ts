import { AxiosInstance } from "axios";

import { Dispatch } from "react";
import { AnyAction, Observable } from "@reduxjs/toolkit";
import { userIsLoadingAction, userUpdateAction } from "../adapters";
import { UserEntityInterface } from "../entities/User";
import { DtoShortStatResponse, DtoUserResponse } from "../dto/user";
import {
  userShortStatSliceIsLoadingAction,
  userShortStatUpdateAction,
} from "../adapters/redux/slices/userShortStat";

export interface UserInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class UserService implements UserInterface {
  private _axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this._axios = axios;
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
        // onShowErrorToast(error);
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
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(userShortStatSliceIsLoadingAction({ isLoading: false }));
      });
  }
}
