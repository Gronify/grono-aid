import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StreetEntityInterface } from "../../../entities/Address";

interface StreetState {
  addressStreet: StreetEntityInterface;
  addressStreets: StreetEntityInterface[];
  actualAddressStreet: StreetEntityInterface;
  actualAddressStreets: StreetEntityInterface[];
  addressStreetIsLoading: boolean;
  actualAddressStreetIsLoading: boolean;
}

const initialState: StreetState = {
  addressStreet: {
    _id: "",
    name: "",
    cityId: "",
  },
  addressStreets: [],
  actualAddressStreet: {
    _id: "",
    name: "",
    cityId: "",
  },
  actualAddressStreets: [],
  addressStreetIsLoading: false,
  actualAddressStreetIsLoading: false,
};

export const streetSlice = createSlice({
  name: "street",
  initialState,
  reducers: {
    addressStreetIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        addressStreetIsLoading: action.payload.isLoading,
      };
    },
    actualAddressStreetIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        actualAddressStreetIsLoading: action.payload.isLoading,
      };
    },

    addressStreetUpdateAction: (
      state,
      action: PayloadAction<StreetEntityInterface>
    ) => {
      const street = action.payload;

      return {
        ...state,
        addressStreet: {
          _id: street._id,
          name: street.name,
          cityId: street.cityId,
        },
      };
    },

    addressStreetsUpdateAction: (
      state,
      action: PayloadAction<StreetEntityInterface[]>
    ) => {
      const streets = action.payload;

      return {
        ...state,
        addressStreets: streets,
      };
    },

    actualAddressStreetUpdateAction: (
      state,
      action: PayloadAction<StreetEntityInterface>
    ) => {
      const street = action.payload;

      return {
        ...state,
        actualAddressStreet: {
          _id: street._id,
          name: street.name,
          cityId: street.cityId,
        },
      };
    },

    actualAddressStreetsUpdateAction: (
      state,
      action: PayloadAction<StreetEntityInterface[]>
    ) => {
      const streets = action.payload;

      return {
        ...state,
        actualAddressStreets: streets,
      };
    },
  },
});

export const {
  addressStreetIsLoadingAction,
  actualAddressStreetIsLoadingAction,
  addressStreetUpdateAction,
  addressStreetsUpdateAction,
  actualAddressStreetUpdateAction,
  actualAddressStreetsUpdateAction,
} = streetSlice.actions;

export default streetSlice.reducer;
