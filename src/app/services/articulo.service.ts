import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {global} from './global';

@Injectable()
export class ArticuloService{

    public url:String;

    constructor(
        private _http:HttpClient
    ){
        this.url = global.url;
    }

    getArticulos():Observable<any>{
		return this._http.get(`${this.url}articulos`);
	}
}