import { CenterEntityInterface } from "./Center";
import { RoleEntityInterface } from "./Role";

// export interface UserEntityInterface {
//   _id: string;
//   surname: string;
//   name: string;
//   patronymic: string;
//   phone: string;
//   email: string;
//   isBlocked: boolean;
//   center: string;
//   roles: RoleEntityInterface[];
// }

export interface UserEntityInterface {
  _id: string;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  isBlocked: boolean;
  centerId: CenterEntityInterface;
  roles: RoleEntityInterface[];
}
export interface UserShortStatObjectEntityInterface {
  _id: string;
  name: string;
  description: string;
  measurement: string;
  totalAmount: number;
  totalCount: number;
}

export interface UserShortStatEntityInterface {
  distributeToday: UserShortStatObjectEntityInterface[];
  distributeThisMonth: UserShortStatObjectEntityInterface[];
}
