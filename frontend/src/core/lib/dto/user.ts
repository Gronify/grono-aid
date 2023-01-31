import { DtoRoleResponse } from "./role";

export type DtoUserResponse = {
  _id: string;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  center: string;
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
