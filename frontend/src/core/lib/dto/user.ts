import { DtoCenterResponse } from "./center";
import { DtoRoleResponse } from "./role";

export type DtoUserResponse = {
  _id: string;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  center: DtoCenterResponse;
  isBlocked: boolean;
  roles: DtoRoleResponse[];
};

export type DtoUserLogin = {
  email: string;
  password: string;
};

export type DtoUserRegister = {
  email: string;
  password: string;
  centerId: string;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
};

export type DtoShortStatResponse = {
  distributeToday: Number;
  distributeThisMonth: Number;
};
