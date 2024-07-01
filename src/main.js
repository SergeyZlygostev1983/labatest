'use strict';

import './scss/main.scss';
import Main from './js/main';
import Index from './js/index';
import Slider from './js/slider';
import Form from './js/form';

function ready() {
    // common scripts
    const commonScripts = new Main();

    // main page
    const mainPage = document.querySelector('.home');
    if (isNodeExist(mainPage)) {
        let index = new Index();
    }

    // form
    const forms = [];
    document.querySelectorAll('form').forEach((form) => {
        forms.push(new Form(form));
    });

    // add slider js
    const reviewsSlider = document.querySelector('[data-reviews-swiper]');
    if ( isNodeExist(reviewsSlider) ) {
        let slider = new Slider();
    }
}

document.addEventListener("DOMContentLoaded", ready);

function isNodeExist(node) {
    return (node === document.body) ? false : document.body.contains(node);
}