export interface InvoiceItemInterface {
  description: string;
  unit: string;
  quantity: number;
  rate: string;
  isConfirmed: boolean;
  confirmedRate: number;
  confirmedQuantity: number;
}
