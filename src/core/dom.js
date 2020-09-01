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

    text(text) {
        if(typeof text !== 'undefined') {
            this.$el.textContent = text;
            return this;
        }

        if(this.$el.tagName === 'INPUT') {
            return this.$el.value.trim();
        }

        return this.$el.textContent.trim();
    }
    

    on(event, handler) {
        this.$el.addEventListener(event, handler);
        return this;
    }

    off(event, handler) {
        this.$el.removeEventListener(event, handler);
        return this;
    }

    attr(name, value) {
        if(value) {
            this.$el.setAttribute(name, value);
            return this;
        }
        return this.$el.getAttribute(name);
    }

    find(selector) {
        return $(this.$el.querySelector(selector));
    }

    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }

    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    }


    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s];
            return res;
        }, {});
    }

    id(parse) {
        if(parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.cellId
    }

    focus() {
        this.$el.focus()
        return this;
    }

    contains(className) {
        return this.$el.classList.contains(className);
    }

    parentElm() {
        return $(this.$el.parentElement);
    }

    nextElm() {
        return $(this.$el.nextElementSibling);
    }

    prevElm() {
        return $(this.$el.previousElementSibling);
    }

    toggleClass(className) {
        this.$el.classList.toggle(className);
        return this;
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    get computedStyle() {
        return window.getComputedStyle(this.$el)
    }

    css(styles) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        });
        return $(this.$el);
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

    get data() {
        return this.$el.dataset
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

$.isDom = ($el) => {
    return $el instanceof Dom ? true : false;
}