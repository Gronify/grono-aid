import { PossiblePermissions } from "../../../constants/permissions";
import { DtoRoleResponse } from "../dto/role";

export interface RoleEntityInterface {
  _id: string;
  value: string;
  description: string;
}
