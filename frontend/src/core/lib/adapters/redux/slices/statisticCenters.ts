import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatisticCenterEntityInterface } from "../../../entities/Statistic";

interface StatisticCenterState {
  data: StatisticCenterEntityInterface;
  statisticCenter: StatisticCenterEntityInterface[];
  isLoading: boolean;
}

const initialState: StatisticCenterState = {
  data: {
    _id: "",
    name: "",
    totalAmount: 0,
    totalCount: 0,
  },
  statisticCenter: [],
  isLoading: false,
};

export const statisticCenterSlice = createSlice({
  name: "statisticCenter",
  initialState,
  reducers: {
    statisticCenterIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    statisticCenterUpdateAction: (
      state,
      action: PayloadAction<StatisticCenterEntityInterface[]>
    ) => {
      const statisticCenter = action.payload;

      return {
        ...state,
        statisticCenter: statisticCenter,
      };
    },
  },
});

export const { statisticCenterIsLoadingAction, statisticCenterUpdateAction } =
  statisticCenterSlice.actions;

export default statisticCenterSlice.reducer;
