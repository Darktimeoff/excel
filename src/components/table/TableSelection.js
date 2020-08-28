import {getNumberAttribute} from '@core/utils';

export class TableSelection {
    static className = 'selected';

    constructor() {
        this.group  = new Set();
        this.current = null;
    }
    
    select($el) {
        this.group.add($el.html());
        this.current = $el;
        $el.addClass(TableSelection.className);

        this.clear($el);
    }

    clear($el) {
        this.group.forEach( item => {
            if(item !== $el.html()) {
                item.classList.remove(TableSelection.className);
                this.group.delete(item);
            }
        });
    }

    unSelect($el) {
        $el.removeClass(TableSelection.className);
    }

    selectGroup(current, target, $root, $target) {
        if(current.row === target.row) {
            highlightCells($root, this.current, current.col, target.col, this.group, 'row');
        }

        if(current.col === target.col) {
            highlightCells($root, this.current, current.row, target.row, this.group, 'col');
            console.log(this.group)
        }

        if(current.row !== target.row && current.col !== target.col) {
            highlightRowAndCol(this.current, current, target, $root, this.group);
            console.log(this.group)
        }
    }
}

function highlightCells($root, $current, start, end, array, type, changeParameter) {
    for (let i = start + 1; i <= end; i++) {
        const cell = $root.find(cellSelectorHighlight(type, changeParameter, $current, i));
       
        cell.addClass(TableSelection.className);
        array.add(cell.html());
    }
}

function removeHighlightCells($root, $current, start, end, array, type, changeParameter) {
    for (let i = start + 1; i <= end; i++) {
        const cell = $root.find(cellSelectorHighlight(type, changeParameter, $current, i));
       
        cell.removeClass(TableSelection.className);
        array.delete(cell.html());
    }
}

function cellSelectorHighlight(type, typeParameter, $current, index) {
    return type === 'col' ? `[data-cell-col="${typeParameter ? typeParameter: +$current.data.cellCol}"][data-cell-row="${index}"]`: `[data-cell-col="${index}"][data-cell-row="${typeParameter ? typeParameter: +$current.data.cellRow}"]`;
}

function highlightRowAndCol($current, current, target, $root, array) {
    for(let i = current.row; i <= target.row; i++) {
        highlightCells($root, $current, i === current.col ? current.col : current.col - 1, target.col, array, 'row', i);
    }
}