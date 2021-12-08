import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Factura, FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-formulario-facturas',
  templateUrl: './formulario-facturas.component.html',
  styleUrls: ['./formulario-facturas.component.scss']
})
export class FormularioFacturasComponent implements OnInit {

  facturas: Factura[] = [];
  formulario: FormGroup;

  constructor(public facturasService: FacturasService ) { 

    this.formulario = new FormGroup({

      id: new FormControl,
      proveedor: new FormControl,
      fecha: new FormControl,
      subtotal: new FormControl,
      iva: new FormControl,
    });

  }

  ngOnInit(): void {
    this.facturasService.recogeFacturasStorage().then(facturas => this.facturas = facturas);
  }

  onSubmit(){
    if(this.formulario.value.proveedor !== null &&
       this.formulario.value.fecha !== null &&
       this.formulario.value.subtotal !== null &&
       this.formulario.value.iva !== null){
      this.facturasService.grabarFactura(this.formulario.value);
      location.reload();
    }   
  }

  borrarFactura(factura: Factura){
    this.facturasService.borraFactura(factura.id);
    location.reload();
  }



}

