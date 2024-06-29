'use strict';

import {open, close, hide, show, hasClass} from './utilities';

export default class Main {
    constructor() {
        this.burgerMenu = '.header__burger';
        this.$mobileMenu = document.querySelector('.main__menu');

        this.$popup = document.querySelector('[data-popup]');
        this.popupBtn = '[data-popup-btn]';
        this.popupClose = '[data-popup-close]';
        this.popupTypes = document.querySelectorAll('[data-popup-type]');

        document.querySelector('body').addEventListener('click', event => this.handlerClick(event));
    }

    handlerClick(event) {
        if (event.target.closest(this.burgerMenu)) {
            if (hasClass(this.$mobileMenu, '_open')) {
                close(this.$mobileMenu);
            } else {
                open(this.$mobileMenu);
            }
        }

        if (event.target.closest(this.popupBtn)) {
            show(this.$popup);
            this.popupTypes.forEach(el => {
                if (el.dataset.popupType != event.target.dataset.popupBtn) {
                    hide(el);
                } else {
                    show(el)
                }
            });
        }

        if (event.target.closest(this.popupClose)) {
            let popupVideoFrame = document.querySelector('.popup__video iframe');
            hide(this.$popup);
            this.popupTypes.forEach(el => {
                hide(el);
                if (el.dataset.popupType == 'video' && popupVideoFrame != null) {
                    popupVideoFrame.remove();
                } else if (el.dataset.popupType != 'video') {
                    el.querySelector('[data-form-success-title]').textContent = '';
                    el.querySelector('[data-form-success-desc]').textContent = '';
                    show(el.querySelector('[data-form-wrapper]'));
                    hide(el.querySelector('[data-form-success-wrapper]'));
                }
            });
        }
    }
}