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
  addressRegionIsLoadingAction,
  actualAddressRegionIsLoadingAction,
  addressRegionUpdateAction,
  actualAddressRegionUpdateAction,
  addressRegionsUpdateAction,
  actualAddressRegionsUpdateAction,
  addressCityIsLoadingAction,
  addressCitiesUpdateAction,
  addressCityUpdateAction,
  addressStreetIsLoadingAction,
  addressStreetsUpdateAction,
  addressStreetUpdateAction,
  addressBuildingIsLoadingAction,
  addressBuildingsUpdateAction,
  addressBuildingUpdateAction,
  addressFlatIsLoadingAction,
  addressFlatsUpdateAction,
  addressFlatUpdateAction,
  actualAddressFlatIsLoadingAction,
  actualAddressFlatUpdateAction,
  actualAddressFlatsUpdateAction,
  actualAddressBuildingUpdateAction,
  actualAddressBuildingsUpdateAction,
  actualAddressBuildingIsLoadingAction,
  actualAddressStreetIsLoadingAction,
  actualAddressStreetUpdateAction,
  actualAddressStreetsUpdateAction,
  actualAddressCityUpdateAction,
  actualAddressCityIsLoadingAction,
  actualAddressCitiesUpdateAction,
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
import {
  OptionsObject,
  ProviderContext,
  SnackbarKey,
  SnackbarMessage,
} from "notistack";
export interface AddressInterface {
  //   login: (loginData: DtoUserLogin) => any;
}

export default class AddressService implements AddressInterface {
  private _axios: AxiosInstance;
  private _enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey;

  constructor(axios: AxiosInstance, snackbar: ProviderContext) {
    this._axios = axios;
    this._enqueueSnackbar = snackbar.enqueueSnackbar;
  }

  async getAddressRegions(dispatch: Dispatch<AnyAction>, isLoading: boolean) {
    dispatch(addressRegionIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoRegionResponse[]>("/address/region")
      .then((response) => {
        dispatch(addressRegionsUpdateAction(response.data));

        return true;
      })
      .catch((error: any) => {
        return error;
      })
      .finally(() => {
        dispatch(addressRegionIsLoadingAction({ isLoading: false }));
      });
  }

  async getActualAddressRegions(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean
  ) {
    dispatch(actualAddressRegionIsLoadingAction({ isLoading: true }));

    this._axios
      .get<DtoRegionResponse[]>("/address/region")
      .then((response) => {
        dispatch(actualAddressRegionsUpdateAction(response.data));

        return true;
      })
      .catch((error: any) => {
        return error;
      })
      .finally(() => {
        dispatch(actualAddressRegionIsLoadingAction({ isLoading: false }));
      });
  }

  async createAddressRegion(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    region: DtoCreateRegion
  ) {
    dispatch(addressRegionIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateRegion, { data: DtoRegionResponse }>(
        "/address/region",
        region
      )
      .then((response) => {
        dispatch(addressRegionUpdateAction(response.data));
        this._enqueueSnackbar("Регіон створенно!", {
          variant: "success",
        });
        this.getAddressRegions(dispatch, isLoading);

        return true;
      })
      .catch((error: any) => {
        this._enqueueSnackbar("Помилка!", {
          variant: "error",
        });
        return error;
      })
      .finally(() => {
        dispatch(addressRegionIsLoadingAction({ isLoading: false }));
      });
  }

  async createActualAddressRegion(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    region: DtoCreateRegion
  ) {
    dispatch(actualAddressRegionIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateRegion, { data: DtoRegionResponse }>(
        "/address/region",
        region
      )
      .then((response) => {
        dispatch(actualAddressRegionUpdateAction(response.data));
        this._enqueueSnackbar("Регіон створенно!", {
          variant: "success",
        });
        this.getActualAddressRegions(dispatch, isLoading);
        return true;
      })
      .catch((error: any) => {
        this._enqueueSnackbar("Помилка!", {
          variant: "error",
        });
        return error;
      })
      .finally(() => {
        dispatch(actualAddressRegionIsLoadingAction({ isLoading: false }));
      });
  }

  async getAddressCities(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    regionId: string
  ) {
    if (regionId !== "") {
      dispatch(addressCityIsLoadingAction({ isLoading: true }));
      this._axios
        .get<DtoCityResponse[]>("/address/city", {
          params: { regionId: regionId },
        })
        .then((response) => {
          dispatch(addressCitiesUpdateAction(response.data));
          return true;
        })
        .catch((error: any) => {
          return error;
        })
        .finally(() => {
          dispatch(addressCityIsLoadingAction({ isLoading: false }));
        });
    } else {
      addressCitiesUpdateAction([]);
    }
  }

  async getActualAddressCities(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    regionId: string
  ) {
    if (regionId !== "") {
      dispatch(actualAddressCityIsLoadingAction({ isLoading: true }));
      this._axios
        .get<DtoCityResponse[]>("/address/city", {
          params: { regionId: regionId },
        })
        .then((response) => {
          dispatch(actualAddressCitiesUpdateAction(response.data));
          return true;
        })
        .catch((error: any) => {
          return error;
          // onShowErrorToast(error);
        })
        .finally(() => {
          dispatch(actualAddressCityIsLoadingAction({ isLoading: false }));
        });
    } else {
      actualAddressCitiesUpdateAction([]);
    }
  }

  async createAddressCity(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    city: DtoCreateCity
  ) {
    dispatch(addressCityIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateCity, { data: DtoCityResponse }>("/address/city", city)
      .then((response) => {
        dispatch(addressCityUpdateAction(response.data));
        this._enqueueSnackbar("Населений пункт створенно!", {
          variant: "success",
        });
        this.getAddressCities(dispatch, isLoading, response.data.regionId);
        return true;
      })
      .catch((error: any) => {
        this._enqueueSnackbar("Помилка!", {
          variant: "error",
        });
        return error;
      })
      .finally(() => {
        dispatch(addressCityIsLoadingAction({ isLoading: false }));
      });
  }

  async createActualAddressCity(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    city: DtoCreateCity
  ) {
    dispatch(actualAddressCityIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateCity, { data: DtoCityResponse }>("/address/city", city)
      .then((response) => {
        dispatch(actualAddressCityUpdateAction(response.data));
        this._enqueueSnackbar("Населений пункт створенно!", {
          variant: "success",
        });
        this.getActualAddressCities(
          dispatch,
          isLoading,
          response.data.regionId
        );
        return true;
      })
      .catch((error: any) => {
        this._enqueueSnackbar("Помилка!", {
          variant: "error",
        });
        return error;
      })
      .finally(() => {
        dispatch(actualAddressCityIsLoadingAction({ isLoading: false }));
      });
  }

  async getAddressStreets(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    cityId: string
  ) {
    if (cityId !== "") {
      dispatch(addressStreetIsLoadingAction({ isLoading: true }));
      this._axios
        .get<DtoStreetResponse[]>("/address/street", {
          params: { cityId: cityId },
        })
        .then((response) => {
          dispatch(addressStreetsUpdateAction(response.data));
          return true;
        })
        .catch((error: any) => {
          return error;
          // onShowErrorToast(error);
        })
        .finally(() => {
          dispatch(addressStreetIsLoadingAction({ isLoading: false }));
        });
    } else {
      addressStreetsUpdateAction([]);
    }
  }

  async getActualAddressStreets(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    cityId: string
  ) {
    if (cityId !== "") {
      dispatch(actualAddressStreetIsLoadingAction({ isLoading: true }));
      this._axios
        .get<DtoStreetResponse[]>("/address/street", {
          params: { cityId: cityId },
        })
        .then((response) => {
          dispatch(actualAddressStreetsUpdateAction(response.data));
          return true;
        })
        .catch((error: any) => {
          return error;
          // onShowErrorToast(error);
        })
        .finally(() => {
          dispatch(actualAddressStreetIsLoadingAction({ isLoading: false }));
        });
    } else {
      actualAddressStreetsUpdateAction([]);
    }
  }

  async createAddressStreet(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    street: DtoCreateStreet
  ) {
    dispatch(addressStreetIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateStreet, { data: DtoStreetResponse }>(
        "/address/street",
        street
      )
      .then((response) => {
        dispatch(addressStreetUpdateAction(response.data));
        this._enqueueSnackbar("Вулицю створенно!", {
          variant: "success",
        });
        this.getAddressStreets(dispatch, isLoading, response.data.cityId);
        return true;
      })
      .catch((error: any) => {
        this._enqueueSnackbar("Помилка!", {
          variant: "error",
        });
        return error;
      })
      .finally(() => {
        dispatch(addressStreetIsLoadingAction({ isLoading: false }));
      });
  }

  async createActualAddressStreet(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    street: DtoCreateStreet
  ) {
    dispatch(actualAddressStreetIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateStreet, { data: DtoStreetResponse }>(
        "/address/street",
        street
      )
      .then((response) => {
        dispatch(actualAddressStreetUpdateAction(response.data));
        this._enqueueSnackbar("Вулицю створенно!", {
          variant: "success",
        });
        this.getActualAddressStreets(dispatch, isLoading, response.data.cityId);
        return true;
      })
      .catch((error: any) => {
        this._enqueueSnackbar("Помилка!", {
          variant: "error",
        });
        return error;
      })
      .finally(() => {
        dispatch(actualAddressStreetIsLoadingAction({ isLoading: false }));
      });
  }

  async getAddressBuildings(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    streetId: string
  ) {
    if (streetId !== "") {
      dispatch(addressBuildingIsLoadingAction({ isLoading: true }));
      this._axios
        .get<DtoBuildingResponse[]>("/address/building", {
          params: { streetId: streetId },
        })
        .then((response) => {
          dispatch(addressBuildingsUpdateAction(response.data));
          return true;
        })
        .catch((error: any) => {
          return error;
          // onShowErrorToast(error);
        })
        .finally(() => {
          dispatch(addressBuildingIsLoadingAction({ isLoading: false }));
        });
    } else {
      addressBuildingsUpdateAction([]);
    }
  }

  async getActualAddressBuildings(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    streetId: string
  ) {
    if (streetId !== "") {
      dispatch(actualAddressBuildingIsLoadingAction({ isLoading: true }));
      this._axios
        .get<DtoBuildingResponse[]>("/address/building", {
          params: { streetId: streetId },
        })
        .then((response) => {
          dispatch(actualAddressBuildingsUpdateAction(response.data));
          return true;
        })
        .catch((error: any) => {
          this._enqueueSnackbar("Помилка!", {
            variant: "error",
          });
          return error;
        })
        .finally(() => {
          dispatch(actualAddressBuildingIsLoadingAction({ isLoading: false }));
        });
    } else {
      actualAddressBuildingsUpdateAction([]);
    }
  }

  async createAddressBuilding(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    building: DtoCreateBuilding
  ) {
    dispatch(addressBuildingIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateBuilding, { data: DtoBuildingResponse }>(
        "/address/building",
        building
      )
      .then((response) => {
        dispatch(addressBuildingUpdateAction(response.data));
        this._enqueueSnackbar("Будинок створенно!", {
          variant: "success",
        });
        this.getAddressBuildings(dispatch, isLoading, response.data.streetId);
        return true;
      })
      .catch((error: any) => {
        this._enqueueSnackbar("Помилка!", {
          variant: "error",
        });
        return error;
      })
      .finally(() => {
        dispatch(addressBuildingIsLoadingAction({ isLoading: false }));
      });
  }

  async createActualAddressBuilding(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    building: DtoCreateBuilding
  ) {
    dispatch(actualAddressBuildingIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateBuilding, { data: DtoBuildingResponse }>(
        "/address/building",
        building
      )
      .then((response) => {
        dispatch(actualAddressBuildingUpdateAction(response.data));
        this._enqueueSnackbar("Будинок створенно!", {
          variant: "success",
        });
        this.getActualAddressBuildings(
          dispatch,
          isLoading,
          response.data.streetId
        );
        return true;
      })
      .catch((error: any) => {
        this._enqueueSnackbar("Помилка!", {
          variant: "error",
        });
        return error;
      })
      .finally(() => {
        dispatch(actualAddressBuildingIsLoadingAction({ isLoading: false }));
      });
  }

  async getAddressFlats(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    buildingId: string
  ) {
    if (buildingId !== "") {
      dispatch(addressFlatIsLoadingAction({ isLoading: true }));
      this._axios
        .get<DtoFlatResponse[]>("/address/flat", {
          params: { buildingId: buildingId },
        })
        .then((response) => {
          dispatch(addressFlatsUpdateAction(response.data));
          return true;
        })
        .catch((error: any) => {
          return error;
          // onShowErrorToast(error);
        })
        .finally(() => {
          dispatch(addressFlatIsLoadingAction({ isLoading: false }));
        });
    } else {
      addressFlatsUpdateAction([]);
    }
  }

  async getActualAddressFlats(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    buildingId: string
  ) {
    if (buildingId !== "") {
      dispatch(actualAddressFlatIsLoadingAction({ isLoading: true }));
      this._axios
        .get<DtoFlatResponse[]>("/address/flat", {
          params: { buildingId: buildingId },
        })
        .then((response) => {
          dispatch(actualAddressFlatsUpdateAction(response.data));
          return true;
        })
        .catch((error: any) => {
          this._enqueueSnackbar("Помилка!", {
            variant: "error",
          });
          return error;
        })
        .finally(() => {
          dispatch(actualAddressFlatIsLoadingAction({ isLoading: false }));
        });
    } else {
      actualAddressFlatsUpdateAction([]);
    }
  }

  async createAddressFlat(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    flat: DtoCreateFlat
  ) {
    dispatch(addressFlatIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateFlat, { data: DtoFlatResponse }>("/address/flat", flat)
      .then((response) => {
        dispatch(addressFlatUpdateAction(response.data));
        this._enqueueSnackbar("Квартира створенно!", {
          variant: "success",
        });
        this.getAddressFlats(dispatch, isLoading, response.data.buildingId);
        return true;
      })
      .catch((error: any) => {
        this._enqueueSnackbar("Помилка!", {
          variant: "error",
        });
        return error;
      })
      .finally(() => {
        dispatch(addressFlatIsLoadingAction({ isLoading: false }));
      });
  }

  async createActualAddressFlat(
    dispatch: Dispatch<AnyAction>,
    isLoading: boolean,
    flat: DtoCreateFlat
  ) {
    dispatch(actualAddressFlatIsLoadingAction({ isLoading: true }));

    this._axios
      .post<DtoCreateFlat, { data: DtoFlatResponse }>("/address/flat", flat)
      .then((response) => {
        dispatch(actualAddressFlatUpdateAction(response.data));
        this._enqueueSnackbar("Квартира створенно!", {
          variant: "success",
        });
        this.getActualAddressFlats(
          dispatch,
          isLoading,
          response.data.buildingId
        );
        return true;
      })
      .catch((error: any) => {
        this._enqueueSnackbar("Помилка!", {
          variant: "error",
        });
        return error;
      })
      .finally(() => {
        dispatch(actualAddressFlatIsLoadingAction({ isLoading: false }));
      });
  }
}
