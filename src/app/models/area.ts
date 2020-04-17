import Dexie from 'dexie';

export class AreaDb extends Dexie {
    areas: Dexie.Table<Area, String>;

    constructor() {
        super('Area');
        this.version(1).stores({
            areas: "_id,&codigo,&nombre,ts"
        })
    }
}

export interface Area {
    _id: string,
    codigo: string,
    nombre: string,
    requiere_comanda: boolean,
    estado: string,
    ts: number
}