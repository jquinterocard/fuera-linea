import { Pipe, PipeTransform } from '@angular/core';
import { Util } from '../helpers/util';

@Pipe({
    name: 'myFilter',
    pure: false
})
export class FilterPipe implements PipeTransform {

    transform(documents, filter): any {
        const { condition } = this.buildCondition(filter);

        if (!documents || !filter || !condition) {
            return documents;
        }
        return documents.filter(doc => eval(condition));
    }


    buildCondition(params) {
        let conditions = []
        for (let key in params) {

            if (params[key] === 'true') {
                conditions.push(`doc.${key} === true`);

            } else if (params[key] === 'false') {
                conditions.push(`doc.${key} === false`);

            } else {
                if (params[key]) {

                    let cond = `doc.${key} && doc.${key}.toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .indexOf('${params[key].toLowerCase()}') !== -1`;
                    conditions.push(cond);
                }
            }
        }

        return {
            condition: conditions.length ? conditions.join(' && ') : ''
        }
    }
}
