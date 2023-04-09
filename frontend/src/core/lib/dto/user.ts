import { DtoCenterResponse } from "./center";
import { DtoRoleResponse } from "./role";

export type DtoUserResponse = {
  _id: string;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  centerId: DtoCenterResponse;
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

export interface DtoUserShortStat {
  _id: string;
  name: string;
  description: string;
  measurement: string;
  totalAmount: number;
  totalCount: number;
}
export type DtoShortStatResponse = {
  distributeToday: DtoUserShortStat[];
  distributeThisMonth: DtoUserShortStat[];
};
