import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GiftEntityInterface } from "../../../entities/Gift";

interface GiftState {
  data: GiftEntityInterface;
  gifts: GiftEntityInterface[];
  isLoading: boolean;
}

const initialState: GiftState = {
  data: {
    _id: "",
    name: "",
    description: "",
    period: 0,
    measurement: "",
    centerId: "",
  },
  gifts: [],
  isLoading: false,
};

export const giftSlice = createSlice({
  name: "gift",
  initialState,
  reducers: {
    giftIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    giftUpdateAction: (state, action: PayloadAction<GiftEntityInterface>) => {
      const gift = action.payload;

      return {
        ...state,
        data: {
          _id: gift._id,
          name: gift.name,
          description: gift.description,
          period: gift.period,
          measurement: gift.measurement,
          centerId: gift.centerId,
        },
      };
    },

    giftsUpdateAction: (
      state,
      action: PayloadAction<GiftEntityInterface[]>
    ) => {
      const gifts = action.payload;

      return {
        ...state,
        gifts: gifts,
      };
    },
  },
});

export const { giftIsLoadingAction, giftUpdateAction, giftsUpdateAction } =
  giftSlice.actions;

export default giftSlice.reducer;
