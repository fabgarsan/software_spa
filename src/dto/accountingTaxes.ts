export const TAX_TYPE = ["PERCENTAGE_OVER_TOTAL", "FIXED"] as const;

export type TaxType = typeof TAX_TYPE[number];

export interface Tax {
  id: number;
  name: string;
  amount: number;
  type: TaxType;
}

export interface TaxGroup {
  id: number;
  name: string;
  tax: number;
}
