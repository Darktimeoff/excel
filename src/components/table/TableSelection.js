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


    selectGroup(current, target, $root, $target) {
        this.unSelectGroup(current, target, $root, $target);
    
        highlightRowAndCol(this.current, current, target, $root, this.group);
    }

    unSelectGroup(current, target, $root, $target) {
        if($target.contains(TableSelection.className)) {
            removeHighlightRowAndCol(this.current, current, target, $root, this.group);
            return;
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
        highlightCells($root, $current, i === current.row ? current.col : current.col - 1, target.col, array, 'row', i);
    }
}

function removeHighlightRowAndCol($current, current, target, $root, array) {
    const groupArray = [...array];
    const endRow = getNumberAttribute(groupArray[groupArray.length - 1], 'data-cell-row');
    const endCol = getNumberAttribute(groupArray[groupArray.length - 1], 'data-cell-col');

    for (let i = current.row; i <= endRow; i++) {
        removeHighlightCells($root, $current, target.col, endCol, array, 'row', i); 
    }
    
    for (let i = target.row + 1; i <= endRow; i++) {
        removeHighlightCells($root, $current, current.col - 1, target.col, array, 'row', i); 
    }

}

