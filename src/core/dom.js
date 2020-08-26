class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' ? document.querySelector(selector): selector;
    }

    html(html) {
        if(typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }

        return this.$el;
    }

    on(event, handler) {
        this.$el.addEventListener(event, handler);
    }

    off(event, handler) {
        this.$el.removeEventListener(event, handler);
    }

    clear() {
        this.html('');
        return this;
    }

    append(node) {
        if(node instanceof Dom) {
            node = node.$el
        }

        if(Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }

        return this;
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName = 'div', classes = '') => {
    const $el = document.createElement(tagName);

    if(classes) {
        $el.classList.add(classes);
    }

    return $($el);
}