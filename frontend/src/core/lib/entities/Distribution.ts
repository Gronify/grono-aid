import { GiftEntityInterface } from "./Gift";
import { HumanEntityInterface, HumanSearchEntityInterface } from "./Human";
import { UserEntityInterface } from "./User";

export interface DistributionEntityInterface {
  _id: string;
  humanId: HumanSearchEntityInterface;
  giftId: GiftEntityInterface;
  amount: number;
  comment: string;
  userId: UserEntityInterface;
  createdAt: string;
}

export interface DistributionManagerEntityInterface {
  _id: string;
  humanId: HumanEntityInterface;
  giftId: GiftEntityInterface;
  amount: number;
  comment: string;
  userId: UserEntityInterface;
  createdAt: string;
}
