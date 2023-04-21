import { AxiosInstance } from "axios";

import { Dispatch } from "react";
import { AnyAction, Observable } from "@reduxjs/toolkit";
import {
  humanIsLoadingAction,
  humanSearchIsLoadingAction,
  humanUpdateAction,
} from "../adapters";

import {
  humansSearchUpdateAction,
  humanSearchUpdateAction,
} from "../adapters/redux/slices/humanSearch";
import {
  DtoCreateHuman,
  DtoEditHuman,
  DtoHumanSearchResponse,
} from "../dto/human";
import { HumanEntityInterface } from "../entities/Human";
import {
  OptionsObject,
  ProviderContext,
  SnackbarKey,
  SnackbarMessage,
} from "notistack";
import { HumanSearchEntityInterface } from "../entities/Human";

export interface HumanInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class HumanService implements HumanInterface {
  private _axios: AxiosInstance;
  private _enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey;

  constructor(axios: AxiosInstance, snackbar: ProviderContext) {
    this._axios = axios;
    this._enqueueSnackbar = snackbar.enqueueSnackbar;
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
        this._enqueueSnackbar("Людина створенна!", {
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

  async getHumans(dispatch: Dispatch<AnyAction>, isLoading: boolean) {
    dispatch(humanSearchIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoHumanSearchResponse[]>("/human/all")
      .then((response) => {
        dispatch(humansSearchUpdateAction(response.data));
        return true;
      })
      .catch((error: any) => {
        return error;
      })
      .finally(() => {
        dispatch(humanSearchIsLoadingAction({ isLoading: false }));
      });
  }

  async edit(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    human: HumanSearchEntityInterface
  ): Promise<Boolean> {
    dispatch(humanIsLoadingAction({ isLoading: true }));

    return this._axios
      .patch<Boolean, { data: DtoEditHuman }>("/human", {
        ...human,
      })
      .then((response) => {
        dispatch(
          humanSearchUpdateAction({
            _id: "",
            surname: "",
            name: "",
            patronymic: "",
            ipn: "",
            dateOfBirthday: "",
            passportId: "",
            comment: "",
            phone: "",
            address: {
              _id: "",
              name: "",
              buildingId: {
                _id: "",
                name: "",
                streetId: {
                  _id: "",
                  name: "",
                  cityId: {
                    _id: "",
                    name: "",
                    regionId: { _id: "", name: "" },
                  },
                },
              },
            },
            actualAddress: {
              _id: "",
              name: "",
              buildingId: {
                _id: "",
                name: "",
                streetId: {
                  _id: "",
                  name: "",
                  cityId: {
                    _id: "",
                    name: "",
                    regionId: { _id: "", name: "" },
                  },
                },
              },
            },
            blocked: false,
            createdAt: "",
            updatedAt: "",
          })
        );
        this.getHumans(dispatch, isLoading);
        this._enqueueSnackbar("Центр відредаговано!", {
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
        dispatch(humanSearchIsLoadingAction({ isLoading: false }));
      });
  }

  async delete(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    human: HumanSearchEntityInterface
  ): Promise<Boolean> {
    dispatch(humanSearchIsLoadingAction({ isLoading: true }));

    return this._axios
      .delete<Boolean, { data: HumanSearchEntityInterface }>("/human", {
        data: {
          ...human,
        },
      })
      .then((response) => {
        dispatch(
          humanSearchUpdateAction({
            _id: "",
            surname: "",
            name: "",
            patronymic: "",
            ipn: "",
            dateOfBirthday: "",
            passportId: "",
            comment: "",
            phone: "",
            address: {
              _id: "",
              name: "",
              buildingId: {
                _id: "",
                name: "",
                streetId: {
                  _id: "",
                  name: "",
                  cityId: {
                    _id: "",
                    name: "",
                    regionId: { _id: "", name: "" },
                  },
                },
              },
            },
            actualAddress: {
              _id: "",
              name: "",
              buildingId: {
                _id: "",
                name: "",
                streetId: {
                  _id: "",
                  name: "",
                  cityId: {
                    _id: "",
                    name: "",
                    regionId: { _id: "", name: "" },
                  },
                },
              },
            },
            blocked: false,
            createdAt: "",
            updatedAt: "",
          })
        );
        this.getHumans(dispatch, isLoading);
        this._enqueueSnackbar("Центр видаленно!", {
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
        dispatch(humanSearchIsLoadingAction({ isLoading: false }));
      });
  }
}
