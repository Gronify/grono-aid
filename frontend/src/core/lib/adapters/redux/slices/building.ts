import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BuildingEntityInterface } from "../../../entities/Address";

interface BuildingState {
  addressBuilding: BuildingEntityInterface;
  addressBuildings: BuildingEntityInterface[];
  actualAddressBuilding: BuildingEntityInterface;
  actualAddressBuildings: BuildingEntityInterface[];
  addressBuildingIsLoading: boolean;
  actualAddressBuildingIsLoading: boolean;
}

const initialState: BuildingState = {
  addressBuilding: {
    _id: "",
    name: "",
    streetId: "",
  },
  addressBuildings: [],
  actualAddressBuilding: {
    _id: "",
    name: "",
    streetId: "",
  },
  actualAddressBuildings: [],
  addressBuildingIsLoading: false,
  actualAddressBuildingIsLoading: false,
};

export const buildingSlice = createSlice({
  name: "building",
  initialState,
  reducers: {
    addressBuildingIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        addressBuildingIsLoading: action.payload.isLoading,
      };
    },

    actualAddressBuildingIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        actualAddressBuildingIsLoading: action.payload.isLoading,
      };
    },

    addressBuildingUpdateAction: (
      state,
      action: PayloadAction<BuildingEntityInterface>
    ) => {
      const building = action.payload;

      return {
        ...state,
        addressBuilding: {
          _id: building._id,
          name: building.name,
          streetId: building.streetId,
        },
      };
    },

    addressBuildingsUpdateAction: (
      state,
      action: PayloadAction<BuildingEntityInterface[]>
    ) => {
      const buildings = action.payload;

      return {
        ...state,
        addressBuildings: buildings,
      };
    },

    actualAddressBuildingUpdateAction: (
      state,
      action: PayloadAction<BuildingEntityInterface>
    ) => {
      const building = action.payload;

      return {
        ...state,
        actualAddressBuilding: {
          _id: building._id,
          name: building.name,
          streetId: building.streetId,
        },
      };
    },

    actualAddressBuildingsUpdateAction: (
      state,
      action: PayloadAction<BuildingEntityInterface[]>
    ) => {
      const buildings = action.payload;

      return {
        ...state,
        actualAddressBuildings: buildings,
      };
    },
  },
});

export const {
  addressBuildingIsLoadingAction,
  actualAddressBuildingIsLoadingAction,
  addressBuildingUpdateAction,
  addressBuildingsUpdateAction,
  actualAddressBuildingUpdateAction,
  actualAddressBuildingsUpdateAction,
} = buildingSlice.actions;

export default buildingSlice.reducer;
