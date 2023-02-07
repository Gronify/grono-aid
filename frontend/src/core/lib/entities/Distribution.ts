import { GiftEntityInterface } from "./Gift";

export interface DistributionEntityInterface {
  _id: string;
  humanId: string;
  giftId: GiftEntityInterface;
  amount: number;
  comment: string;
  userId: string;
  createdAt: string;
}
