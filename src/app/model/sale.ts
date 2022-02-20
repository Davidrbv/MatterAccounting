/* Definición propiedades de las ventas */
export interface Sale {
  saleId: string;
  fecha: Date;
  efectivo: number;
  tarjeta: number;
  total: number;
}
