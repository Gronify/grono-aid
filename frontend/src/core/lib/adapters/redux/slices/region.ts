import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegionEntityInterface } from "../../../entities/Address";

interface RegionState {
  data: RegionEntityInterface;
  regions: RegionEntityInterface[];
  isLoading: boolean;
}

const initialState: RegionState = {
  data: {
    _id: "",
    name: "",
  },
  regions: [],
  isLoading: false,
};

export const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    regionIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    regionUpdateAction: (
      state,
      action: PayloadAction<RegionEntityInterface>
    ) => {
      const region = action.payload;

      return {
        ...state,
        data: {
          _id: region._id,
          name: region.name,
        },
      };
    },

    regionsUpdateAction: (
      state,
      action: PayloadAction<RegionEntityInterface[]>
    ) => {
      const regions = action.payload;

      return {
        ...state,
        regions: regions,
      };
    },
  },
});

export const {
  regionIsLoadingAction,
  regionUpdateAction,
  regionsUpdateAction,
} = regionSlice.actions;

export default regionSlice.reducer;
