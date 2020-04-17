import { Component, OnInit } from '@angular/core';
import { Area } from '../../../models/area';
import { AreaService } from '../../../services/area.service';
import { Util } from '../../../helpers/util';


@Component({
  selector: 'app-buscar-area',
  templateUrl: './buscar-area.component.html',
  styleUrls: ['./buscar-area.component.css'],
  providers: [AreaService]
})
export class BuscarAreaComponent implements OnInit {

  public titulo: String;
  public areas: Promise<Area[]>;
  public filtro: any;


  constructor(
    private _areaService: AreaService
  ) {

    this.titulo = 'Área';
    this.filtro = {};
    this.areas = this._areaService.getAreas();

    this._areaService.requestSync();
    navigator.serviceWorker.addEventListener('message', event => {
      console.log(event.data);
      if (event.data === 'sync_finished') {
        this.areas = this._areaService.getAreas();
      }
    });

  }

  ngOnInit(): void { }





}
