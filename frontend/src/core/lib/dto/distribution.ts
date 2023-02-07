import { DtoGiftResponse } from "./gift";

export type DtoDistributionResponse = {
  _id: string;
  humanId: string;
  giftId: DtoGiftResponse;
  amount: number;
  comment: string;
  userId: string;
  createdAt: string;
};

export type DtoCreateDistribution = {
  humanId: string;
  giftId: string;
  amount: number;
  comment: string;
};
