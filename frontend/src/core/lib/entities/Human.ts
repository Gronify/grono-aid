import { AddressEntityInterface } from "./Address";

export interface HumanSearchEntityInterface {
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  ipn: string;
  passportId: string;
  comment: string;
  address: AddressEntityInterface;
  actualAddress: AddressEntityInterface;
}
