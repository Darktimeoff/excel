import {storage} from '@core/utils';
function toHTML(title, date) {
    return `
    <li class="db__record">
        <a href="#">${title}</a>
        <strong>${date}</strong>
    </li>
    `;
}

function getAllKeys() {
    const keys = [];

    for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if(!key.includes('excel')) continue;

        keys.push(key);
    }
    return keys;
}

export function getAllRecords() {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
}

export function createRecordsTable() {
    const keys = getAllKeys();

    if(!keys.length) return `<p>Вы пока не создали ни одной таблицы</p>`;

    return `
    <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>

    <ul class="db__list">
        ${keys.map(key => {
            const state = storage(key);
            return toHTML(state.title, state.dateView);
        }).join('')}
    </ul>
    `
}