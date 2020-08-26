import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table';
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'mouseup']
        });
    }

    toHTML() {
        return createTable(20, 25);
    }

    onMousedown(event) {
        if(event.target.dataset.resize) {
            const $target = $(event.target);
            const $el = $target.html().parentElement;
         
            resize(this.$root, $target, $el, event)
        }
    }

    onMouseup(event) {  
        this.$root.html().onmousemove = null;
        console.log('mouseup')
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
	if(resizeType === 'col') {
		const columnIndex = [...$el.closest('.row-data').querySelectorAll('.column')].indexOf($el);

		const resizeCellElms = [...$root.html().querySelectorAll(`.row>.row-data>.cell:nth-child(${columnIndex + 1})`)];
		resizeCellElms.push($el);
		
		return resizeCellElms;
	} 

	if(resizeType === 'row') {
		const resizeCellElms = [...$el.nextElementSibling.querySelectorAll('div.cell')];
		resizeCellElms.push($el);
	
		return resizeCellElms;
	}
}