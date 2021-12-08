import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { FormularioFacturasComponent } from './componentes/formulario-facturas/formulario-facturas.component';
import { FormularioVentasComponent } from './componentes/formulario-ventas/formulario-ventas.component';

const routes: Routes = [
  {
    path: 'formulario-facturas',
    component: FormularioFacturasComponent,
    pathMatch: 'full',
  },
  {
    path: 'formulario-ventas',
    component: FormularioVentasComponent,
    pathMatch: 'full',
  },
  { path: 'estadisticas',
    component: EstadisticasComponent, 
    pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
