export interface UniqueInvoiceNumber {
  id: number;
  dianResolutionNumber: string;
  prefix: string;
  start: number;
  end: number;
  currentNumber: number;
  company: number;
  authorizationDateStart: Date;
  authorizationDateEnd: Date;
  active: boolean;
}
