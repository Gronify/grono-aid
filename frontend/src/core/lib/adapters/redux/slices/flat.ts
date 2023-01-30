import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlatEntityInterface } from "../../../entities/Address";

interface FlatState {
  data: FlatEntityInterface;
  flats: FlatEntityInterface[];
  isLoading: boolean;
}

const initialState: FlatState = {
  data: {
    _id: "",
    name: "",
    buildingId: "",
  },
  flats: [],
  isLoading: false,
};

export const flatSlice = createSlice({
  name: "flat",
  initialState,
  reducers: {
    flatIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    flatUpdateAction: (state, action: PayloadAction<FlatEntityInterface>) => {
      const flat = action.payload;

      return {
        ...state,
        data: {
          _id: flat._id,
          name: flat.name,
          buildingId: flat.buildingId,
        },
      };
    },

    flatsUpdateAction: (
      state,
      action: PayloadAction<FlatEntityInterface[]>
    ) => {
      const flats = action.payload;

      return {
        ...state,
        flats: flats,
      };
    },
  },
});

export const { flatIsLoadingAction, flatUpdateAction, flatsUpdateAction } =
  flatSlice.actions;

export default flatSlice.reducer;
