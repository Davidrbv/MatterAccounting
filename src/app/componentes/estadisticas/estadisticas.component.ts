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

  cost: number = 0;
  sale: number = 0;

  invoicesTotal: number[] = [];
  salesTotal: number[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private saleService: SaleService
  ) {}

  ngOnInit() {
    this.invoices = this.invoiceService.getInvoices();
    this.invoices.subscribe((item) => {
      item.filter((data) => {
        this.cost += data.cantidad;
        this.invoicesTotal.push(this.cost);
      });
    });

    this.sales = this.saleService.getSales();
    this.sales.subscribe((item) => {
      item.filter((data) => {
        this.sale += data.total;
        this.salesTotal.push(this.sale);
      });
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
          label: 'Sales',
          backgroundColor: '#FF0000',
          data: this.salesTotal,
          borderColor: 'white',
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: 'Costs',
          backgroundColor: '#00BB2D',
          data: this.invoicesTotal,
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    };

    this.datos2 = {
      labels: ['Sales', 'Costs'],
      datasets: [
        {
          data: [this.salesTotal, this.invoicesTotal],
          backgroundColor: ['#FF0000','#00BB2D'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        },
      ],
    };
  }
}
