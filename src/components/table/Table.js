import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {isCell, nextSelector, shouldResize} from '@/components/table/table.function';
import * as actions from '@/redux/actions';

export class Table extends ExcelComponent {
    static className = 'excel__table';
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    toHTML() {
        return createTable(50, 30, this.store.getState());
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init();
        
        this.selectCell(this.$root.find('[data-cell-id="1:0"]'));
        
        this.$on('formula:input', text => {
            this.selection.current.text(text);
            this.upDateTextInStore(text)
        });

        this.$on('formula:enter', () => {
            this.selection.current.focus();
        });
    }

    selectCell($cell) {
        this.selection.select($cell);

        this.$emit('table:select', $cell);
    }

    async  resizeTable(event) {
        try {
            const data  = await resizeHandler.call(this, event);
            this.$dispatch(actions.tableResize(data));
        } catch (e) {
            console.warn('Resize error', e.message);
        }
    }

    onMousedown(event) { 
        if(shouldResize(event)) {
            this.resizeTable(event)
        }

        if(isCell(event)) {
            const $target = $(event.target);
           
     
            if(!event.shiftKey) {
                this.selectCell($target);
            }

            if(event.shiftKey) {
                const target =  $target.id(true);
                const current = this.selection.current.id(true);

                this.selection.selectGroup(current, target, this.$root, $target);
            }

        }
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];

        const {key} = event;

        if(keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
           
            const id = this.selection.current.id(true);
           
            let $next = this.$root.find(nextSelector(key, id));
          
            this.selectCell($next);
        }
    }

    upDateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }));
    }

    onInput(event) {
        this.upDateTextInStore($(event.target).text());
    }
}
  
