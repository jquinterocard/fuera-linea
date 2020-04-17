import { Component, OnInit } from '@angular/core';
import { Area } from '../../../models/area';
import { AreaService } from '../../../services/area.service';



@Component({
  selector: 'app-listar-areas',
  templateUrl: './listar-areas.component.html',
  styleUrls: ['./listar-areas.component.css'],
  providers: [AreaService]
})
export class ListarAreasComponent implements OnInit {

  public titulo: String;

  public areas: Promise<Area[]>;



  constructor(private _areaService: AreaService) {
    this.titulo = 'Área';

    this.areas = this._areaService.getAreas();
    this._areaService.requestSync();

    navigator.serviceWorker.addEventListener('message', event => {
      console.log(event.data);
      if (event.data === 'sync_finished') {
        this.areas = this._areaService.getAreas();
      }
    });

  }

  ngOnInit() {

  }



}
