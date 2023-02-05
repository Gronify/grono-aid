import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CityEntityInterface } from "../../../entities/Address";

interface CityState {
  addressCity: CityEntityInterface;
  addressCities: CityEntityInterface[];
  actualAddressCity: CityEntityInterface;
  actualAddressCities: CityEntityInterface[];
  addressCityIsLoading: boolean;
  actualAddressCityIsLoading: boolean;
}

const initialState: CityState = {
  addressCity: {
    _id: "",
    name: "",
    regionId: "",
  },
  addressCities: [],
  actualAddressCity: {
    _id: "",
    name: "",
    regionId: "",
  },
  actualAddressCities: [],
  addressCityIsLoading: false,
  actualAddressCityIsLoading: false,
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    addressCityIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        addressCityIsLoading: action.payload.isLoading,
      };
    },

    actualAddressCityIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        actualAddressCityIsLoading: action.payload.isLoading,
      };
    },

    addressCityUpdateAction: (
      state,
      action: PayloadAction<CityEntityInterface>
    ) => {
      const city = action.payload;

      return {
        ...state,
        addressCity: {
          _id: city._id,
          name: city.name,
          regionId: city.regionId,
        },
      };
    },

    addressCitiesUpdateAction: (
      state,
      action: PayloadAction<CityEntityInterface[]>
    ) => {
      const cities = action.payload;

      return {
        ...state,
        addressCities: cities,
      };
    },

    actualAddressCityUpdateAction: (
      state,
      action: PayloadAction<CityEntityInterface>
    ) => {
      const city = action.payload;

      return {
        ...state,
        actualAddressCity: {
          _id: city._id,
          name: city.name,
          regionId: city.regionId,
        },
      };
    },

    actualAddressCitiesUpdateAction: (
      state,
      action: PayloadAction<CityEntityInterface[]>
    ) => {
      const cities = action.payload;

      return {
        ...state,
        actualAddressCities: cities,
      };
    },
  },
});

export const {
  addressCityIsLoadingAction,
  actualAddressCityIsLoadingAction,
  addressCityUpdateAction,
  addressCitiesUpdateAction,
  actualAddressCityUpdateAction,
  actualAddressCitiesUpdateAction,
} = citySlice.actions;

export default citySlice.reducer;
