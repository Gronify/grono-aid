import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StreetEntityInterface } from "../../../entities/Address";

interface StreetState {
  data: StreetEntityInterface;
  streets: StreetEntityInterface[];
  isLoading: boolean;
}

const initialState: StreetState = {
  data: {
    _id: "",
    name: "",
    cityId: "",
  },
  streets: [],
  isLoading: false,
};

export const streetSlice = createSlice({
  name: "street",
  initialState,
  reducers: {
    streetIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    streetUpdateAction: (
      state,
      action: PayloadAction<StreetEntityInterface>
    ) => {
      const street = action.payload;

      return {
        ...state,
        data: {
          _id: street._id,
          name: street.name,
          cityId: street.cityId,
        },
      };
    },

    streetsUpdateAction: (
      state,
      action: PayloadAction<StreetEntityInterface[]>
    ) => {
      const streets = action.payload;

      return {
        ...state,
        streets: streets,
      };
    },
  },
});

export const {
  streetIsLoadingAction,
  streetUpdateAction,
  streetsUpdateAction,
} = streetSlice.actions;

export default streetSlice.reducer;
