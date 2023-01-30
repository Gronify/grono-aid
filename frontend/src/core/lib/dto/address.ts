export type DtoRegionResponse = {
  _id: string;
  name: string;
};

export type DtoCreateRegion = {
  name: string;
};

export type DtoCityResponse = {
  _id: string;
  name: string;
  regionId: string;
};

export type DtoCreateCity = {
  regionId: string;
  name: string;
};

export type DtoStreetResponse = {
  _id: string;
  name: string;
  cityId: string;
};

export type DtoCreateStreet = {
  cityId: string;
  name: string;
};

export type DtoBuildingResponse = {
  _id: string;
  name: string;
  streetId: string;
};

export type DtoCreateBuilding = {
  streetId: string;
  name: string;
};

export type DtoFlatResponse = {
  _id: string;
  name: string;
  buildingId: string;
};

export type DtoCreateFlat = {
  buildingId: string;
  name: string;
};
