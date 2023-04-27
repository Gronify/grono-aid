export interface StatisticCenterEntityInterface {
  _id: string;
  name: string;
  totalAmount: number;
  totalCount: number;
}

export interface StatisticCenterEveryDayEntityInterface {
  _id: string;
  name: string;
  dailyStats: {
    centerId: string;
    name: string;
    totalAmount: number;
    totalCount: number;
  }[];
  dailyTotalAmount: number;
  dailyAverageAmount: number;
  dailyMaxAmount: number;
  dailyMinAmount: number;
  dailyTotalCount: number;
  dailyAverageCount: number;
  dailyMaxCount: number;
  dailyMinCount: number;
}
