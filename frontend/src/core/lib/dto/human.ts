export type DtoHumanSearchRegionResponse = {
  _id: string;
  name: string;
};

export type DtoHumanSearchCityResponse = {
  _id: string;
  name: string;
  regionId: DtoHumanSearchRegionResponse;
};
export type DtoHumanSearchStreetResponse = {
  _id: string;
  name: string;
  cityId: DtoHumanSearchCityResponse;
};
export type DtoHumanSearchBuildingResponse = {
  _id: string;
  name: string;
  streetId: DtoHumanSearchStreetResponse;
};
export type DtoHumanSearchFlatResponse = {
  _id: string;
  name: string;
  buildingId: DtoHumanSearchBuildingResponse;
};

export type DtoHumanSearchResponse = {
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
};

export type DtoCreateHuman = {
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  ipn: string;
  dateOfBirthday: Date;
  address: string;
  actualAddress: string;
  passportId: string;
  comment: string;
  blocked: boolean;
};
