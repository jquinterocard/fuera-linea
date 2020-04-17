import { Injectable, Inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Area, AreaDb } from '../models/area';
import { showErrorMessage } from '../models/messages';
import { Util } from '../helpers/util';

@Injectable()
export class AreaService {

    private db: AreaDb;


    constructor() {
        this.db = new AreaDb();

    }

    async getAreas(): Promise<Area[]> {
        return this.db.areas.where('ts').above(-1).sortBy('nombre');
    }

    getArea(_id: String): Promise<Area> {
        return this.db.areas.get(_id);
    }

    delete(area: Area) {
        area.ts = -1;
        this.db.areas.put(area).then(() => this.requestSync());
    }

    async save(area: Area) {
        if (!area._id) {
            try {
                const { length } = await this.db.areas.where('nombre').equalsIgnoreCase(area.nombre).toArray();
                if (length > 0) {
                    Util.showErrorMessage(`El area con nombre ${area.nombre} ya existe`);
                } else {
                    area.codigo = area.codigo.trim().toUpperCase();
                    area.nombre = area.nombre.trim().toUpperCase();
                    area._id = uuidv4();
                    area.ts = 10000;
                    await this.db.areas.add(area);
                    this.requestSync();
                }
            } catch (ex) {
                Util.showErrorMessage('La información que esta diligenciando ya existe');
            }

        } else {

            const oldArea = await this.db.areas.get(area._id);
            if (this.changed(oldArea, area)) {
                try {
                    area.codigo = area.codigo.trim().toUpperCase();
                    area.nombre = area.nombre.trim().toUpperCase();
                    area.ts = Date.now();
                    await this.db.areas.put(area);
                    this.requestSync();

                } catch (ex) {
                    Util.showErrorMessage('La información que esta diligenciando ya existe');
                }
            }
        }
    }

    requestSync() {
        navigator.serviceWorker.ready.then(swRegistration => swRegistration.sync.register('document_update'));
    }

    private changed(oldArea: Area, newArea: Area) {
        if (oldArea.codigo !== newArea.codigo) {
            return true;
        }
        if (oldArea.nombre !== newArea.nombre) {
            return true;
        }

        if (oldArea.requiere_comanda !== newArea.requiere_comanda) {
            return true;
        }

        if (oldArea.estado !== newArea.estado) {
            return true;
        }
        return false;
    }





}