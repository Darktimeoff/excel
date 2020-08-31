//Pure functions они не замодействуют с глобальными областями видимости, они только реагируют на те данные что приходят как аргументы
export function capitalize(string = '') {
    return typeof string === 'string' ? string[0].toUpperCase() + string.slice(1) : '';
}

export function getNumberAttribute($elm, attribute) {
    return Number($elm.getAttribute(attribute))
}

export function storage(key, data) {
    if(!data) {
        return JSON.parse(localStorage.getItem(key));
    }
    
    localStorage.setItem(key, JSON.stringify(data))
}