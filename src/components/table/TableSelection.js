import {getNumberAttribute} from '@core/utils';

export class TableSelection {
    static className = 'selected';

    constructor() {
        this.group  = new Set();
    }
    //$el insanceof Dom
    select($el) {
        this.group.add($el.html());
   
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

    selectGroup($el) {
        if($el.contains(TableSelection.className)) {
            removeGroupElm.call(this, $el);
            console.log('afterRemove')
            return;
        }

        this.group.add($el.html());
        console.log('afterAdd', this.group)
        $el.addClass(TableSelection.className);
    }
}

function removeGroupElm($el) {
    let group = [...this.group];

    if($el.html() === group[group.length - 1]) return true;

    let newGroup = [];
    let elmIndexCol = getNumberAttribute($el.html(), 'data-cell-col');
    let elmIndexRow = getNumberAttribute($el.html(), 'data-cell-row');

    for (let i = 0; i < group.length; i++) {
        if(getNumberAttribute(group[i], 'data-cell-col') >= elmIndexCol || elmIndexRow !== getNumberAttribute(group[i], 'data-cell-row')) {
            group[i].classList.remove(TableSelection.className);
        } 
        if(getNumberAttribute(group[i], 'data-cell-col') < elmIndexCol && elmIndexRow === getNumberAttribute(group[i], 'data-cell-row'))  {
            newGroup.push(group[i]);
        }
    }

    group = null;

    this.group = new Set(newGroup);
    newGroup = null;
}

function isThisElmHasSimpleRowOrCol($el, startCol, startRow) {
    return Boolean(getNumberAttribute($el, 'data-cell-col') === startCol || getNumberAttribute($el, 'data-cell-row') === startRow)
}