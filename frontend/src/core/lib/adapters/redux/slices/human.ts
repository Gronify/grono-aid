import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DtoUserResponse } from "../../../dto/user";
import { DtoTokenResponse } from "../../../dto/token";
import { LocalStorageToken } from "../../localStorage";

import { SignInService } from "../../../services/SignInService";
import { DtoRoleResponse } from "../../../dto/role";
import { RoleEntityInterface } from "../../../entities/Role";
import { HumanEntityInterface } from "../../../entities/Human";

interface HumanState {
  data: HumanEntityInterface;

  isLoading: boolean;
}

const initialState: HumanState = {
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
    addressRegion: {
      _id: "",
      name: "",
    },
    addressCity: {
      _id: "",
      name: "",
      regionId: "",
    },
    addressStreet: {
      _id: "",
      name: "",
      cityId: "",
    },
    addressBuilding: {
      _id: "",
      name: "",
      streetId: "",
    },
    addressFlat: {
      _id: "",
      name: "",
      buildingId: "",
    },
    actualAddressRegion: {
      _id: "",
      name: "",
    },
    actualAddressCity: {
      _id: "",
      name: "",
      regionId: "",
    },
    actualAddressStreet: {
      _id: "",
      name: "",
      cityId: "",
    },
    actualAddressBuilding: {
      _id: "",
      name: "",
      streetId: "",
    },
    actualAddressFlat: {
      _id: "",
      name: "",
      buildingId: "",
    },
  },
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

    humanUpdateAction: (state, action: PayloadAction<HumanEntityInterface>) => {
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

          addressRegion: human.addressRegion,
          addressCity: human.addressCity,
          addressStreet: human.addressStreet,
          addressBuilding: human.addressBuilding,
          addressFlat: human.addressFlat,

          actualAddressRegion: human.actualAddressRegion,
          actualAddressCity: human.actualAddressCity,
          actualAddressStreet: human.actualAddressStreet,
          actualAddressBuilding: human.actualAddressBuilding,
          actualAddressFlat: human.actualAddressFlat,
        },
      };
    },
  },
});

export const { humanIsLoadingAction, humanUpdateAction } = humanSlice.actions;

export default humanSlice.reducer;
