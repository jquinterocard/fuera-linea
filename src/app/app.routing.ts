import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {InicioComponent} from './components/inicio/inicio.component';
import {BuscarAreaComponent} from './components/area/buscar-area/buscar-area.component';
import {ListarAreasComponent} from './components/area/listar-areas/listar-areas.component';
import {GuardarAreaComponent} from './components/area/guardar-area/guardar-area.component';
import {EditarAreaComponent} from './components/area/editar-area/editar-area.component';
import {ListarArticulosComponent} from './components/articulos/listar-articulos/listar-articulos.component';


const appRoutes:Routes = [

    {path:' ', component:InicioComponent},
    {path: 'area', component:ListarAreasComponent},
    {path: 'area/nuevo', component:GuardarAreaComponent},
    {path: 'area/buscar', component:BuscarAreaComponent},
    {path: 'area/editar/:id', component:EditarAreaComponent},
    {path: 'articulo', component:ListarArticulosComponent}
    
];

export const appRoutingProvider:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);