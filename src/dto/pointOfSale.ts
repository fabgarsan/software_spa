export interface PointOfSale {
  id: number;
  name: string;
  active: boolean;
  hasIncomeOperations: boolean;
  hasOutcomesOperations: boolean;
  hasParkingLotServicesSales: boolean;
  hasEscortServicesSales: boolean;
}

export interface PointOfSaleWorkShift {
  id: number;
  pointOfSale: number;
  previousWorkShift: number;
  initialCash: number;
  finalCash: number;
  exchangeRateUsd: number;
  closeTime: Date;
  created: Date;
  updated: Date;
}
