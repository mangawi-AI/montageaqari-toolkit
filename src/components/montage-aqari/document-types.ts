export type DocumentKind = "quote" | "invoice";

export interface DocumentValues {
  kind: DocumentKind;
  clientName: string;
  description: string;
  amount: string;
  date: string;
  documentNumber: string;
  freelanceNumber: string;
}