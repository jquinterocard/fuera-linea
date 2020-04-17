(function () {
    'use strict';

    importScripts('dexie.min.js');

    const db = new Dexie("Area");

    db.version(1).stores({
        areas: "_id,&codigo,&nombre,ts"
    });
    db.open();

    self.addEventListener('sync', (event) => {

        console.log(event.tag);
        if (event.tag == 'document_update') {
            event.waitUntil(serverSync());
        }
    });


    async function serverSync() {
        const response = await fetch('http://localhost:4000/api/areas');
        let { areas } = await response.json();

        const syncRequest = {
            update: [],
            remove: [],
            get: []
        };

        const deleteLocal = [];

        await db.areas.toCollection().each(area => {
            const serverObject = areas.find(obj => obj._id === area._id);
            if (serverObject) {
                if (area.ts === -1) {
                    syncRequest.remove.push(area._id);
                } else if (area.ts > serverObject.ts) {
                    syncRequest.update.push(area);
                } else if (area.ts < serverObject.ts) {
                    syncRequest.get.push(area._id);
                }
                areas = areas.filter(obj => obj._id !== area._id);
            } else {
                //no esta en el servidor insertar local

                if (area.ts === 0 || area.ts > 0) {
                    syncRequest.update.push(area);
                } else {
                    deleteLocal.push(area._id);
                }

            }
        });


        //Traer ids a la base de datos local
        areas.forEach((area) => syncRequest.get.push(area._id));

        //Borrar areas local
        let deleted = false;
        for (const _id of deleteLocal) {
            await db.areas.delete(_id);
            deleted = true;
        }


        //si no hay cambios finalizar sincronizacion
        if (syncRequest.update.length === 0
            && syncRequest.remove.length === 0
            && syncRequest.get.length === 0) {
            if (deleted) {
                return notifyClients();
            } else {
                return Promise.resolve();
            }
        }

        //Enviar peticion al servidor
        const syncResponse = await fetch('http://localhost:4000/api/sync', {
            method: 'POST',
            body: JSON.stringify(syncRequest),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (syncResponse.status === 200) {

            const sync = await syncResponse.json();

            const { get, updated, removed } = sync.response;

            await db.transaction('rw', db.areas, async () => {

                if (get && get.length > 0) {
                    await db.areas.bulkPut(get);
                }

                if (updated) {
                    updated.forEach(async (area) => await db.areas.update(area._id, { ts: area.ts }));
                }

                if (removed) {
                    removed.forEach(async (_id) => await db.areas.delete(_id));
                }
            });

            return notifyClients();
        }
        if (syncResponse.status === 400) {
            const res = await syncResponse.json();
            const { error } = res;
            console.log(error);
            await db.areas.delete(error._id);

            return notifyClients();
        }
        return Promise.reject('sync failed: ' + response.status);

    }


    async function notifyClients() {
        const clients = await self.clients.matchAll({ includeUncontrolled: true });
        for (const client of clients) {
            client.postMessage('sync_finished');
        }
    }

}());


