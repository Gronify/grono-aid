import { DtoGiftResponse } from "./gift";
import { DtoHumanSearchResponse } from "./human";
import { DtoUserResponse } from "./user";

export type DtoDistributionResponse = {
  _id: string;
  humanId: DtoHumanSearchResponse;
  giftId: DtoGiftResponse;
  amount: number;
  comment: string;
  userId: DtoUserResponse;
  createdAt: string;
};

export type DtoCreateDistributionResponse = {
  _id: string;
  humanId: string;
  giftId: string;
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
