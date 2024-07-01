'use strict';

import {open, close, hide, show, hasClass} from './utilities';

export default class Main {
    constructor() {
        this.burgerMenu = '[data-menu-burger]';
        this.$body = document.querySelector('body');

        this.$body.addEventListener('click', event => this.handlerClick(event));
    }

    handlerClick(event) {
        if (event.target.closest(this.burgerMenu)) {
            if (hasClass(this.$body, 'menu__open')) {
                this.$body.classList.remove('menu__open');
            } else {
                this.$body.classList.add('menu__open');
            }
        }

        if(event.target.closest('.menu__item a')) {
            this.$body.classList.remove('menu__open');
        }
    }
}