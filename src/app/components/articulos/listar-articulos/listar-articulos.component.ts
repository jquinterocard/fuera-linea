import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Articulo} from '../../../models/articulo';
import {ArticuloService} from '../../../services/articulo.service';

@Component({
  selector: 'app-listar-articulos',
  templateUrl: './listar-articulos.component.html',
  styleUrls: ['./listar-articulos.component.css'],
  providers: [ArticuloService]
  
})
export class ListarArticulosComponent implements OnInit {

  public titulo:String;
  public articulos:Array<any>;

  constructor(
    private _articuloService:ArticuloService
  ) { 
    this.titulo =  'Artículo';
  }

  ngOnInit(): void {
    
    this.getArticulos();
  }


  getArticulos(){
    this._articuloService.getArticulos().subscribe(
      response => {
        if (response.status === 'success') {
          this.articulos = response.articulos;
        } else{
          this.articulos = [];
        }
        
      },
      err => {
        console.log(err);
        this.articulos = [];
      }
    )
  }
  

}
