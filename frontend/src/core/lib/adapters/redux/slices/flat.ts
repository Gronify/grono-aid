import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlatEntityInterface } from "../../../entities/Address";

interface FlatState {
  addressFlat: FlatEntityInterface;
  addressFlats: FlatEntityInterface[];
  actualAddressFlat: FlatEntityInterface;
  actualAddressFlats: FlatEntityInterface[];
  addressFlatIsLoading: boolean;
  actualAddressFlatIsLoading: boolean;
}

const initialState: FlatState = {
  addressFlat: {
    _id: "",
    name: "",
    buildingId: "",
  },
  addressFlats: [],
  actualAddressFlat: {
    _id: "",
    name: "",
    buildingId: "",
  },
  actualAddressFlats: [],
  addressFlatIsLoading: false,
  actualAddressFlatIsLoading: false,
};

export const flatSlice = createSlice({
  name: "flat",
  initialState,
  reducers: {
    addressFlatIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        addressFlatIsLoading: action.payload.isLoading,
      };
    },

    actualAddressFlatIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        addressFlatIsLoading: action.payload.isLoading,
      };
    },

    addressFlatUpdateAction: (
      state,
      action: PayloadAction<FlatEntityInterface>
    ) => {
      const flat = action.payload;

      return {
        ...state,
        addressFlat: {
          _id: flat._id,
          name: flat.name,
          buildingId: flat.buildingId,
        },
      };
    },

    addressFlatsUpdateAction: (
      state,
      action: PayloadAction<FlatEntityInterface[]>
    ) => {
      const flats = action.payload;

      return {
        ...state,
        addressFlats: flats,
      };
    },

    actualAddressFlatUpdateAction: (
      state,
      action: PayloadAction<FlatEntityInterface>
    ) => {
      const flat = action.payload;

      return {
        ...state,
        actualAddressFlat: {
          _id: flat._id,
          name: flat.name,
          buildingId: flat.buildingId,
        },
      };
    },

    actualAddressFlatsUpdateAction: (
      state,
      action: PayloadAction<FlatEntityInterface[]>
    ) => {
      const flats = action.payload;

      return {
        ...state,
        actualAddressFlats: flats,
      };
    },
  },
});

export const {
  addressFlatIsLoadingAction,
  actualAddressFlatIsLoadingAction,
  addressFlatUpdateAction,
  addressFlatsUpdateAction,
  actualAddressFlatUpdateAction,
  actualAddressFlatsUpdateAction,
} = flatSlice.actions;

export default flatSlice.reducer;
