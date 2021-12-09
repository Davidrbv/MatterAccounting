import { Component, OnInit } from '@angular/core';
import { Factura, FacturasService } from 'src/app/services/facturas.service';
import { Venta, VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {
  datos: any;
  datos2: any;

  facturas: Factura[] = [];
  ventas: Venta[] = [];

  gasto : number = 0;
  ingreso: number = 0;

  totalesFacturas: number[] = [];
  totalesVentas: number[] = [];

  constructor(
    private facturasService: FacturasService,
    private ventasService: VentasService
  ) {}

  async ngOnInit() {

    await this.facturasService.recogeFacturasStorage().then((facturas) => {
      this.facturas = facturas;
      this.facturas.forEach((factura) => {
        this.totalesFacturas.push(factura.total);
      });
      this.gasto = this.totalesFacturas.reduce((a, b) => { return a + b; });
    });

    await this.ventasService.recogeVentasStorage().then((ventas) => {
      this.ventas = ventas;
      this.ventas.forEach((venta) => {
        this.totalesVentas.push(venta.total);
      });
      this.ingreso = this.totalesVentas.reduce((a, b) => { return a + b; });   
    });

    this.datos = {
      labels: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      datasets: [
        {
          type: 'bar',
          label: 'Gastos',
          backgroundColor: '#FF0000',
          data: this.totalesFacturas,
          borderColor: 'white',
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: 'Ingresos',
          backgroundColor: '#00BB2D',
          data: this.totalesVentas,
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    };

    this.datos2 = {
      labels: ['Ventas','Gastos'],
      datasets: [
          {
              data: [this.ingreso, this.gasto],
              backgroundColor: [
                  "#00BB2D",
                  "#FF0000"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ]
          }
      ]
  };
  }
}
