import { DtoHumanSearchFlatResponse } from "../dto/human";
import {
  AddressEntityInterface,
  BuildingEntityInterface,
  CityEntityInterface,
  FlatEntityInterface,
  RegionEntityInterface,
  StreetEntityInterface,
} from "./Address";

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

export interface HumanEntityInterface {
  _id: string;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  ipn: string;
  dateOfBirthday: string;

  addressRegion: RegionEntityInterface;
  addressCity: CityEntityInterface;
  addressStreet: StreetEntityInterface;
  addressBuilding: BuildingEntityInterface;
  addressFlat: FlatEntityInterface;

  actualAddressRegion: RegionEntityInterface;
  actualAddressCity: CityEntityInterface;
  actualAddressStreet: StreetEntityInterface;
  actualAddressBuilding: BuildingEntityInterface;
  actualAddressFlat: FlatEntityInterface;

  passportId: string;
  comment: string;
}
