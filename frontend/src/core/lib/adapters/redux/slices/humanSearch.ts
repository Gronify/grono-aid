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
  humans: HumanSearchEntityInterface[];
  isLoggedIn: boolean;
  isLoading: boolean;
}

const initialState: HumanSearchState = {
  data: {
    _id: "",
    surname: "",
    name: "",
    patronymic: "",
    ipn: "",
    dateOfBirthday: "",
    passportId: "",
    comment: "",
    phone: "",
    address: {
      _id: "",
      name: "",
      buildingId: {
        _id: "",
        name: "",
        streetId: {
          _id: "",
          name: "",
          cityId: { _id: "", name: "", regionId: { _id: "", name: "" } },
        },
      },
    },
    actualAddress: {
      _id: "",
      name: "",
      buildingId: {
        _id: "",
        name: "",
        streetId: {
          _id: "",
          name: "",
          cityId: { _id: "", name: "", regionId: { _id: "", name: "" } },
        },
      },
    },
    blocked: false,
    createdAt: "",
    updatedAt: "",
  },
  humans: [],
  isLoggedIn: new LocalStorageToken().hasAccessToken(),
  isLoading: false,
};

export const humanSearchSlice = createSlice({
  name: "humanSearch",
  initialState,
  reducers: {
    humanSearchIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    humanSearchUpdateAction: (
      state,
      action: PayloadAction<HumanSearchEntityInterface>
    ) => {
      const human = action.payload;

      return {
        ...state,
        data: {
          _id: human._id,
          surname: human.surname,
          name: human.name,
          patronymic: human.patronymic,
          ipn: human.ipn,
          dateOfBirthday: human.dateOfBirthday,
          passportId: human.passportId,
          comment: human.comment,
          phone: human.phone,
          address: human.address,
          actualAddress: human.actualAddress,
          blocked: human.blocked,
          createdAt: human.createdAt,
          updatedAt: human.updatedAt,
        },
      };
    },

    humansSearchUpdateAction: (
      state,
      action: PayloadAction<HumanSearchEntityInterface[]>
    ) => {
      const humans = action.payload;

      return {
        ...state,
        humans: humans,
      };
    },
  },
});

export const {
  humanSearchIsLoadingAction,
  humanSearchUpdateAction,
  humansSearchUpdateAction,
} = humanSearchSlice.actions;

export default humanSearchSlice.reducer;
