import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/model/invoice';
import { Sale } from 'src/app/model/sale';
import { InvoiceService } from 'src/app/services/invoice.service';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {
  datos: any;
  datos2: any;

  invoices: Observable<Invoice[]> = {} as Observable<Invoice[]>;
  sales: Observable<Sale[]> = {} as Observable<Sale[]>;

  gasto : number = 0;
  ingreso: number = 0;

  totalesFacturas: number[] = [];
  totalesVentas: number[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private saleService: SaleService
  ) {}

  ngOnInit() {

    this.invoices = this.invoiceService.getInvoices();
    this.sales = this.saleService.getSales();

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
