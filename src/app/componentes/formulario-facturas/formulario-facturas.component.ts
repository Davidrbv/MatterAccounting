import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/model/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-formulario-facturas',
  templateUrl: './formulario-facturas.component.html',
  styleUrls: ['./formulario-facturas.component.scss'],
})
export class FormularioFacturasComponent implements OnInit {
  
  invoices: Observable<Invoice[]> =  {} as Observable<Invoice[]>;
  invoicesFilter: Invoice[] = [];
  estado: boolean =  false;
  formulario: FormGroup;

  constructor(public invoiceService: InvoiceService) {
    
    this.formulario = new FormGroup({
      codigo: new FormControl(),
      fecha: new FormControl(),
      cantidad: new FormControl(),
      proveedor: new FormControl(),
      estado: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.invoices = this.invoiceService.getInvoices();
    this.invoices.subscribe(data => this.invoicesFilter = data);
  }

  onSubmit() {
    if (
      this.formulario.value.codigo !== null &&
      this.formulario.value.fecha !== null &&
      this.formulario.value.cantidad !== null &&
      this.formulario.value.proveedor !== null &&
      this.formulario.value.estado !== null
    ) {
      this.invoiceService.addInvoice(this.formulario.value);
      location.reload();
    }
  }

  deleteInvoice(invoice: Invoice) {
    this.invoiceService.deleteInvoice(invoice.invoiceId);
    location.reload();
  }
}
