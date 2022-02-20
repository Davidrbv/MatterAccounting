import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Sale } from 'src/app/model/sale';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-formulario-ventas',
  templateUrl: './formulario-ventas.component.html',
  styleUrls: ['./formulario-ventas.component.scss'],
})
export class FormularioVentasComponent implements OnInit {

  sales: Observable<Sale[]> = {} as Observable<Sale[]>;
  saleForm: FormGroup;

  constructor(private saleService: SaleService) {
    this.saleForm = new FormGroup({
      fecha: new FormControl(),
      efectivo: new FormControl(),
      tarjeta: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.sales = this.saleService.getSales();
  }

  onSubmit() {
    if (
      this.saleForm.value.fecha !== null &&
      this.saleForm.value.efectivo !== null &&
      this.saleForm.value.tarjeta !== null
    ) {
      this.saleService.addSale(this.saleForm.value);
      location.reload();
    }
  }

  deleteSale(sale: Sale) {
    this.saleService.deleteSale(sale.saleId);
    location.reload();
  }
}
