import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {

	constructor($root, options = {}) {
		super($root, options.listeners)
	}

	//Возращает шаблон компонета
	toHTML() {
    	return '';
	}

	init() {
		this.initDOMListener();
	}
}
