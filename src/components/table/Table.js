import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.function';

export class Table extends ExcelComponent {
    static className = 'excel__table';
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable(50, 30);
    }

    onMousedown(event) {
        event.preventDefault();
        if(shouldResize(event)) {
            resizeHandler.call(this, event);
        }
    }
}


