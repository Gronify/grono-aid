import { DtoHumanSearchFlatResponse } from "../dto/human";
import { AddressEntityInterface } from "./Address";

export interface HumanSearchEntityInterface {
  _id: string;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  ipn: string;
  dateOfBirthday: string;

  address: DtoHumanSearchFlatResponse;
  actualAddress: DtoHumanSearchFlatResponse;
  passportId: string;
  comment: string;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}
