import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioFacturasComponent } from './componentes/formulario-facturas/formulario-facturas.component';
import { FormularioVentasComponent } from './componentes/formulario-ventas/formulario-ventas.component';

import { ReactiveFormsModule } from '@angular/forms';
import { PanelModule} from 'primeng/panel';
import { ButtonModule} from 'primeng/button';
import { InputTextModule} from 'primeng/inputtext';
import { CardModule} from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'primeng/avatar';
import { PasswordModule} from 'primeng/password';
import { FileUploadModule} from 'primeng/fileupload';
import { HttpClientModule} from '@angular/common/http';
import { ChipModule } from 'primeng/chip';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    FormularioFacturasComponent,
    FormularioVentasComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    CardModule,
    BrowserAnimationsModule,
    AvatarModule,
    PasswordModule,
    FileUploadModule,
    HttpClientModule,
    ChipModule,
    MultiSelectModule,
    TableModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
