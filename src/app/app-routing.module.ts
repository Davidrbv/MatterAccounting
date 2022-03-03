import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './componentes/employees/employees.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { FormularioFacturasComponent } from './componentes/formulario-facturas/formulario-facturas.component';
import { FormularioVentasComponent } from './componentes/formulario-ventas/formulario-ventas.component';
import { GaleryComponent } from './componentes/galery/galery.component';
import { LoginComponent } from './componentes/login/login.component';

import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { ToastComponent } from './componentes/toast/toast.component';

//Guarda para denegación de acceso a las urls si no se está logueado.
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',

  },
  {
    path: 'toast',
    component: ToastComponent,
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'galery',
    component: GaleryComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'formulario-facturas',
    component: FormularioFacturasComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'formulario-ventas',
    component: FormularioVentasComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'estadisticas',
    component: EstadisticasComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { 
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
