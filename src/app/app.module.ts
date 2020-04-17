import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProvider } from './app.routing';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListarAreasComponent } from './components/area/listar-areas/listar-areas.component';
import { ListarArticulosComponent } from './components/articulos/listar-articulos/listar-articulos.component';
import { GuardarAreaComponent } from './components/area/guardar-area/guardar-area.component';
import { EditarAreaComponent } from './components/area/editar-area/editar-area.component';
import { BuscarAreaComponent } from './components/area/buscar-area/buscar-area.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { FilterPipe } from './pipes/filter.pipe';




@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ListarAreasComponent,
    ListarArticulosComponent,
    GuardarAreaComponent,
    EditarAreaComponent,
    BuscarAreaComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    ServiceWorkerModule.register('./my-service-worker.js', { enabled: environment.production })
  ],

  providers: [
    appRoutingProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
