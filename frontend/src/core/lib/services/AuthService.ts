import { Token } from "../entities";
import {
  LocalStorageToken,
  userIsLoadingAction,
  userSignInAction,
  userUpdateAction,
} from "../adapters";
import { DtoTokenResponse } from "../dto/token";
import { DtoUserLogin, DtoUserRegister } from "../dto/user";
import { AxiosInstance } from "axios";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { UserEntityInterface } from "../entities/User";
import {
  OptionsObject,
  ProviderContext,
  SnackbarKey,
  SnackbarMessage,
} from "notistack";
export interface AuthInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class AuthService implements AuthInterface {
  private _tokenResponse?: DtoTokenResponse;
  private _axios: AxiosInstance;
  private _enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey;

  constructor(axios: AxiosInstance, snackbar: ProviderContext) {
    this._axios = axios;
    this._enqueueSnackbar = snackbar.enqueueSnackbar;
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
        this._enqueueSnackbar("Помилка!", {
          variant: "error",
        });
        return error;
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
