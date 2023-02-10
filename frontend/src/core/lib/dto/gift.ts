export type DtoGiftResponse = {
  _id: string;
  name: string;
  description: string;
  period: number;
  measurement: string;
  centerId: string;
};

export type DtoCreateGift = {
  name: string;
  description: string;
  period: number;
  measurement: string;
};
