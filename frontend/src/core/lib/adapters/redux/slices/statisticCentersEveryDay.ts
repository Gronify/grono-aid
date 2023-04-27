import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatisticCenterEveryDayEntityInterface } from "../../../entities/Statistic";

interface StatisticCenterEveryDayState {
  data: StatisticCenterEveryDayEntityInterface;
  statisticCenterEveryDay: StatisticCenterEveryDayEntityInterface[];
  isLoading: boolean;
}

const initialState: StatisticCenterEveryDayState = {
  data: {
    _id: "",
    name: "",
    dailyStats: [],
    dailyTotalAmount: 0,
    dailyAverageAmount: 0,
    dailyMaxAmount: 0,
    dailyMinAmount: 0,
    dailyTotalCount: 0,
    dailyAverageCount: 0,
    dailyMaxCount: 0,
    dailyMinCount: 0,
  },
  statisticCenterEveryDay: [],
  isLoading: false,
};

export const statisticCenterEveryDaySlice = createSlice({
  name: "statisticCenterEveryDay",
  initialState,
  reducers: {
    statisticCenterEveryDayIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    statisticCenterEveryDayUpdateAction: (
      state,
      action: PayloadAction<StatisticCenterEveryDayEntityInterface[]>
    ) => {
      const statisticCenterEveryDay = action.payload;

      return {
        ...state,
        statisticCenterEveryDay: statisticCenterEveryDay,
      };
    },
  },
});

export const {
  statisticCenterEveryDayIsLoadingAction,
  statisticCenterEveryDayUpdateAction,
} = statisticCenterEveryDaySlice.actions;

export default statisticCenterEveryDaySlice.reducer;
