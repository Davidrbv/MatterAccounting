import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable, of } from 'rxjs';


/* Creamos en el servicio el tipo de datos con los que vamos a trabajar */
export interface Factura {
  id: number;
  proveedor: string;
  fecha: Date;
  subtotal: number;
  iva: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  facturas: Factura[] = [];

  contadorFacturas : number = 0;

  constructor() {
    this.recogeFacturasStorage().then((data) => (this.facturas = data));
    this.recogeContadorFacturasStorage().then((data) => (this.contadorFacturas = data));
   }

  getFactura(id: number): Observable<Factura> {
    return of({ ...this.facturas.filter((t) => t.id === id)[0] });
  }

  /* Graba factura en array y llamada a Storage */

  async grabarFactura(factura: Factura): Promise<Boolean> {
    if(factura.id === null) {
      factura.id = this.contadorFacturas++;
      this.facturas.push(factura);
    } else {
      this.borraFactura(factura.id);
      this.facturas.push(factura);
    }
    await this.grabaFacturaStorage();
    await this.grabaContadorFacturaStorage();
    return true;
  }

  /* Eliminamos factura grabando un array nuevo sin la factura borrada */

  async borraFactura(id: number): Promise<Boolean> {
    this.facturas = this.facturas.filter((t) => t.id !== id);
    return await this.grabaFacturaStorage();
  }

  /* Grabamos factura en storage */

  async grabaFacturaStorage(): Promise<Boolean> {
    await Storage.set({
      key: 'factura',
      value: JSON.stringify(this.facturas),
    });
    return true;
  }

  /* Grabamos contador de facturas en storage */

  async grabaContadorFacturaStorage(): Promise<Boolean> {
    await Storage.set({
      key: 'facturaCounter',
      value: this.contadorFacturas.toString(),
    });
    return true;
  }

  /* Obtener facturas almacenadas en Storage */

  async recogeFacturasStorage(): Promise<Factura[]> {
    const retorno = await Storage.get({ key: 'factura' });
    return JSON.parse(retorno.value!) ? JSON.parse(retorno.value!) : [];
  }

  /* Obtener el contador de facturas del Storage */
  
  async recogeContadorFacturasStorage(): Promise<number> {
    const tc = await Storage.get({ key: 'facturaCounter' });
    return Number.isInteger(+tc.value!) ? +tc.value! : 0;
  }
}
