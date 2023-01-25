import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DtoUserResponse } from "../../../dto/user";
import { DtoTokenResponse } from "../../../dto/token";
import { LocalStorageToken } from "../../localStorage";

import { SignInService } from "../../../services/SignInService";
import { DtoRoleResponse } from "../../../dto/role";
import { RoleEntityInterface } from "../../../entities/Role";
import { HumanSearchEntityInterface } from "../../../entities/Human";

interface HumanSearchState {
  data: HumanSearchEntityInterface;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const initialState: HumanSearchState = {
  data: {
    surname: "",
    name: "",
    patronymic: "",
    ipn: "",
    passportId: "",
    comment: "",
    phone: "",
    address: {
      region: "",
      city: "",
      street: "",
      building: "",
      flat: "",
    },
    actualAddress: {
      region: "",
      city: "",
      street: "",
      building: "",
      flat: "",
    },
  },
  isLoggedIn: new LocalStorageToken().hasAccessToken(),
  isLoading: false,
};

export const humanSlice = createSlice({
  name: "human",
  initialState,
  reducers: {
    humanIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    humanUpdateAction: (
      state,
      action: PayloadAction<HumanSearchEntityInterface>
    ) => {
      const human = action.payload;

      return {
        ...state,
        data: {
          surname: human.surname,
          name: human.name,
          patronymic: human.patronymic,
          ipn: human.ipn,
          passportId: human.passportId,
          comment: human.comment,
          phone: human.phone,
          address: human.address,
          actualAddress: human.actualAddress,
        },
      };
    },
  },
});

export const { humanIsLoadingAction, humanUpdateAction } = humanSlice.actions;

export default humanSlice.reducer;
