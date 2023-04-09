import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DtoUserResponse } from "../../../dto/user";
import { DtoTokenResponse } from "../../../dto/token";
import { LocalStorageToken } from "../../localStorage";
import { UserEntityInterface } from "../../../entities/User";
import { SignInService } from "../../../services/SignInService";
import { DtoRoleResponse } from "../../../dto/role";
import { RoleEntityInterface } from "../../../entities/Role";

interface UserState {
  data: UserEntityInterface;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  data: {
    _id: "",
    surname: "",
    name: "",
    patronymic: "",
    email: "",
    phone: "",
    isBlocked: false,
    centerId: {
      _id: "",
      name: "",
      address: "",
      phone: "",
      director: "",
      phoneDirector: "",
    },
    roles: [],
  },
  isLoggedIn: new LocalStorageToken().hasAccessToken(),
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userIsLoadingAction: (
      state,
      action: PayloadAction<{ isLoading: boolean }>
    ) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },

    userSignInAction: (state, action: PayloadAction<DtoTokenResponse>) => {
      const service = new SignInService(action.payload);
      const isLoggedIn = service.signIn();

      return {
        ...state,
        isLoggedIn,
      };
    },

    userSingOutAction: (state) => {
      const service = new SignInService();
      service.signOut();

      return {
        ...initialState,
        isLoggedIn: false,
      };
    },

    userUpdateAction: (state, action: PayloadAction<DtoUserResponse>) => {
      const user = action.payload;

      return {
        ...state,
        data: {
          _id: user._id,
          surname: user.surname,
          name: user.name,
          patronymic: user.patronymic,
          phone: user.phone,
          email: user.email,
          isBlocked: user.isBlocked,
          centerId: user.centerId,
          roles: <RoleEntityInterface[]>user.roles,
        },
      };
    },
  },
});

export const {
  userSignInAction,
  userUpdateAction,
  userSingOutAction,
  userIsLoadingAction,
} = userSlice.actions;

export default userSlice.reducer;
