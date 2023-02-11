import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CenterEntityInterface } from "../../../entities/Center";

interface CenterState {
  data: CenterEntityInterface;
  centers: CenterEntityInterface[];
  isLoading: boolean;
}

const initialState: CenterState = {
  data: {
    _id: "",
    name: "",
    address: "",
    phone: "",
    director: "",
    phoneDirector: "",
  },
  centers: [],
  isLoading: false,
};

export const centerSlice = createSlice({
  name: "center",
  initialState,
  reducers: {
    centerIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    centerUpdateAction: (
      state,
      action: PayloadAction<CenterEntityInterface>
    ) => {
      const center = action.payload;

      return {
        ...state,
        data: {
          _id: center._id,
          name: center.name,
          address: center.address,
          phone: center.phone,
          director: center.director,
          phoneDirector: center.phoneDirector,
        },
      };
    },

    centersUpdateAction: (
      state,
      action: PayloadAction<CenterEntityInterface[]>
    ) => {
      const centers = action.payload;

      return {
        ...state,
        centers: centers,
      };
    },
  },
});

export const {
  centerIsLoadingAction,
  centerUpdateAction,
  centersUpdateAction,
} = centerSlice.actions;

export default centerSlice.reducer;
