export function shouldResize(event) {
    return Boolean(event.target.dataset.resize)
}

export function isCell(event) {
    return Boolean(event.target.dataset.cell);
}