(function ($, window, document) {
	// The $ is now locally scoped 
	// Listen for the jQuery ready event on the document
	$(function () {
		// on ready
		scrollNav();
		productSlider();
		showMore();
	});

	$(window).load(function () {
		// on load
		mobileNav.init('.header__menu');
		owlCarouselModal.init();
	});

	// code

	var mobileNav = {
		className: '.js_mobile-nav',
		copyClassName: '.js_mobile-nav_copy',
		mobileMenuClassName: '.mobile-nav__menu',
		activeClass: 'open',
		init: function (mainMenuClassName) {
			if (!$(this.mobileMenuClassName).children().length) {
				$(mainMenuClassName).children().clone().prependTo(this.mobileMenuClassName);
			}

			$(document).on('click', '.burger', function () {
				mobileNav.toggle();
			});
		},
		open: function () {
			$(this.className).addClass(this.activeClass);
		},
		close: function () {
			$(this.className).removeClass(this.activeClass);
		},
		toggle: function () {
			$(this.className).hasClass(this.activeClass) ? this.close() : this.open();
		}
	};

	function scrollNav() {
		//jQuery for page scrolling feature - requires jQuery Easing plugin
		$('a.page-scroll').bind('click', function (event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	}

	var owlCarouselModal = {
		options: {
			left: 0,
			top: 0,
			radiusLimit: 4,
			slides: [],
			leftHtml: '<div class="t-carousel__zoomer__control t-carousel__zoomer__control_left" data-zoomer-slide="prev">          <div class="t-carousel__zoomer__arrow__wrapper t-carousel__zoomer__arrow__wrapper_left">            <div class="t-carousel__zoomer__arrow t-carousel__zoomer__arrow_left t-carousel__zoomer__arrow_small"></div></div></div>',
			rightHtml: '<div class="t-carousel__zoomer__control t-carousel__zoomer__control_right" data-zoomer-slide="next">          <div class="t-carousel__zoomer__arrow__wrapper t-carousel__zoomer__arrow__wrapper_right">            <div class="t-carousel__zoomer__arrow t-carousel__zoomer__arrow_right t-carousel__zoomer__arrow_small"></div></div></div>'
		},

		getSlides: function () {
			var img = $('.gallery__image');
			$.each(img, function (k, v) {
				owlCarouselModal.options.slides.push($(v).data('original'));
			});
		},

		insertSlides: function () {
			owlCarouselModal.getSlides();
			$.each(owlCarouselModal.options.slides, function (k, v) {
				$('.slides').append("<div class='slide'><div class='vcenter-parent'><div class='vcenter'><div class='slide-content'><img class='lazyOwl' data-src='" + v + "'></div></div></div></div>");
			});
		},

		toggleLightbox: function () {
			$('.owl-carousel-lightbox').toggleClass('open');
		},

		init: function () {
			if (!$('.slides').length) return;

			$('.slides').owlCarousel({
				navigation: false,
				pagination: false,
				singleItem: true,
				lazyLoad: true,
				slideSpeed: 400,
				navigationText: ['&lt;', '&gt;'],
				beforeInit: function () {
					owlCarouselModal.insertSlides();
				},
				afterInit: function () {
					this.jumpTo(0);
					$('.slide img').css({
						'max-height': $('.owl-carousel-lightbox').height()
					});
				},
				afterAction: function () {
					$('.slide img').css({
						'max-height': $('.owl-carousel-lightbox').height()
					});
				}
			});

			var owl = $('.slides').data('owlCarousel');

			$('.slide').on({
				mousedown: function (event) {
					owlCarouselModal.options.left = event.pageX;
					owlCarouselModal.options.top = event.pageY;
				},
				mouseup: function (event) {
					var deltaX = event.pageX - owlCarouselModal.options.left;
					var deltaY = event.pageY - owlCarouselModal.options.top;
					var euclidean = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

					if (euclidean < owlCarouselModal.options.radiusLimit) {
						if ($(event.target).hasClass('vcenter')) {
							owlCarouselModal.toggleLightbox();
						}
					}
				}
			});

			$('#close').on('click', function () {
				owlCarouselModal.toggleLightbox();
			});

			$('.gallery__image').on('click', function (e) {
				e.preventDefault();
				owlCarouselModal.toggleLightbox();
				owl.jumpTo($(e.target).parent().index());
			});
		},
	}

	function productSlider() {
		$(".product__slider").owlCarousel({
			singleItem: true,
			lazyLoad: true,
			navigation: true,
			pagination: true,
			touchDrag: true,
			slideSpeed: 400
		});
	}

	function showMore() {
		var showMoreClass = '.js-show-more';
		var $showMore = $(showMoreClass);
		var showMoreTriggerClass = showMoreClass + '-trigger';
		var showMoreBlockClass = showMoreClass + '-block';

		if (!$showMore.length) return;
		$showMore.find(showMoreTriggerClass).on('click', function(){	
			$(this).parent().find(showMoreBlockClass).show();
		});
	}

}(window.jQuery, window, document));