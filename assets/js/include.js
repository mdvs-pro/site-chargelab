jQuery(document).ready(function ($) {
	scrollNav();
});

jQuery(window).load(function () {
	mobileNav.init('.header__menu');
	owlCarousel.init();
});

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
	$('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
}

var owlCarousel = {
    
    options : {
    	left : 0, 
      top : 0, 
      radiusLimit :4,
      slides :[]
    },

    getSlides : function() {
    	var img = $('.gallery__image');
        $.each(img, function(k, v){
            owlCarousel.options.slides.push($(v).data('original'));
        });
    },

		insertSlides: function(){
				owlCarousel.getSlides();
        $.each(owlCarousel.options.slides, function( k, v ){
           $('.slides').append("<div class='slide'><div class='vcenter-parent'><div class='vcenter'><div class='slide-content'><img class='lazyOwl' data-src='" + v + "'></div></div></div></div>");
        });
    },

		toggleLightbox: function() {
        $('.owl-carousel-lightbox').toggleClass('open');
    },

		init: function() {
			$('.slides').owlCarousel({
				navigation: false,
				pagination: false,
				singleItem: true,
				lazyLoad: true,
				slideSpeed: 400,
				beforeInit: function(){
						owlCarousel.insertSlides();
				},
				afterInit: function() {
						this.jumpTo(0);
						$('.slide img').css({
								'max-height': $('.owl-carousel-lightbox').height()
						});
				},
				afterAction: function() {
						$('.slide img').css({
								'max-height': $('.owl-carousel-lightbox').height()
						});
				}
			});

			var owl = $('.slides').data('owlCarousel'); 
    
			$('.slide').on({
					mousedown: function(event) {
							owlCarousel.options.left = event.pageX;
							owlCarousel.options.top = event.pageY;
					},
					mouseup: function(event) {
							var deltaX = event.pageX - owlCarousel.options.left;
							var deltaY = event.pageY - owlCarousel.options.top;
							var euclidean = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
							
							if (euclidean < owlCarousel.options.radiusLimit) {
									if ($(event.target).hasClass('vcenter')) {
											owlCarousel.toggleLightbox();
									}
							}
					}
			});

			$('#close').on('click', function(){
					owlCarousel.toggleLightbox();
			});

			$('.gallery__image').on('click', function(e){
					e.preventDefault();
					owlCarousel.toggleLightbox();
					owl.jumpTo($(e.target).parent().index());
			});
		},




}
