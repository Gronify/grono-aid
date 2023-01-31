import { Token } from "../entities";
import {
  LocalStorageToken,
  userIsLoadingAction,
  userSignInAction,
  userUpdateAction,
} from "../adapters";
import { DtoTokenResponse } from "../dto/token";
import { DtoUserLogin, DtoUserRegister } from "../dto/user";
import { useAxios } from "../../../hooks";
import { AxiosInstance } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../frameworks/redux";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { UserEntityInterface } from "../entities/User";
export interface AuthInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class AuthService implements AuthInterface {
  private _tokenResponse?: DtoTokenResponse;
  private _axios: AxiosInstance;

  //   constructor(tokenResponse?: DtoTokenResponse) {
  //     this._tokenResponse = tokenResponse;
  //     this._localStorageToken = new LocalStorageToken();
  //   }
  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  parseJwt(): UserEntityInterface {
    const storageToken = new LocalStorageToken();
    const token = storageToken.getAccessToken();
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return <UserEntityInterface>JSON.parse(jsonPayload);
  }

  async login(
    loginData: DtoUserLogin,
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean
  ) {
    dispatch(userIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoUserLogin, { data: DtoTokenResponse }>("/auth/login", loginData)
      .then((response: any) => {
        const storageToken = new LocalStorageToken();

        storageToken.setAccessToken(response.data);

        dispatch(userSignInAction(response.data));
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

  async registration(
    registrationData: DtoUserRegister,
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean
  ) {
    dispatch(userIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoUserRegister, { data: DtoTokenResponse }>(
        "/auth/registration",
        registrationData
      )
      .then((response: any) => {
        const storageToken = new LocalStorageToken();

        storageToken.setAccessToken(response.data);

        dispatch(userSignInAction(response.data));
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
}
