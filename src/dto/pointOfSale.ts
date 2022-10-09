export interface PointOfSale {
  id: number;
  printer: number;
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
  uniqueInvoiceNumber: number;
  previousWorkShift: number;
  initialCash: number;
  finalCash: number;
  exchangeRateUsd: number;
  closeTime: Date;
  created: Date;
  updated: Date;
}
