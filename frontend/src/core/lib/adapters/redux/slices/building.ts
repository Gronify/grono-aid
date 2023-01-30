import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BuildingEntityInterface } from "../../../entities/Address";

interface BuildingState {
  data: BuildingEntityInterface;
  buildings: BuildingEntityInterface[];
  isLoading: boolean;
}

const initialState: BuildingState = {
  data: {
    _id: "",
    name: "",
    streetId: "",
  },
  buildings: [],
  isLoading: false,
};

export const buildingSlice = createSlice({
  name: "building",
  initialState,
  reducers: {
    buildingIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    buildingUpdateAction: (
      state,
      action: PayloadAction<BuildingEntityInterface>
    ) => {
      const building = action.payload;

      return {
        ...state,
        data: {
          _id: building._id,
          name: building.name,
          streetId: building.streetId,
        },
      };
    },

    buildingsUpdateAction: (
      state,
      action: PayloadAction<BuildingEntityInterface[]>
    ) => {
      const buildings = action.payload;

      return {
        ...state,
        buildings: buildings,
      };
    },
  },
});

export const {
  buildingIsLoadingAction,
  buildingUpdateAction,
  buildingsUpdateAction,
} = buildingSlice.actions;

export default buildingSlice.reducer;
