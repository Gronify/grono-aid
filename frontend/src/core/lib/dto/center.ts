export type DtoCenterResponse = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  director: string;
  phoneDirector: string;
};

export type DtoCreateCenter = {
  name: string;
  address: string;
  phone: string;
  director: string;
  phoneDirector: string;
};
