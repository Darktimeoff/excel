const CODES = {
    A: 65,
    Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;
const DEFAULT_CONTENT = '';

function createCellWithStyle(width, height, content = '') {
    return function (_, col, row) {
        return  `<div class="cell" contenteditable data-cell="cell" data-cell-id="${row + 1}:${col}" data-cell-col="${col}" data-cell-row="${row + 1}" style="width:${width};height:${height}">${content}</div>`   
    }
}

function createColumn(content, index, width) {
    return `
    <div class="column" data-type="resizable" data-col-index="${index}" style="width:${width}">
        ${content}
        <div class="col-resize" data-resize="col"></div>
    </div>`;
}

function createRow(info = '', data = '', height = '') {
    const resize = info ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
    <div class="row" data-row="row" data-type="resizable" data-row-index="${info || 0}" style="height:${height}">
        <div class="row-info">
            ${info}
            ${resize}
        </div>
        <div class="row-data" data-data-row="data">${data}</div>
    </div>
    `;
}

function toChar(code) {
    return String.fromCharCode(code)
}

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH + 'px');
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT + 'px');
}

function getContentCell(state, row, col) {
    return state[row + 1 + ':' + col] || DEFAULT_CONTENT;
}

export function createTable(row = 15, col = 10, state) {
    const rows = [];

    const cols = new Array(col)
        .fill('')
        .map((item, i) => {
            const width = getWidth(state.colState, i);
            return createColumn(generatorColumnCont(CODES.Z, i), i, width);
        });
        
    rows.push(createRow('', cols.join('')));


    for(let i = 0; i < row; i++) {
        const cells = cols.map((item, j) => {
            return createCellWithStyle(getWidth(state.colState, j), getHeight(state.rowState, i + 1), getContentCell(state.dataState, i, j))(item, j, i)
        }).join('');

        rows.push(createRow(i + 1, cells, getHeight(state.rowState, i + 1)));
    }

    return rows.join('');
}

function generatorColumnCont(maxCode, i) {
    const code = CODES.A + i;

    if(code > maxCode) { 
        if(generatorColumnCont.count > 25) generatorColumnCont.count = 0;

        const base = Math.floor(i  / 25) < 2 ? 0 : Math.floor((i - 1) / 25) - 1;

        return toChar(CODES.A + base) + toChar(CODES.A + generatorColumnCont.count++)
    } else {
        return toChar(code)
    }
}

generatorColumnCont.count = 1;
