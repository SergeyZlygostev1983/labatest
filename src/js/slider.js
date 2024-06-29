'use strict';

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import swiperCounterNav from './swiperCounterNav';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/effect-fade';

export default class Slider {
	constructor() {
	    Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);
		// const self = this;
		this.swipers = {};
		this.blogImagesSwiper = document.querySelectorAll('.swiper-container-post');
		this.latheImagesSwiper = document.querySelectorAll('.swiper-container-lathe');

		this.init();
	}

	init() {
		// слайдер картинок услуг на главной
		const serviceSlider = new Swiper('[data-service-gallery-container]', {
            effect: 'fade',
            speed: 1500,
            fadeEffect: {
                crossFade: true
            },
	        slidesPerView: 1,
	        spaceBetween: 0,
	        loop: true,
            autoplay: {
                delay: 5000,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: '.service__slider__button-next',
                prevEl: '.service__slider__button-prev',
            },
	    });

		// слайдер клиентов на главной
		const clientsSlider = new Swiper('[data-clients-gallery-container]', {
	        slidesPerView: 1,
            slidesPerGroup: 1,
	        spaceBetween: 5,
	        loop: true,
            autoplay: {
                delay: 5000,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 5,
            },
            breakpoints: {
				425:{
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 10,
				},
				768:{
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 15,
				},
	        	1024:{
					slidesPerView: 5,
					slidesPerGroup: 5,
					spaceBetween: 20,
				},
	        }
	    });

		// свайпер картинок в блоге
		this.blogImagesSwiper.forEach((el, index) => {
			const options = {
				slidesPerView: 1,
				spaceBetween: 30,
			};

			if (el.querySelectorAll('swiper-slide').length > 1) {

				options.watchOverflow = true;
			}
			const swiper = new swiperCounterNav(el, options);
			this.addSwiperToCollection('numeric', index, swiper.swiper, el);
		});

		// свайпер картинок на странице станка
		this.latheImagesSwiper.forEach((el, index) => {
			const options = {
				slidesPerView: 1,
				spaceBetween: 30,
			};

			if (el.querySelectorAll('swiper-slide').length > 1) {

				options.watchOverflow = true;
			}
			const swiper = new swiperCounterNav(el, options);
			this.addSwiperToCollection('numeric', index, swiper.swiper, el);
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