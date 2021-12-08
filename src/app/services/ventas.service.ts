import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable, of } from 'rxjs';

/* Creamos en el servicio el tipo de datos con los que vamos a trabajar */
export interface Venta {
  id: number;
  turno: string;
  fecha: Date;
  efectivo: number;
  tarjeta: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  ventas: Venta[] = [];

  contadorVentas : number = 0;

  constructor() {
    this.recogeVentasStorage().then((data) => (this.ventas = data));
    this.recogeContadorVentasStorage().then((data) => (this.contadorVentas = data));
   }

  getFactura(id: number): Observable<Venta> {
    return of({ ...this.ventas.filter((t) => t.id === id)[0] });
  }

  /* Graba ventas en array y llamada a Storage */

  async grabarVenta(venta: Venta): Promise<Boolean> {
    if(venta.id === null) {
      venta.id = this.contadorVentas++;
      this.ventas.push(venta);
    } else {
      this.borraVenta(venta.id);
      this.ventas.push(venta);
    }
    await this.grabaVentaStorage();
    await this.grabaContadorVentaStorage();
    return true;
  }

  /* Eliminamos ventas grabando un array nuevo sin la ventas borrada */

  async borraVenta(id: number): Promise<Boolean> {
    this.ventas = this.ventas.filter((t) => t.id !== id);
    return await this.grabaVentaStorage();
  }

  /* Grabamos ventas en storage */

  async grabaVentaStorage(): Promise<Boolean> {
    await Storage.set({
      key: 'venta',
      value: JSON.stringify(this.ventas),
    });
    return true;
  }

  /* Grabamos contador de ventas en storage */

  async grabaContadorVentaStorage(): Promise<Boolean> {
    await Storage.set({
      key: 'contadorVentas',
      value: this.contadorVentas.toString(),
    });
    return true;
  }

  /* Obtener ventas almacenadas en Storage */

  async recogeVentasStorage(): Promise<Venta[]> {
    const retorno = await Storage.get({ key: 'venta' });
    return JSON.parse(retorno.value!) ? JSON.parse(retorno.value!) : [];
  }

  /* Obtener el contador de facturas del Storage */
  
  async recogeContadorVentasStorage(): Promise<number> {
    const tc = await Storage.get({ key: 'contadorVentas' });
    return Number.isInteger(+tc.value!) ? +tc.value! : 0;
  }
}
