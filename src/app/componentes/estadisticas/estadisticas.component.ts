import { Component, OnInit } from '@angular/core';
import { Factura, FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  datos: any;

  facturas: Factura[] = [];

  totales : number [] = [];

  constructor(private facturasService: FacturasService) { }

  ngOnInit(): void {

    this.facturasService.recogeFacturasStorage().then(facturas => {
      this.facturas = facturas;
      this.facturas.forEach(factura => {        
        this.totales.push(factura.subtotal);
      }); 
    });



    this.datos = {
      labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
      datasets: [{
          type: 'line',
          label: 'Importaciones',
          borderColor: '#ffa726',
          borderWidth: 2,
          fill: false,
          data: this.totales
      }, {
          type: 'bar',
          label: 'Exportaciones',
          backgroundColor: '#05b2a1',
          data: this.totales,
          borderColor: 'white',
          borderWidth: 2
      }]
  };
  }

}
