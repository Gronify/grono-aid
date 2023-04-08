import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DtoShortStatResponse, DtoUserResponse } from "../../../dto/user";
import { DtoTokenResponse } from "../../../dto/token";
import { UserShortStatEntityInterface } from "../../../entities/User";
import { SignInService } from "../../../services/SignInService";
import { RoleEntityInterface } from "../../../entities/Role";

interface UserShortStatState {
  data: UserShortStatEntityInterface;
  isLoading: boolean;
}

const initialState: UserShortStatState = {
  data: {
    distributeToday: 0,
    distributeThisMonth: 0,
  },
  isLoading: false,
};

export const userShortStatSlice = createSlice({
  name: "userShortStat",
  initialState,
  reducers: {
    userShortStatSliceIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    userShortStatUpdateAction: (
      state,
      action: PayloadAction<DtoShortStatResponse>
    ) => {
      const userShortStat = action.payload;

      return {
        ...state,
        data: {
          distributeToday: userShortStat.distributeToday,
          distributeThisMonth: userShortStat.distributeThisMonth,
        },
      };
    },
  },
});

export const { userShortStatSliceIsLoadingAction, userShortStatUpdateAction } =
  userShortStatSlice.actions;

export default userShortStatSlice.reducer;
