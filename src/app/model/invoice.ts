/* Definición propiedades facturas */
export interface Invoice {
  invoiceId: string;
  codigo: string;
  fecha: Date;
  cantidad: number;
  proveedor: string;
  estado: boolean;
}
