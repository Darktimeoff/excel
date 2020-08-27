import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table';
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable(20, 25);
    }

    onMousedown(event) {
        if(event.target.dataset.resize) {
            const $target = $(event.target);
            const $el = $target.closest('[data-type="resizable"]');
            
            this.resize($target, $el, event);
        }
    }

    resize($target, $el, mousedownEvent) {
        const resizeElms = {}

        if($target.data.resize === 'col') {
            const startWidth = parseInt($el.computedStyle.width);
            const startPositon = mousedownEvent.screenX;
    
            const resizeCellElms = this.findResizeCellElm($el, this.$root, 'col');
            resizeElms.items = resizeCellElms;
            resizeElms.type = 'width';
    
            this.$root.html().onmousemove = event => {
                resizeElms.size = this.resizeRowAndCol(startWidth, startPositon, event.screenX, 40);
            }
        } 
    
        if($target.data.resize === 'row') {
            const startHeight = parseInt($el.computedStyle.height);
            const startPositon = mousedownEvent.screenY;
    
            const resizeCellElms = this.findResizeCellElm($el, this.$root, 'row');
            resizeElms.items = resizeCellElms;
            resizeElms.type = 'height';
    
            this.$root.html().onmousemove = event => {
                resizeElms.size = this.resizeRowAndCol(startHeight, startPositon, event.screenY,  24);
            }
        }
    
        this.$root.html().onmouseup = () => {
            this.$root.html().onmousemove = null;
      
            resizeElms.items.forEach(item => {
                item.style[resizeElms.type] = resizeElms.size;
            });
        }
    }

    findResizeRow($el) {
        const resizeCellElms = [...$el.closest('[data-row="row"]').findAll('[data-cell="cell"]')];
        resizeCellElms.push($el.html());
        
        return resizeCellElms;
    }

    findResizeCol($el, $root) {
        const resizeCellElms = [...$root.findAll(`[data-cell-index="${Number($el.data.colIndex)}"]`)];
        resizeCellElms.push($el.html());
        
        return resizeCellElms;
    }

    findResizeCellElm($el, $root, resizeType) {
        return resizeType === 'col' ? this.findResizeCol($el, $root) : this.findResizeRow($el);
    }

    resizeRowAndCol(startSize, startPositon, screenEvent,  minvalue) {
        const screen = screenEvent;
        const dir = screen - startPositon;
    
        if(startPositon < screen) {	
            return checkSize(calcSize(startSize, dir, minvalue), minvalue);
        } else {
            return checkSize(calcSize(startSize, dir, minvalue), minvalue);
        }
    }
}


function checkSize(size, minvalue) {
    return parseInt(size) < minvalue ? minvalue + 'px' : size
}

function calcSize(startSize,  dir) {
    return  startSize + dir + 'px';
}