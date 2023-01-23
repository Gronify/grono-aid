import { RoleEntityInterface } from "./Role";

export interface UserEntityInterface {
  _id: string;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  isBlocked: boolean;
  center: string;
  roles: RoleEntityInterface[];
}
