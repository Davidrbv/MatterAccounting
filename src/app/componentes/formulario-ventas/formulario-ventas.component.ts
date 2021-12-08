import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Venta, VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-formulario-ventas',
  templateUrl: './formulario-ventas.component.html',
  styleUrls: ['./formulario-ventas.component.scss'],
})
export class FormularioVentasComponent implements OnInit {

  ventas: Venta[] = [];
  formulario: FormGroup;

  constructor(private ventasService: VentasService) {
    this.formulario = new FormGroup({
      id: new FormControl(),
      turno: new FormControl(),
      fecha: new FormControl(),
      efectivo: new FormControl(),
      tarjeta: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.ventasService
      .recogeVentasStorage()
      .then((ventas) => (this.ventas = ventas));
  }

  onSubmit() {
    if (
      this.formulario.value.turno !== null &&
      this.formulario.value.fecha !== null &&
      this.formulario.value.efectivo !== null &&
      this.formulario.value.tarjeta !== null
    ) {
      this.ventasService.grabarVenta(this.formulario.value);
      location.reload();
    }
  }

  borrarVenta(venta: Venta) {
    this.ventasService.borraVenta(venta.id);
    location.reload();
  }
}
