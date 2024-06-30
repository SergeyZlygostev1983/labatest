'use strict';

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import swiperCounterNav from './swiperCounterNav';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

export default class Slider {
	constructor() {
	    Swiper.use([Navigation, Pagination, Autoplay]);
		// const self = this;
		this.swipers = {};

		this.init();
	}

	init() {
		// слайдер картинок услуг на главной
		const reviewsSlider = new Swiper('[data-reviews-swiper]', {
            speed: 1500,
	        slidesPerView: 3,
	        spaceBetween: 32,
	        loop: true,
            autoplay: {
                delay: 5000,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: '.reviews__slider__button-next',
                prevEl: '.reviews__slider__button-prev',
            },
			pagination: {
				el: '.reviews__slider__pagination',
				type: 'bullets',
			},
	    });
	}

	addSwiperToCollection(type, idx, swiper, $container) {
        if (!this.swipers[type]) {
            this.swipers[type] = {};
        }
        this.swipers[type][idx] = swiper;
        $container.setAttribute('data-idx', idx);
    }
}