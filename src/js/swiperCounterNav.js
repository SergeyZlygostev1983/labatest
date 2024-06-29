import Swiper from 'swiper';

export default class {
    constructor(el, params, init) {
        this.$el = $(el);
        if (this.$el.length === 0) return;

        this.init = typeof init === 'function' ? init : function () {};

        this.addParams = {
            init: false,
            navigation: {
                nextEl: '.swiper-control_next',
                prevEl: '.swiper-control_prev',
                disabledClass: 'swiper-control_disabled',
            },
            noSwipingClass: 'swiper-control_wrapper'
        };

        this.$current = this.$el.find('.swiper-page-counter_current');
        this.$total = this.$el.find('.swiper-page-counter_total');
        // console.log(this.$current.length);

        this.params = Object.assign(params, this.addParams);
        this.swiper = new Swiper(el, this.params);

        this.bind();
        this.swiper.init();
        this.setTotal();
    }

    bind() {
        this.swiper.on('resize', (e) => {
            this.setTotal();
        });

        this.swiper.on('slideChange', (e) => {
            var slidesPerView = this.swiper.params.slidesPerView;
            slidesPerView = slidesPerView === 'auto' ? 1 : slidesPerView;
            this.$current.html(this.swiper.activeIndex + slidesPerView);
        });

        this.swiper.on('init', () => {
            this.init(this.swiper);
        });
    }

    setTotal() {
        var slidesPerView = this.swiper.params.slidesPerView;
        slidesPerView = slidesPerView === 'auto' ? 1 : slidesPerView;

        this.$current.html(this.swiper.activeIndex + slidesPerView);
        this.$total.html(this.swiper.slides.length);
    }
}
