'use strict';

import {open, close, hide, show, hasClass} from './utilities';

export default class Index {
    constructor() {
        this.accordItem = '[data-accord-item]';
        this.$accordItem = document.querySelectorAll('[data-accord-item]');

        document.querySelector('body').addEventListener('click', event => this.handlerClick(event));
    }

    handlerClick(event) {
        if (event.target.closest(this.accordItem)) {
            if (hasClass(event.target.closest(this.accordItem), '_open')) {
                close(event.target.closest(this.accordItem));
            } else {
                open(event.target.closest(this.accordItem));
            }
        }
    }
}