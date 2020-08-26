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
         
            resize(this.$root, $target, $el.html(), event);

            this.$root.html().onmouseup = () => {
                this.$root.html().onmousemove = null;
            }
        }
    }
}


function checkSize(size, minvalue) {
    return parseInt(size) < minvalue ? minvalue + 'px' : size
}

function calcSize(startSize,  dir) {
    return  startSize + dir + 'px';
}

function resizeRowAndCol(startSize, startPositon, screenEvent,  sizeParameter, resizeCellElms, minvalue) {
    const screen = screenEvent;
    const dir = screen - startPositon;

    if(startPositon < screen) {
		resizeCellElms.forEach($el => {
			$el.style[sizeParameter] = checkSize(calcSize(startSize, dir, minvalue), minvalue);
		});
    } else {
        resizeCellElms.forEach($el => {
			$el.style[sizeParameter] = checkSize(calcSize(startSize, dir, minvalue), minvalue);
		});
    }
}

function resize($root, $target, $el, mousedownEvent) {
    if($target.html().dataset.resize === 'col') {
        const startWidth = parseInt(window.getComputedStyle($el).width);
        const startPositon = mousedownEvent.screenX;

        const resizeCellElms = findResizeCellElm($el, $root, 'col');

        $root.html().onmousemove = function(event) {
            resizeRowAndCol(startWidth, startPositon, event.screenX,  'width', resizeCellElms, 40);
        }
    } 

    if($target.html().dataset.resize === 'row') {
        const startHeight = parseInt(window.getComputedStyle($el).height);
        const startPositon = mousedownEvent.screenY;

        const resizeCellElms = findResizeCellElm($el, $root, 'row');

        $root.html().onmousemove = function(event) {
            resizeRowAndCol(startHeight, startPositon, event.screenY, 'height', resizeCellElms, 24);
        }
    }
}

function findResizeCellElm($el, $root, resizeType) {
	return resizeType === 'col' ? findResizeCol($el, $root) : findResizeRow($el);
}

function findResizeCol($el, $root) {
	const columnIndex = [...$el.closest('[data-data-row="data"]').querySelectorAll('[data-type="resizable"]')].indexOf($el);

	const resizeCellElms = [...$root.html().querySelectorAll(`[data-row="row"]>[data-data-row="data"]>[data-cell="cell"]:nth-child(${columnIndex + 1})`)];
	resizeCellElms.push($el);
	
	return resizeCellElms;
}

function findResizeRow($el) {
	const resizeCellElms = [...$el.closest('[data-row="row"]').querySelectorAll('[data-cell="cell"]')];
	resizeCellElms.push($el);
	
	return resizeCellElms;
}