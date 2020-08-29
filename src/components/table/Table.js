import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {isCell, nextSelector, shouldResize} from '@/components/table/table.function';


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
        return createTable(50, 30);
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init();
        
        this.selectCell(this.$root.find('[data-cell-id="1:0"]'));

        this.$on('formula:input', text => {
            this.selection.current.text(text);
        });

        this.$on('formula:enter', () => {
            this.selection.current.focus();
        })
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell)
    }

    onMousedown(event) { 
        if(shouldResize(event)) {
            resizeHandler.call(this, event);
        }

        if(isCell(event)) {
            const $target = $(event.target);
           
     
            if(!event.shiftKey) {
                this.selection.select($target);
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

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}
  
