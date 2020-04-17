import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Area } from '../../../models/area';
import { AreaService } from '../../../services/area.service';
import Swal from 'sweetalert2/dist/sweetalert2';

@Component({
  selector: 'app-editar-area',
  templateUrl: '../guardar-area/guardar-area.component.html',
  styleUrls: ['./editar-area.component.css'],
  providers: [AreaService]
})
export class EditarAreaComponent implements OnInit {

  public titulo: String;
  public area: Area;
  public is_edit: boolean;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _areaService: AreaService) {

    this.titulo = 'Área';
    this.is_edit = true;
    this.area = {
      _id: null,
      codigo: '',
      nombre: '',
      requiere_comanda: false,
      estado: '',
      ts: 0
    }
  }

  async ngOnInit() {

    const _id = this._route.snapshot.paramMap.get('id');
    if (_id) {

      this.area = await this._areaService.getArea(_id);
      if (!this.area) {
        this._router.navigate(['/area']);
      }

    } else {
      this._router.navigate(['/area']);
    }

  }

  deleteArea() {
    if (this.area._id) {
      this._areaService.delete(this.area);
    }
    this._router.navigate(['/area']);
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



}
