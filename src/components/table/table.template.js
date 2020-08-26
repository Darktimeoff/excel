const CODES = {
    A: 65,
    Z: 90
};

function createCell(content) {
    return `<div class="cell" contenteditable>${content}</div>`
}

function createColumn(content) {
    return `<div class="column">${content}</div>`;
}

function createRow(info = '', data = '') {
    return `
    <div class="row">
        <div class="row-info">${info}</div>
        <div class="row-data">${data}</div>
    </div>
    `;
}

function toChar(code) {
    return String.fromCharCode(code)
}

export function createTable(row = 15, col = 80) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(col)
        .fill('')
        .map((item, i) => createColumn(generatorColumnCont(CODES.Z, i)))
        
    rows.push(createRow('', cols.join('')));


    for(let i = 0; i < row; i++) {
        rows.push(createRow(i + 1, cols.fill(createCell('')).join('')));
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
