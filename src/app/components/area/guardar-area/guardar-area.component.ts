import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from '../../../models/area';
import { AreaService } from '../../../services/area.service';
import { Util } from '../../../helpers/util';


@Component({
  selector: 'app-guardar-area',
  templateUrl: './guardar-area.component.html',
  styleUrls: ['./guardar-area.component.css'],
  providers: [AreaService]
})
export class GuardarAreaComponent implements OnInit {

  public titulo: String;
  public area: Area;
  public is_edit: boolean;


  constructor(
    private _areaService: AreaService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

    this.titulo = 'Área';
    this.is_edit = false;
    this.area = {
      _id: null,
      codigo: '',
      nombre: '',
      requiere_comanda: false,
      estado: '',
      ts: 0
    };

  }

  ngOnInit() {

  }

  async save() {
    await this._areaService.save(this.area);
    this._router.navigate(['/area']);

  }

  resetForm(form) {
    this.area = {
      _id: null,
      codigo: '',
      nombre: '',
      requiere_comanda: false,
      estado: '',
      ts: 0
    };
  }

  deleteArea() {

  }

}
