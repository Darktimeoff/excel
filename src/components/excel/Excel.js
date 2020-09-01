import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';
import {preventDefault} from '@core/utils';
import * as actions from '@/redux/actions';

export class Excel {
    constructor(options) {
        this.components = options.components || [];
        this.store = options.store;
        this.emitter = new Emitter();
        this.subscriber = new StoreSubscriber(this.store);
    }

    getRoot() {
        const $root = $.create('section', 'excel');
        const componentOptions = {
           emitter: this.emitter,
           store: this.store
        }

        this.components = this.components.map( Component => {
            const $el = $.create('section', Component.className);

            const component = new Component($el, componentOptions);
            $el.html(component.toHTML());
            
            
            $root.append($el);
            
            return component;
        });

        return $root;
    }

    init() {
        if(process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault);
        }

        this.store.dispatch(actions.updateDate())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init());
    }

    destroy() {
        this.subscriber.unsubscribeFromStore();
        this.components.forEach(component => component.destroy());
        document.removeEventListener('contextmenu', preventDefault)
    }
}