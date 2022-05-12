import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { FormularioFacturasComponent } from "./componentes/formulario-facturas/formulario-facturas.component";
import { FormularioVentasComponent } from "./componentes/formulario-ventas/formulario-ventas.component";
import { LoginComponent } from "./componentes/login/login.component";
import { EmployeesComponent } from "./componentes/employees/employees.component";
import { GaleryComponent } from "./componentes/galery/galery.component";

import { EstadisticasComponent } from "./componentes/estadisticas/estadisticas.component";
import { ReactiveFormsModule } from "@angular/forms";
import { PanelModule } from "primeng/panel";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CardModule } from "primeng/card";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AvatarModule } from "primeng/avatar";
import { FileUploadModule } from "primeng/fileupload";
import { HttpClientModule } from "@angular/common/http";
import { MultiSelectModule } from "primeng/multiselect";
import { TableModule } from "primeng/table";
import { ChartModule } from "primeng/chart";
import { ChipModule } from "primeng/chip";

import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";

import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { provideStorage, getStorage } from "@angular/fire/storage";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireModule } from "@angular/fire/compat";

import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { SelectButtonModule } from "primeng/selectbutton";
import { DialogModule } from "primeng/dialog";

import { GalleriaModule } from "primeng/galleria";
import { FormsModule } from "@angular/forms";
import { AvatarGroupModule } from "primeng/avatargroup";
import { CarouselModule } from "primeng/carousel";

import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ToastModule } from "primeng/toast";
import { ToastComponent } from "./componentes/toast/toast.component";
import { BadgeModule } from "primeng/badge";
import { AdministrationComponent } from "./componentes/administration/administration.component";

@NgModule({
  declarations: [
    AppComponent,
    FormularioFacturasComponent,
    FormularioVentasComponent,
    EstadisticasComponent,
    LoginComponent,
    EmployeesComponent,
    GaleryComponent,
    ToastComponent,
    AdministrationComponent
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
    FileUploadModule,
    HttpClientModule,
    MultiSelectModule,
    TableModule,
    ChartModule,
    SelectButtonModule,
    DialogModule,
    GalleriaModule,
    FormsModule,
    AvatarGroupModule,
    CarouselModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    BadgeModule,
    ChipModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ConfirmDialogModule,
    AngularFireStorageModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
