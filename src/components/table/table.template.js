const CODES = {
    A: 65,
    Z: 90
};

function createCell(_, index) {
    return `<div class="cell" contenteditable data-cell="cell" data-cell-index="${index}"></div>`
}

function createColumn(content, index) {
    return `
    <div class="column" data-type="resizable" data-col-index="${index}">
        ${content}
        <div class="col-resize" data-resize="col"></div>
    </div>`;
}

function createRow(info = '', data = '') {
    const resize = info ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
    <div class="row" data-row="row" data-type="resizable" >
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

export function createTable(row = 15, col = 10) {
    const rows = [];

    const cols = new Array(col)
        .fill('')
        .map((item, i) => createColumn(generatorColumnCont(CODES.Z, i), i))
        
    rows.push(createRow('', cols.join('')));


    for(let i = 0; i < row; i++) {
        rows.push(createRow(i + 1, cols.map(createCell).join('')));
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
