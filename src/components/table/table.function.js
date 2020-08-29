export function shouldResize(event) {
    return Boolean(event.target.dataset.resize)
}

export function isCell(event) {
    return Boolean(event.target.dataset.cell);
}

export function nextSelector(key, {row, col}) {
    const MIN_VALUE = 1;

    switch(key) {
        case 'Enter': 
        case 'ArrowDown':
            row++; 
            break;
        case 'Tab':
        case 'ArrowRight':
            col++;
            break;
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? 0 : col - 1;
            break;
        case 'ArrowUp': 
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
            break;
    }

    return `[data-cell-id="${row}:${col}"]`;
} 