import { Token } from "../entities";

import { DtoTokenResponse } from "../dto/token";
import { DtoUserLogin } from "../dto/user";
import { useAxios } from "../../../hooks";
import { AxiosInstance } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../frameworks/redux";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { UserEntityInterface } from "../entities/User";
import {
  buildingIsLoadingAction,
  buildingsUpdateAction,
  buildingUpdateAction,
  citiesUpdateAction,
  cityIsLoadingAction,
  cityUpdateAction,
  flatIsLoadingAction,
  flatsUpdateAction,
  flatUpdateAction,
  regionIsLoadingAction,
  regionsUpdateAction,
  regionUpdateAction,
  streetIsLoadingAction,
  streetsUpdateAction,
  streetUpdateAction,
} from "../adapters";
import { RoleEntityInterface } from "../entities/Role";
import {
  DtoBuildingResponse,
  DtoCityResponse,
  DtoCreateBuilding,
  DtoCreateCity,
  DtoCreateFlat,
  DtoCreateRegion,
  DtoCreateStreet,
  DtoFlatResponse,
  DtoRegionResponse,
  DtoStreetResponse,
} from "../dto/address";
export interface AddressInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class AddressService implements AddressInterface {
  private _axios: AxiosInstance;

  //   constructor(tokenResponse?: DtoTokenResponse) {
  //     this._tokenResponse = tokenResponse;
  //     this._localStorageToken = new LocalStorageToken();
  //   }
  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  async getRegions(dispatch: Dispatch<AnyAction>, isLoading: boolean) {
    dispatch(regionIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoRegionResponse[]>("/address/region")
      .then((response) => {
        dispatch(regionsUpdateAction(response.data));
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(regionIsLoadingAction({ isLoading: false }));
      });
  }

  async createRegion(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    region: DtoCreateRegion
  ) {
    dispatch(regionIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateRegion, { data: DtoRegionResponse }>(
        "/address/region",
        region
      )
      .then((response) => {
        dispatch(regionUpdateAction(response.data));
        this.getRegions(dispatch, isLoading);
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(regionIsLoadingAction({ isLoading: false }));
      });
  }

  async getCities(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    regionId: string
  ) {
    if (regionId !== "") {
      dispatch(cityIsLoadingAction({ isLoading: true }));
      this._axios
        .get<DtoCityResponse[]>("/address/city", {
          params: { regionId: regionId },
        })
        .then((response) => {
          dispatch(citiesUpdateAction(response.data));
          return true;
        })
        .catch((error: any) => {
          return error;
          // onShowErrorToast(error);
        })
        .finally(() => {
          dispatch(cityIsLoadingAction({ isLoading: false }));
        });
    } else {
      citiesUpdateAction([]);
    }
  }

  async createCity(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    city: DtoCreateCity
  ) {
    dispatch(cityIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateCity, { data: DtoCityResponse }>("/address/city", city)
      .then((response) => {
        dispatch(cityUpdateAction(response.data));
        this.getCities(dispatch, isLoading, response.data.regionId);
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(cityIsLoadingAction({ isLoading: false }));
      });
  }

  async getStreets(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    cityId: string
  ) {
    if (cityId !== "") {
      dispatch(streetIsLoadingAction({ isLoading: true }));
      this._axios
        .get<DtoStreetResponse[]>("/address/street", {
          params: { cityId: cityId },
        })
        .then((response) => {
          dispatch(streetsUpdateAction(response.data));
          return true;
        })
        .catch((error: any) => {
          return error;
          // onShowErrorToast(error);
        })
        .finally(() => {
          dispatch(streetIsLoadingAction({ isLoading: false }));
        });
    } else {
      streetsUpdateAction([]);
    }
  }

  async createStreet(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    street: DtoCreateStreet
  ) {
    dispatch(streetIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateStreet, { data: DtoStreetResponse }>(
        "/address/street",
        street
      )
      .then((response) => {
        dispatch(streetUpdateAction(response.data));
        this.getStreets(dispatch, isLoading, response.data.cityId);
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(streetIsLoadingAction({ isLoading: false }));
      });
  }

  async getBuildings(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    streetId: string
  ) {
    if (streetId !== "") {
      dispatch(buildingIsLoadingAction({ isLoading: true }));
      this._axios
        .get<DtoBuildingResponse[]>("/address/building", {
          params: { streetId: streetId },
        })
        .then((response) => {
          dispatch(buildingsUpdateAction(response.data));
          return true;
        })
        .catch((error: any) => {
          return error;
          // onShowErrorToast(error);
        })
        .finally(() => {
          dispatch(buildingIsLoadingAction({ isLoading: false }));
        });
    } else {
      buildingsUpdateAction([]);
    }
  }

  async createBuilding(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    building: DtoCreateBuilding
  ) {
    dispatch(buildingIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateBuilding, { data: DtoBuildingResponse }>(
        "/address/building",
        building
      )
      .then((response) => {
        dispatch(buildingUpdateAction(response.data));
        this.getBuildings(dispatch, isLoading, response.data.streetId);
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(buildingIsLoadingAction({ isLoading: false }));
      });
  }

  async getFlats(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    buildingId: string
  ) {
    if (buildingId !== "") {
      dispatch(flatIsLoadingAction({ isLoading: true }));
      this._axios
        .get<DtoFlatResponse[]>("/address/flat", {
          params: { buildingId: buildingId },
        })
        .then((response) => {
          dispatch(flatsUpdateAction(response.data));
          return true;
        })
        .catch((error: any) => {
          return error;
          // onShowErrorToast(error);
        })
        .finally(() => {
          dispatch(flatIsLoadingAction({ isLoading: false }));
        });
    } else {
      flatsUpdateAction([]);
    }
  }

  async createFlat(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    flat: DtoCreateFlat
  ) {
    dispatch(flatIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateFlat, { data: DtoFlatResponse }>("/address/flat", flat)
      .then((response) => {
        dispatch(flatUpdateAction(response.data));
        this.getFlats(dispatch, isLoading, response.data.buildingId);
        return true;
      })
      .catch((error: any) => {
        return error;
        // onShowErrorToast(error);
      })
      .finally(() => {
        dispatch(flatIsLoadingAction({ isLoading: false }));
      });
  }
}
