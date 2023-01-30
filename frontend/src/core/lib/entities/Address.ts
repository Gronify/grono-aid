export interface AddressEntityInterface {
  region: string;
  city: string;
  street: string;
  building: string;
  flat: string;
}

export interface RegionEntityInterface {
  _id: string;
  name: string;
}

export interface CityEntityInterface {
  _id: string;
  name: string;
  regionId: string;
}

export interface StreetEntityInterface {
  _id: string;
  name: string;
  cityId: string;
}

export interface BuildingEntityInterface {
  _id: string;
  name: string;
  streetId: string;
}

export interface FlatEntityInterface {
  _id: string;
  name: string;
  buildingId: string;
}
