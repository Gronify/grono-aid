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
  center: CenterEntityInterface;
  roles: RoleEntityInterface[];
}

export interface UserShortStatEntityInterface {
  distributeToday: Number;
  distributeThisMonth: Number;
}
