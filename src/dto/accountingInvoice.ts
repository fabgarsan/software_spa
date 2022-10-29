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

export interface Invoice {
  id: number;
  printCount: number;
  source: string;
  prefix: string;
  uniqueInvoiceNumber: number;
  dianResolutionNumber: string;
  status: number;
  automaticRange: string;
  nit: string;
  name: string;
  base: number;
  tax: number;
  total: number;
}

export interface InvoiceItem {
  id: number;
  taxDescription: string;
  base: number;
  invoice: number;
  units: number;
  unitMeasure: string;
  description: string;
  tax: number;
  total: number;
}
