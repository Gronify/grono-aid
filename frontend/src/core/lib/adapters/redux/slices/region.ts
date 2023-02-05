import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegionEntityInterface } from "../../../entities/Address";

interface RegionState {
  addressRegion: RegionEntityInterface;
  addressRegions: RegionEntityInterface[];
  actualAddressRegion: RegionEntityInterface;
  actualAddressRegions: RegionEntityInterface[];
  addressRegionIsLoading: boolean;
  actualAddressRegionIsLoading: boolean;
}

const initialState: RegionState = {
  addressRegion: {
    _id: "",
    name: "",
  },
  addressRegions: [],

  actualAddressRegion: {
    _id: "",
    name: "",
  },
  actualAddressRegions: [],
  addressRegionIsLoading: false,
  actualAddressRegionIsLoading: false,
};

export const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    addressRegionIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        addressRegionІsLoading: action.payload.isLoading,
      };
    },
    actualAddressRegionIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        actualAddressRegionІsLoading: action.payload.isLoading,
      };
    },

    addressRegionUpdateAction: (
      state,
      action: PayloadAction<RegionEntityInterface>
    ) => {
      const region = action.payload;

      return {
        ...state,
        addressRegion: {
          _id: region._id,
          name: region.name,
        },
      };
    },

    addressRegionsUpdateAction: (
      state,
      action: PayloadAction<RegionEntityInterface[]>
    ) => {
      const regions = action.payload;

      return {
        ...state,
        addressRegions: regions,
      };
    },

    actualAddressRegionUpdateAction: (
      state,
      action: PayloadAction<RegionEntityInterface>
    ) => {
      const region = action.payload;

      return {
        ...state,
        actualAddressRegion: {
          _id: region._id,
          name: region.name,
        },
      };
    },

    actualAddressRegionsUpdateAction: (
      state,
      action: PayloadAction<RegionEntityInterface[]>
    ) => {
      const regions = action.payload;

      return {
        ...state,
        actualAddressRegions: regions,
      };
    },
  },
});

export const {
  addressRegionIsLoadingAction,
  actualAddressRegionIsLoadingAction,
  addressRegionUpdateAction,
  addressRegionsUpdateAction,
  actualAddressRegionUpdateAction,
  actualAddressRegionsUpdateAction,
} = regionSlice.actions;

export default regionSlice.reducer;
