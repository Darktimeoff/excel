import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.function';
import {TableSelection} from '@/components/table/TableSelection';
import {isCell} from '@/components/table/table.function';
import {getNumberAttribute} from '@core/utils';

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

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init();

        const $cell = this.$root.find('[data-cell-id="1:0"]')
        this.selection.select($cell);
    }

    onMousedown(event) {
        event.preventDefault();
        if(shouldResize(event)) {
            resizeHandler.call(this, event);
        }

        if(isCell(event)) {
            const $target = $(event.target);
           
     
            if(!event.shiftKey) {
                this.selection.select($target);
            }

            if(event.shiftKey) {
                this.selection.selectGroup($target);
            }

        }
    }
}


