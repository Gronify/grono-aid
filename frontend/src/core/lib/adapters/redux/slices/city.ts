import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CityEntityInterface } from "../../../entities/Address";

interface CityState {
  data: CityEntityInterface;
  cities: CityEntityInterface[];
  isLoading: boolean;
}

const initialState: CityState = {
  data: {
    _id: "",
    name: "",
    regionId: "",
  },
  cities: [],
  isLoading: false,
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    cityIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    cityUpdateAction: (state, action: PayloadAction<CityEntityInterface>) => {
      const city = action.payload;

      return {
        ...state,
        data: {
          _id: city._id,
          name: city.name,
          regionId: city.regionId,
        },
      };
    },

    citiesUpdateAction: (
      state,
      action: PayloadAction<CityEntityInterface[]>
    ) => {
      const cities = action.payload;

      return {
        ...state,
        cities: cities,
      };
    },
  },
});

export const { cityIsLoadingAction, cityUpdateAction, citiesUpdateAction } =
  citySlice.actions;

export default citySlice.reducer;
