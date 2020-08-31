import {$} from '@core/dom';

export function resizeHandler(event) {
    return new Promise(resolve => {
        const $resizer = $(event.target);
        const $parent = $resizer.closest('[data-type="resizable"]');
        const type = $resizer.data.resize
    
        $resizer.css({opacity: 1});
    
        resize.call(this, type, $parent, event, $resizer, resolve);
    });
}

function resize(type, $el, mousedownEvent, $resizer, resolve) {
    const resizeElms = {}

    if(type === 'col') {
        const startWidth = parseInt($el.computedStyle.width);
        const startPositon = mousedownEvent.screenX;

        const resizeCellElms = findResizeCellElm($el, this.$root, 'col');
        resizeElms.items = resizeCellElms;
        resizeElms.type = 'width';

        this.$root.html().onmousemove = event => {
            event.preventDefault();
            
            let {size, dir} = resizeRowAndCol(startWidth, startPositon, event.screenX, 40);

            resizeElms.size = size;

            $resizer.css({right:  -dir + 'px', bottom: -document.documentElement.scrollHeight + 'px'});
        }
    } 

    if(type === 'row') {
        const startHeight = parseInt($el.computedStyle.height);
        const startPositon = mousedownEvent.screenY;

        const resizeCellElms = findResizeCellElm($el, this.$root, 'row');
        resizeElms.items = resizeCellElms;
        resizeElms.type = 'height';

        this.$root.html().onmousemove = event => {
            event.preventDefault();

            let{size, dir} = resizeRowAndCol(startHeight, startPositon, event.screenY, 24);

            resizeElms.size = size;

            $resizer.css({bottom: -dir + 'px', right: -document.documentElement.scrollWidth + 'px'})
        }
    }

    this.$root.html().onmouseup = event => {
        event.preventDefault();

        this.$root.html().onmousemove = null;
        this.$root.html().onmouseup = null;

        resizeElms.items.forEach(item => {
            item.style[resizeElms.type] = resizeElms.size;
        });

        resolve({
            value: resizeElms.size,
            id: type === 'col' ? $el.data.colIndex : null
        });

        $resizer.css({bottom: '', right: '', opacity: ''});
    }
}

function findResizeRow($el) {
    const resizeCellElms = [...$el.closest('[data-row="row"]').findAll('[data-cell="cell"]')];
    resizeCellElms.push($el.html());
    
    return resizeCellElms;
}

function findResizeCol($el, $root) {
    const resizeCellElms = [...$root.findAll(`[data-cell-col="${Number($el.data.colIndex)}"]`)];
    resizeCellElms.push($el.html());
    
    return resizeCellElms;
}

function findResizeCellElm($el, $root, resizeType) {
    return resizeType === 'col' ? findResizeCol($el, $root) : findResizeRow($el);
}

function resizeRowAndCol(startSize, startPositon, screenEvent, minvalue) {
    const screen = screenEvent;
    const dir = screen - startPositon;

    if(startPositon < screen) {	
        return {
            size: checkSize(calcSize(startSize, dir, minvalue), minvalue),
            dir
        }
    } else {
        return {
            size: checkSize(calcSize(startSize, dir, minvalue), minvalue),
            dir
        }
    }
}

function checkSize(size, minvalue) {
    return parseInt(size) < minvalue ? minvalue + 'px' : size
}

function calcSize(startSize,  dir) {
    return  startSize + dir + 'px';
}