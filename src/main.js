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
    const mainPage = document.querySelector('.page-main');
    if (isNodeExist(mainPage)) {
        let index = new Index();
    }

    // form
    const forms = [];
    document.querySelectorAll('form').forEach((form) => {
        forms.push(new Form(form));
    });

    // add slider js
    const serviceSlider = document.querySelector('[data-service-gallery-container]');
    const clientsSlider = document.querySelector('[data-clients-gallery-container]');
    const rotationSlider = document.querySelector('[data-rotation-gallery-container]');
    const blogSwiper = document.querySelector('[data-swiper="numeric"]');
    if ( isNodeExist(serviceSlider) || isNodeExist(clientsSlider) || isNodeExist(rotationSlider) || isNodeExist(blogSwiper) ) {
        let slider = new Slider();
    }
}

document.addEventListener("DOMContentLoaded", ready);

function isNodeExist(node) {
    return (node === document.body) ? false : document.body.contains(node);
}