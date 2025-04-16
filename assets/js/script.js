/*
Author       : Dreamguys
Template Name: Truelysell - Bootstrap Template
*/
(function ($) {
	"use strict";
	var $slimScrolls = $('.slimscroll');
	var $wrapper = $('.main-wrapper');

	// Sidebar Slimscroll

	if ($slimScrolls.length > 0) {
		$slimScrolls.slimScroll({
			height: 'auto',
			width: '100%',
			position: 'right',
			size: '7px',
			color: '#ccc',
			allowPageScroll: false,
			wheelStep: 10,
			touchScrollStep: 100
		});
		var wHeight = $(window).height() - 48;
		$slimScrolls.height(wHeight);
		$('.sidebar .slimScrollDiv').height(wHeight);
		$(window).resize(function () {
			var rHeight = $(window).height() - 48;
			$slimScrolls.height(rHeight);
			$('.sidebar .slimScrollDiv').height(rHeight);
		});
	}

	// Mobile menu sidebar overlay

	$('body').append('<div class="sidebar-overlay"></div>');
	$(document).on('click', '#mobile_btns', function () {
		$wrapper.toggleClass('slide-nav');
		$('.sidebar-overlay').toggleClass('opened');
		$('html').toggleClass('menu-opened');
		return false;
	});
	

	$(document).on('click', '#mobile_btn', function () {
		$wrapper.toggleClass('slide-nav');
		$('.sidebar-overlay').toggleClass('opened');
		$('html').addClass('menu-opened');
		$('#task_window').removeClass('opened');
		return false;
	});

	$(".sidebar-overlay").on("click", function () {
		$('html').removeClass('menu-opened');
		$(this).removeClass('opened');
		$wrapper.removeClass('slide-nav');
		$('.sidebar-overlay').removeClass('opened');
		$('#task_window').removeClass('opened');
	});

	// Sidebar

	if ($(window).width() <= 991) {
		var Sidemenu = function () {
			this.$menuItem = $('.main-nav a');
		};

		function init() {
			var $this = Sidemenu;
			$('.main-nav a').on('click', function (e) {
				if ($(this).parent().hasClass('has-submenu')) {
					e.preventDefault();
				}
				if (!$(this).hasClass('submenu')) {
					$('ul', $(this).parents('ul:first')).slideUp(350);
					$('a', $(this).parents('ul:first')).removeClass('submenu');
					$(this).next('ul').slideDown(350);
					$(this).addClass('submenu');
				} else if ($(this).hasClass('submenu')) {
					$(this).removeClass('submenu');
					$(this).next('ul').slideUp(350);
				}
			});
		}

		// Sidebar Initiate
		init();
	}

	// Sticky Header
	$(window).scroll(function () {
		var sticky = $('.header'),
			scroll = $(window).scrollTop();
		if (scroll >= 50) sticky.addClass('fixed');
		else sticky.removeClass('fixed');
	});


	$(document).on('click', '.sidebar-overlay', function () {
		$('html').removeClass('menu-opened');
		$(this).removeClass('opened');
		$('main-wrapper').removeClass('slide-nav');
		$('#task_window').removeClass('opened');
	});

	$(document).on('click', '#menu_close', function () {
		$('html').removeClass('menu-opened');
		$('.sidebar-overlay').removeClass('opened');
		$('main-wrapper').removeClass('slide-nav');
	});

	// Small Sidebar

	//toggle_btn
	$(document).on('click', '#toggle_btn', function () {
		if ($('body').hasClass('mini-sidebar')) {
			$('body').removeClass('mini-sidebar');
			$(this).addClass('active');
			$('.subdrop + ul');
			localStorage.setItem('screenModeNightTokenState', 'night');
			setTimeout(function () {
				$("body").removeClass("mini-sidebar");
				$(".header-left").addClass("active");
			}, 100);
		} else {
			$('body').addClass('mini-sidebar');
			$(this).removeClass('active');
			$('.subdrop + ul');
			localStorage.removeItem('screenModeNightTokenState', 'night');
			setTimeout(function () {
				$("body").addClass("mini-sidebar");
				$(".header-left").removeClass("active");
			}, 100);
		}
		return false;
	});

	function initi() {
		var $this = Sidemenu;
		$('#sidebar-menu a').on('click', function (e) {
			if ($(this).parent().hasClass('submenu')) {
				e.preventDefault();
			}
			if (!$(this).hasClass('subdrop')) {
				$('ul', $(this).parents('ul:first')).slideUp(350);
				$('a', $(this).parents('ul:first')).removeClass('subdrop');
				$(this).next('ul').slideDown(350);
				$(this).addClass('subdrop');
			} else if ($(this).hasClass('subdrop')) {
				$(this).removeClass('subdrop');
				$(this).next('ul').slideUp(350);
			}
		});
		$('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
	} initi();


	// Sidebar Initiate
	$(document).on('mouseover', function (e) {
		e.stopPropagation();
		if ($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
			var targ = $(e.target).closest('.sidebar, .header-left').length;
			if (targ) {
				$('body').addClass('expand-menu');
				$('.subdrop + ul').slideDown();
			} else {
				$('body').removeClass('expand-menu');
				$('.subdrop + ul').slideUp();
			}
			return false;
		}
	});

	// Chat sidebar overlay

	if ($(window).width() <= 1199) {
		if ($('#task_chat').length > 0) {
			$(document).on('click', '#task_chat', function () {
				$('.sidebar-overlay').toggleClass('opened');
				$('#task_window').addClass('opened');
				return false;
			});
		}
	}

	$(".chat-profile-open").on("click", function () {
		$('.chat-window-long').toggleClass('window-full-width');
	});

	$(document).on('click', '#filter_search', function () {
		$('#filter_inputs').slideToggle("slow");
	});

})(jQuery);
$(document).ready(function () {

	// Sidebar Toggle Js
	$(".offcanvas-close,.offcanvas-overlay").on("click", function () {
		$(".offcanvas-info").removeClass("show");
		$(".offcanvas-overlay").removeClass("overlay-open");
	});
	$(".sidebar-menu").on("click", function () {
		$(".offcanvas-info").addClass("show");
		$(".offcanvas-overlay").addClass("overlay-open");
	});

	if ($('#data-table').length > 0) {
		$('#data-table').DataTable({
			"language": {
				search: ' ',
				searchPlaceholder: "Search...",
				info: "_START_ - _END_ of _TOTAL_",
				paginate: {
					next: 'Next <i class="fas fa-chevron-right ms-2"></i>',
					previous: '<i class="fas fa-chevron-left me-2"></i> Previous'

				}
			},
			"bFilter": false,
			initComplete: (settings, json) => {
				$('.dataTables_length').appendTo('#tablelength');
				$('.dataTables_paginate').appendTo('#tablepagination');
				$('.dataTables_info').appendTo('#tableinfo');
			},

		});
	}

	// Body Overlay Js
	$(".body-overlay").on("click", function () {
		$(".offcanvas__area").removeClass("offcanvas-opened");
		$(".df-search-area").removeClass("opened");;
		$(".body-overlay").removeClass("opened");
	});

	// Sticky Header

	$(window).scroll(function () {
		if ($(this).scrollTop() > 200) {
			$("header").addClass("fixed");
		} else {
			$("header").removeClass("fixed");
		}
	});

	if ($('.wow').length > 0) {
		new WOW().init();
	}

	// Fav Icon

	if ($('.fav-icon').length > 0) {
		$(".fav-icon").on("click", function () {
			$(this).toggleClass('selected');
		});
	}

	// Booking Select

	if ($('.select-item').length > 0) {
		$(".select-item").on("click", function () {
			$('.select-item').removeClass('selected');
			$(this).toggleClass('selected');
		});
	}

	if ($('.location-card').length > 0) {
		$(".location-card").on("click", function () {
			$('.location-card').removeClass('selected');
			$(this).toggleClass('selected');
		});
	}

	if ($('.staff-card').length > 0) {
		$(".staff-card").on("click", function () {
			$('.staff-card').removeClass('selected');
			$(this).toggleClass('selected');
		});
	}

	if ($('.time-item').length > 0) {
		$(".time-item").on("click", function () {
			$('.time-item').removeClass('selected');
			$(this).toggleClass('selected');
		});
	}

	// Add

	if ($('.btn-addon').length > 0) {
		$('.btn-addon').on('click', function (e) {
			$(this).addClass("active");
			$(this).text("Added");
			$(this).prepend("<i class='feather-check-circle me-1'></i>");
		});
	}
	//Owl Carousel
	if ($('.providers-slider').length > 0) {
		$('.providers-slider').owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			navText: [
				'<i class="ti ti-chevron-left"></i>',
				'<i class="ti ti-chevron-right"></i>'
			],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 3
				},
				1000: {
					items: 4
				}
			}
		})
	}

	// Service slider
	if ($('.owl-carousel.feature-service-five-slider').length > 0) {
		$('.owl-carousel.feature-service-five-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			navText: ["<i class='fa-solid fa-angle-left'></i>", "<i class='fa-solid fa-angle-right'></i>"],
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 1
				},
				700: {
					items: 2
				},
				1200: {
					items: 3
				},
				1400: {
					items: 3
				}
			}
		})
	}

	// Service Slider

	if ($('.service-slider').length > 0) {
		$('.service-slider').owlCarousel({
			loop: false,
			margin: 24,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			autoplay: false,
			navText: [
				'<i class="fa-solid fa-arrow-left"></i>',
				'<i class="fa-solid fa-arrow-right"></i>'
			],
			responsive: {
				0: {
					items: 1
				},
				550: {
					items: 1
				},
				768: {
					items: 2
				},
				992: {
					items: 3
				},
				1200: {
					items: 3
				}
			}
		})
	}

	if ($('.say-about.slider-for').length > 0) {
		$('.say-about.slider-for').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.client-img.slider-nav'
		});
	}
	
	if ($('.client-img.slider-nav').length > 0) {
		$('.client-img.slider-nav').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.say-about.slider-for',
			dots: false,
			arrows: false,
			centerMode: true,
			focusOnSelect: true

		});
	}

	// latest-slider
	if ($('.owl-carousel.latest-slider').length > 0) {
		$('.owl-carousel.latest-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 2
				},
				700: {
					items: 3
				},
				1200: {
					items: 4
				},
				1400: {
					items: 4
				}
			}
		})
	}

	// services-slider
	if ($('.owl-carousel.stylists-slider').length > 0) {
		$('.owl-carousel.stylists-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 1
				},
				700: {
					items: 2
				},
				1200: {
					items: 4
				},
				1400: {
					items: 4
				}
			}
		})
	}

	// Service slider 
	if ($('.owl-carousel.partners-slider').length > 0) {
		$('.owl-carousel.partners-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: false,
			dots: false,
			smartSpeed: 2000,
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 2
				},
				700: {
					items: 3
				},
				1200: {
					items: 5
				},
				1400: {
					items: 5
				}
			}
		})
	}

	//Home slider
	if ($('.banner-slider').length > 0) {
		$('.banner-slider').slick({
			dots: false,
			autoplay: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			responsive: [{
				breakpoint: 992,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 776,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 567,
				settings: {
					slidesToShow: 1
				}
			}]
		});
	}

	$(".top-close").on('click', function () {
		$(this).closest('.top-bar').slideUp(500);
		return false;
	});

	// Popular Service slider
	if ($('.owl-carousel.popular-slider').length > 0) {
		$('.owl-carousel.popular-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			navText: ["<i class='fa-solid fa-angle-left'></i>", "<i class='fa-solid fa-angle-right'></i>"],
			navContainer: '.mynav1',
			responsive: {
				0: {
					items: 1
				},
				550: {
					items: 2
				},
				700: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		})
	}

	// Popular Service slider
	if ($('.popular-slider-3').length > 0) {
		$('.popular-slider-3').owlCarousel({
			loop: false,
			margin: 24,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			navText: ["<i class='fa-solid fa-angle-left'></i>", "<i class='fa-solid fa-angle-right'></i>"],
			responsive: {
				0: {
					items: 1
				},
				550: {
					items: 2
				},
				700: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		})
	}

	// Service slider
	if ($('.owl-carousel.car-testimonials-five-slider').length > 0) {
		$('.owl-carousel.car-testimonials-five-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			navText: ["<i class='fa-solid fa-angle-left'></i>", "<i class='fa-solid fa-angle-right'></i>"],
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 1
				},
				700: {
					items: 1
				},
				1000: {
					items: 1
				}
			}
		})
	}

	// Service slider
	if ($('.owl-carousel.partners-five-slider').length > 0) {
		$('.owl-carousel.partners-five-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: false,
			dots: false,
			autoplay: true,
			smartSpeed: 2000,
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 2
				},
				700: {
					items: 3
				},
				1200: {
					items: 5
				},
				1400: {
					items: 5
				}
			}
		})
	}

	// Service slider
	if ($('.owl-carousel.car-blog-slider').length > 0) {
		$('.owl-carousel.car-blog-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			navText: ["<i class='fa-solid fa-angle-left'></i>", "<i class='fa-solid fa-angle-right'></i>"],
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 2
				},
				700: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		})
	}

	// Popular Service slider -02
	if ($('.owl-carousel.popular-slider-2').length > 0) {
		$('.owl-carousel.popular-slider-2').owlCarousel({
			loop: true,
			margin: 24,
			nav: false,
			dots: true,
			smartSpeed: 2000,
			navText: ["<i class='fa-solid fa-angle-left'></i>", "<i class='fa-solid fa-angle-right'></i>"],
			navContainer: '.mynav1',
			responsive: {
				0: {
					items: 1,
				},
				550: {
					items: 2,
				},
				700: {
					items: 2,
				},
				1000: {
					items: 3,
				}
			}
		})
	}

	// Service slider
	if ($('.owl-carousel.top-providers-five').length > 0) {
		$('.owl-carousel.top-providers-five').owlCarousel({
			loop: true,
			margin: 24,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			navText: ["<i class='fa-solid fa-angle-left'></i>", "<i class='fa-solid fa-angle-right'></i>"],
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 1
				},
				700: {
					items: 3
				},
				1200: {
					items: 4
				},
				1400: {
					items: 4
				}
			}
		})
	}

	//Feature Carousel

	if ($('.feature-slider').length > 0) {
		$('.feature-slider').owlCarousel({
			loop: false,
			margin: 24,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			autoplay: false,
			navText: [
				'<i class="fa-solid fa-arrow-left"></i>',
				'<i class="fa-solid fa-arrow-right"></i>'
			],
			responsive: {
				0: {
					items: 1
				},
				550: {
					items: 1
				},
				768: {
					items: 2
				},
				1000: {
					items: 4
				}
			}
		})
	}

	//Card Image Carousel

	if ($('.img-slider').length > 0) {
		$('.img-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: true,
			dots: true,
			smartSpeed: 2000,
			autoplay: false,
			navText: [
				'<i class="fa-solid fa-chevron-left"></i>',
				'<i class="fa-solid fa-chevron-right"></i>'
			],
			responsive: {
				0: {
					items: 1
				},
				550: {
					items: 1
				},
				768: {
					items: 1
				},
				1000: {
					items: 1
				}
			}
		})
	}
	//catering-slider

	if ($('.catering-slider').length > 0) {
		$('.catering-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: false,
			dots: true,
			smartSpeed: 2000,
			autoplay: false,
			navText: [
				'<i class="fa-solid fa-chevron-left"></i>',
				'<i class="fa-solid fa-chevron-right"></i>'
			],
			responsive: {
				0: {
					items: 1
				},
				550: {
					items: 2
				},
				768: {
					items: 3
				},
				1000: {
					items: 4
				}
			}
		})
	}

	// Testimonial slider
	if ($('.testimonial-slider').length > 0) {
		$('.testimonial-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			navText: ["<i class='ti ti-chevron-left'></i>", "<i class='ti ti-chevron-right'></i>"],
			responsive: {
				0: {
					items: 1
				},
				992: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		})
	}

	// Testimonial slider
	if ($('.testimonial-slider-3').length > 0) {
		$('.testimonial-slider-3').owlCarousel({
			loop: true,
			margin: 24,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			navText: ["<i class='ti ti-chevron-left'></i>", "<i class='ti ti-chevron-right'></i>"],
			responsive: {
				0: {
					items: 1
				},
				992: {
					items: 2
				},
				1000: {
					items: 2
				}
			}
		})
	}

	// Testimonial slider-02
	if ($('.testimonial-slider2').length > 0) {
		$('.testimonial-slider2').owlCarousel({
			loop: true,
			margin: 24,
			nav: false,
			dots: false,
			smartSpeed: 2000,
			navText: ["<i class='ti ti-chevron-left'></i>", "<i class='ti ti-chevron-right'></i>"],
			responsive: {
				0: {
					items: 1
				},
				700: {
					items: 4
				},
				1000: {
					items: 5
				}
			}
		})
	}
	// Blog Slider

	if ($('.blog-slider').length > 0) {
		$('.blog-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			autoplay: false,
			navText: [
				'<i class="fa-solid fa-arrow-left"></i>',
				'<i class="fa-solid fa-arrow-right"></i>'
			],
			responsive: {
				0: {
					items: 1
				},
				550: {
					items: 1
				},
				768: {
					items: 2
				},
				992: {
					items: 3
				},
				1200: {
					items: 4
				}
			}
		})
	}

	// Gallery Slider

	if ($('.gallery-slider').length > 0) {
		$('.gallery-slider').owlCarousel({
			loop: true,
			margin: 16,
			nav: true,
			dots: false,
			smartSpeed: 2000,
			autoplay: false,
			navText: [
				'<i class="fa-solid fa-chevron-left"></i>',
				'<i class="fa-solid fa-chevron-right"></i>'
			],
			responsive: {
				0: {
					items: 2
				},
				550: {
					items: 4
				},
				992: {
					items: 4
				},
				1200: {
					items: 5
				},
				1400: {
					items: 6
				}
			}
		})
	}

	// Service Slider

	if ($('.service-carousel').length > 0) {
		$(document).ready(function () {

			var sync1 = $("#large-img");
			var sync2 = $("#small-img");
			var slidesPerPage = 5; // Number of thumbnails per page
			var syncedSecondary = true;

			sync1.owlCarousel({
				items: 1,
				slideSpeed: 2000,
				nav: true,
				autoplay: false,
				dots: false,
				loop: true,
				navText: [
					'<i class="fa-solid fa-chevron-left"></i>',
					'<i class="fa-solid fa-chevron-right"></i>'
				],
				responsiveRefreshRate: 200,
			}).on('changed.owl.carousel', syncPosition);

			sync2.owlCarousel({
				items: slidesPerPage,
				dots: false,
				nav: true,
				margin: 10,
				smartSpeed: 1000,
				slideSpeed: 500,
				slideBy: slidesPerPage,
				responsiveRefreshRate: 100,
				navText: [
					'<i class="fa-solid fa-chevron-left"></i>',
					'<i class="fa-solid fa-chevron-right"></i>'
				],
			}).on('initialized.owl.carousel', function () {
				sync2.find(".owl-item").eq(0).addClass("current");
			}).on('changed.owl.carousel', syncPosition2);

			function syncPosition(el) {
				var count = el.item.count - 1;
				var current = Math.round(el.item.index - (el.item.count / 2) - .5);

				if (current < 0) {
					current = count;
				}
				if (current > count) {
					current = 0;
				}

				sync2
					.find(".owl-item")
					.removeClass("current")
					.eq(current)
					.addClass("current");

				var onscreen = sync2.find('.owl-item.active').length - 1;
				var start = sync2.find('.owl-item.active').first().index();
				var end = sync2.find('.owl-item.active').last().index();

				if (current > end) {
					sync2.data('owl.carousel').to(current, 100, true);
				}
				if (current < start) {
					sync2.data('owl.carousel').to(current - onscreen, 100, true);
				}
			}

			function syncPosition2(el) {
				if (syncedSecondary) {
					var number = el.item.index;
					sync1.data('owl.carousel').to(number, 100, true);
				}
			}

			sync2.on("click", ".owl-item", function (e) {
				e.preventDefault();
				var number = $(this).index();
				sync1.data('owl.carousel').to(number, 300, true);
			});
		});
	}

	// Vertical Slider

	if ($('.vertical-slider').length > 0) {
		$('.slider-for').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.slider-nav'
		});
		$('.slider-nav').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			vertical: true,
			asNavFor: '.slider-for',
			dots: false,
			arrows: true,
			focusOnSelect: true,
			verticalSwiping: true,
			prevArrow: "<span class='slick-next'><i class='fa-solid fa-chevron-down'></i></span>",
			nextArrow: "<span class='slick-prev'><i class='fa-solid fa-chevron-up'></i></span>",
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 768,
				},
				{
					breakpoint: 580,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 0,
					settings: {
						vertical: false,
						slidesToShow: 1,
					}
				}
			]
		});
	}


	// Radio active

	if ($('.form-radio').length > 0) {
		$('.form-radio').on('click', function (e) {
			e.preventDefault();
			var radioButton = $(this).find('input[type="radio"]');
			var groupName = radioButton.attr('name');
			$('.form-radio').each(function () {
				var currentRadioButton = $(this).find('input[type="radio"]');
				if (currentRadioButton.attr('name') === groupName) {
					$(this).removeClass('active');
					currentRadioButton.prop('checked', false);
				}
			});

			$(this).addClass('active');
			radioButton.prop('checked', true);
		});
	}

	if ($('.group-radio').length > 0) {
		$('.group-radio .form-check').on('click', function (e) {
			e.preventDefault();
			var radioButton = $(this).find('input[type="radio"]');
			var groupName = radioButton.attr('name');
			$('.group-radio').each(function () {
				var currentRadioButton = $(this).find('input[type="radio"]');
				if (currentRadioButton.attr('name') === groupName) {
					currentRadioButton.prop('checked', false);
				}
			});
			radioButton.prop('checked', true);
		});
	}

	// Checkbox Active

	if ($('.form-checkbox').length > 0) {
		$('.form-checkbox').on('click', function (e) {
			e.stopPropagation();
			$(this).toggleClass('active');
			var checkbox = $(this).find('input[type="checkbox"]');
			checkbox.prop('checked', !checkbox.prop('checked'));
		});

		// Click event specifically for the checkbox input
		$('.form-checkbox input[type="checkbox"]').on('click', function (e) {
			$(this).closest('.form-checkbox').toggleClass('active');
			var checkbox = $(this).find('input[type="checkbox"]');
			checkbox.prop('checked', !checkbox.prop('checked'));
		});
	}

	// Checkbox Active

	if ($('.payment-item').length > 0) {
		$('.payment-item').on('click', function (e) {
			e.preventDefault();
			var radioButton = $(this).find('input[type="radio"]');
			var groupName = radioButton.attr('name');
			$('.payment-item').each(function () {
				var currentRadioButton = $(this).find('input[type="radio"]');
				if (currentRadioButton.attr('name') === groupName) {
					$(this).removeClass('active');
					currentRadioButton.prop('checked', false);
				}
			});

			$(this).addClass('active');
			radioButton.prop('checked', true);

			// Toggle 'active' class on #btn based on the checked state of the radio button
			if (radioButton.prop('checked')) {
				$('#pay-btn').addClass('active');
			} else {
				$('#pay-btn').removeClass('active');
			}
		});
	}

	// Scroll Top

	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		if (scroll >= 500) {
			$(".back-to-top-icon").addClass("show");
		} else {
			$(".back-to-top-icon").removeClass("show");
		}
	});

	// More btn

	$('.more-btn').on('click', function () {
		var text = $('.more-text');
		var btn = $(this);

		if (text.hasClass('expanded')) {
			text.removeClass('expanded');
			btn.text('Read More');
		} else {
			text.addClass('expanded');
			btn.text('Read Less');
		}
	});

	
	// Service slider
	if ($('.owl-carousel.customer-review-slider').length > 0) {
		$('.owl-carousel.customer-review-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: false,
			dots: true,
			smartSpeed: 2000,
			navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 1
				},
				700: {
					items: 1
				},
				1000: {
					items: 1
				}
			}
		})
	}

	// Service slider
	if ($('.owl-carousel.service-nine-slider').length > 0) {
		$('.owl-carousel.service-nine-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: false,
			dots: true,
			smartSpeed: 2000,
			navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
			dotsContainer: '.slidernav',
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 2
				},
				700: {
					items: 2
				},
				1200: {
					items: 4
				},
				1400: {
					items: 4
				}
			}
		})
	}

	// Service slider
	if ($('.owl-carousel.additional-slider').length > 0) {
		$('.owl-carousel.additional-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: false,
			dots: true,
			smartSpeed: 2000,
			navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
			dotsContainer: '.slidernav1',
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 2
				},
				700: {
					items: 2
				},
				1200: {
					items: 4
				},
				1400: {
					items: 4
				}
			}
		})
	}

	// Blogs slider
	if ($('.owl-carousel.blogs-nine-slider').length > 0) {
		$('.owl-carousel.blogs-nine-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: false,
			dots: true,
			smartSpeed: 2000,
			navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
			dotsContainer: '.slidernav2',
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 2
				},
				700: {
					items: 2
				},
				1200: {
					items: 3
				},
				1400: {
					items: 3
				}
			}
		})
	}

	// Provider slider
	if ($('.owl-carousel.provider-nine-slider').length > 0) {
		$('.owl-carousel.provider-nine-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: false,
			dots: true,
			smartSpeed: 2000,
			navText: ["<i class='fa-solid fa-angle-left'></i>", "<i class='fa-solid fa-angle-right'></i>"],
			dotsContainer: '.slidernav3',
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 2
				},
				700: {
					items: 3
				},
				1200: {
					items: 4
				},
				1400: {
					items: 4
				}
			}
		})
	}

	// Provider slider
	if ($('.owl-carousel.provider-nine-slider2').length > 0) {
		$('.owl-carousel.provider-nine-slider2').owlCarousel({
			loop: true,
			margin: 24,
			nav: false,
			dots: true,
			smartSpeed: 2000,
			navText: ["<i class='fa-solid fa-angle-left'></i>", "<i class='fa-solid fa-angle-right'></i>"],
			dotsContainer: '.slidernav4',
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 2
				},
				700: {
					items: 3
				},
				1200: {
					items: 4
				},
				1400: {
					items: 4
				}
			}
		})
	}

	// Quote-slider
	if ($('.owl-carousel.quote-slider').length > 0) {
		$('.owl-carousel.quote-slider').owlCarousel({
			loop: true,
			margin: 24,
			nav: false,
			dots: false,
			smartSpeed: 2000,
			autoplay:true,
			responsive: {
				0: {
					items: 1
				},

				550: {
					items: 2
				},
				700: {
					items: 3
				},
				1200: {
					items: 5
				},
				1400: {
					items: 5
				}
			}
		})
	}

});
// Provider Wizard

$(document).ready(function () {
	/*---------------------------------------------------------*/
	$(".wizard-fieldset #first-field .next_btn").on('click', function () {
		$('#providerwizard .active').removeClass('active').addClass('active').next().addClass('');
	});
	$(".wizard-fieldset .next_btn").on('click', function () { // Function Runs On NEXT Button Click
		$(this).closest('fieldset').next().fadeIn('slow');
		$(this).closest('fieldset').css({
			'display': 'none'
		});

		$.fn.hasId = function (id) {
			return this.closest('#' + id).length > 0;
		};
		// Adding Class Active To Show Steps Forward;
		if ($(this).hasId('first-field')) {
			$('#providerwizard .active').addClass('active');
		}
		else {
			$('#providerwizard .active').removeClass('active').addClass('activated').next().addClass('active');
		}
	});
	$(".wizard-fieldset .prev_btn").on('click', function () { // Function Runs On NEXT Button Click
		$(this).closest('fieldset').prev().fadeIn('slow');
		$(this).closest('fieldset').css({
			'display': 'none'
		});
		// Adding Class Active To Show Steps Forward;

		if ($(this).closest('.second-field').length) {
			$(this).closest('.wizard-fieldset').find('#providerwizard li:first-child').addClass('active');
		}
		else {
			$('#providerwizard .active').removeClass('active').prev().removeClass('activated').addClass('active');
		}

	});
});

// Provider Wizard

$(document).ready(function () {
	if ($('.progress-fieldset').length > 0) {
		let currentStep = 0;
		const totalSteps = $(".progress-fieldset fieldset").length; // Assuming each fieldset represents a step
		const progressBar = $(".progress-bar"); // Your progress bar element

		// Function to update the progress bar based on the current step
		function updateProgress() {
			const percent = (currentStep / (totalSteps - 1)) * 100;
			progressBar.css('width', percent + "%");
		}

		// NEXT Button Click
		$(".progress-fieldset .next_btn").on('click', function () {
			if (currentStep < totalSteps - 1) {
				currentStep++;
				$(this).closest('fieldset').next().fadeIn('slow');
				$(this).closest('fieldset').css('display', 'none');
				updateProgress();
			}
		});

		// PREVIOUS Button Click
		$(".progress-fieldset .prev_btn").on('click', function () {
			if (currentStep > 0) {
				currentStep--;
				$(this).closest('fieldset').prev().fadeIn('slow');
				$(this).closest('fieldset').css('display', 'none');
				updateProgress();
			}
		});

		// Initialize progress on page load
		updateProgress();
	}

	if ($('.fieldset-wizard').length > 0) {
		$(".fieldset-wizard .next_btn").on('click', function () { // Function Runs On NEXT Button Click
			$(this).closest('fieldset').next().fadeIn('slow').css({ 'display': 'flex' });
			$(this).closest('fieldset').css({
				'display': 'none'
			});
			// Adding Class Active To Show Steps Forward;
			$('.wizard-progress .active').removeClass('active').addClass('activated').next().addClass('active');


		});
		$(".fieldset-wizard .prev_btn").on('click', function () { // Function Runs On NEXT Button Click
			$(this).closest('fieldset').prev().fadeIn('slow').css({ 'display': 'flex' });
			$(this).closest('fieldset').css({
				'display': 'none'
			});
			// Adding Class Active To Show Steps Forward;
			$('.wizard-progress .active').removeClass('active').prev().removeClass('activated').addClass('active');


		});
	}
});

// Datetimepicker
if ($('.datepic').length > 0) {
	$('.datepic').datetimepicker({
		format: 'DD-MM-YYYY',
		keepOpen: true, inline: true,
		inline:true,
		icons: {
			up: "fas fa-angle-up",
			down: "fas fa-angle-down",
			next: 'fas fa-angle-right',
			previous: 'fas fa-angle-left'
		}
	});
}

// Select 2
if ($('.select').length > 0) {
	$('.select').select2({
		minimumResultsForSearch: -1,
		width: '100%'
	});
}

// Create Service Wizard

$(document).ready(function () {
	/*---------------------------------------------------------*/
	$(".service-inform-fieldset .next_btn").on('click', function () { // Function Runs On NEXT Button Click
		$(this).closest('fieldset').next().fadeIn('slow');
		$(this).closest('fieldset').css({
			'display': 'none'
		});
		// Adding Class Active To Show Steps Forward;
		$('#progressbar .active').removeClass('active').addClass('activated').next().addClass('active');


	});
	$(".service-inform-fieldset .prev_btn").on('click', function () { // Function Runs On NEXT Button Click
		$(this).closest('fieldset').prev().fadeIn('slow');
		$(this).closest('fieldset').css({
			'display': 'none'
		});
		// Adding Class Active To Show Steps Forward;
		$('#progressbar .active').removeClass('active').prev().removeClass('activated').addClass('active');


	});
});

// Edit Availability
$(document).ready(function () {
	/*---------------------------------------------------------*/
	$("#edit-availability .next_btn").on('click', function () { // Function Runs On NEXT Button Click
		$(this).closest('fieldset').next().fadeIn('slow');
		$(this).closest('fieldset').css({
			'display': 'none'
		});
		// Adding Class Active To Show Steps Forward;
		$('#progress-list .active').removeClass('active').addClass('activated').next().addClass('active');


	});
	$("#edit-availability .prev_btn").on('click', function () { // Function Runs On NEXT Button Click
		$(this).closest('fieldset').prev().fadeIn('slow');
		$(this).closest('fieldset').css({
			'display': 'none'
		});
		// Adding Class Active To Show Steps Forward;
		$('#progress-list .active').removeClass('active').prev().removeClass('activated').addClass('active');


	});
});

// Multiple Image

if ($('.multiple-img').length > 0) {
	function formatState(state) {
		if (!state.id) { return state.text; }
		var $state = $(
			'<span><img src="' + $(state.element).attr('data-image') + '" class="tag-avatar rounded me-1" / " width="14px"> ' + state.text + '</span>'
		);
		return $state;
	};
	$('.multiple-img').select2({
		minimumResultsForSearch: Infinity,
		templateResult: formatState,
		templateSelection: formatState
	});
}

// Select Image

if ($('.select-img').length > 0) {
	function formatState(state) {
		if (!state.id) { return state.text; }
		var $state = $(
			'<span><img src="' + $(state.element).attr('data-image') + '" class="img-flag" / " width="16px"> ' + state.text + '</span>'
		);
		return $state;
	};
	$('.select-img').select2({
		minimumResultsForSearch: Infinity,
		templateResult: formatState,
		templateSelection: formatState
	});
}

// Add Service Information

$(".add-extra").on('click', function () {

	var servicecontent = '<div class="row extra-title-row">' +
		'<div class="col-md-12">' +
		'<div class="mb-3">' +
		'<label class="form-label">Title <span class="text-danger"> *</span></label>' +
		'<div class="d-flex align-items-center">' +
		'<input type="text" class="form-control">' +
		'<a href="#" class="text-primary d-inline-flex align-items-center text-danger delete-item ms-4"><i class="ti ti-trash"></i></a>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>';

	$(".addtitle-info").append(servicecontent);
	return false;
});

$(".addtitle-info").on('click', '.delete-item', function () {
	$(this).closest('.extra-title-row').remove();
	return false;
});

$(".add-extra2").on('click', function () {

	var servicecontent = '<div class="row addservice-info-row">' +
		'<div class="col-xl-5">' +
		'<div class="d-flex align-items-center mb-3">' +
		'<div class="file-upload service-file-upload d-flex align-items-center justify-content-center flex-column me-4">' +
		'<i class="ti ti-photo"></i>' +
		'<input type="file" accept="video/image">' +
		'</div>' +
		'<div class="mb-3 flex-fill">' +
		'<label class="form-label">Name  <span class="text-danger"> *</span></label>' +
		'<input type="text" class="form-control">' +
		'</div>' +
		'</div>' +
		'</div>' +
		'<div class="col-xl-3">' +
		'<div class="mb-3">' +
		'<label class="form-label">Price <span class="text-danger"> *</span></label>' +
		'<input type="text" class="form-control">' +
		'</div>' +
		'</div>' +
		'<div class="col-xl-4">' +
		'<div class="mb-3">' +
		'<label class="form-label">Duration <span class="text-danger"> *</span></label>' +
		'<div class="d-flex align-items-center">' +
		'<input type="text" class="form-control">' +
		'<a href="#" class="text-primary d-inline-flex align-items-center text-danger delete-item ms-4"><i class="ti ti-trash"></i></a>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>';

	$(".addservice-info").append(servicecontent);
	return false;
});

$(".addservice-info").on('click', '.delete-item', function () {
	$(this).closest('.addservice-info-row').remove();
	return false;
});


$(".add-extra-faq").on('click', function () {

	var servicecontent = '<div class="row add-faq-row">' +
		'<div class="col-md-6">' +
		'<div class="mb-3">' +
		'<label class="form-label">Question </label>' +
		'<input type="text" class="form-control">' +
		'</div>' +
		'</div>' +
		'<div class="col-md-6">' +
		'<div class="mb-3">' +
		'<label class="form-label">Answer </label>' +
		'<div class="d-flex align-items-center">' +
		'<input type="text" class="form-control">' +
		'<a href="#" class="text-primary d-inline-flex align-items-center text-danger delete-item ms-4"><i class="ti ti-trash"></i></a>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>';

	$(".add-faq-info").append(servicecontent);
	return false;
});

$(".add-faq-info").on('click', '.delete-item', function () {
	$(this).closest('.add-faq-row').remove();
	return false;
});
// Remove Gallery
$(document).on("click", ".trash-top", function () {
	$(this).parent().hide();
});
// Ck Editor

if ($('.ck-editor').length > 0) {
	ClassicEditor
		.create(document.querySelector('.ck-editor'), {
			toolbar: {
				items: [
					'heading', '|',
					'fontfamily', 'fontsize', '|',
					'alignment', '|',
					'fontColor', 'fontBackgroundColor', '|',
					'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
					'link', '|',
					'outdent', 'indent', '|',
					'bulletedList', 'numberedList', 'todoList', '|',
					'code', 'codeBlock', '|',
					'insertTable', '|',
					'uploadImage', 'blockQuote', '|',
					'undo', 'redo'
				],
				shouldNotGroupWhenFull: true
			}
		})
		.then(editor => {
			window.editor = editor;
		})
		.catch(err => {
			console.error(err.stack);
		});
}
if ($('#more').length > 0) {
	const button = document.getElementById('more');
	const container = document.getElementById('fill-more');

	let isLess = true;

	function viewMoreLess() {
		if (isLess) {
			isLess = false;
			container.style.height = 'auto';
			button.innerHTML = "View less <i class='ti ti-chevron-up ms-1'>";
		} else {
			isLess = true;
			container.style.height = '150px';
			button.innerHTML = "View more <i class='ti ti-chevron-down ms-1'></i>";
		}
	}

	button.addEventListener('click', viewMoreLess);
}







jQuery(document).ready(function ($) {
	if (window != window.top) {
		window.top.location.href = window.location.href;
	}
});


// Custom Country Code Selector

if ($('#phone').length > 0) {
	var input = document.querySelector("#phone");
	window.intlTelInput(input, {
		utilsScript: "assets/plugins/intltelinput/js/utils.js",
	});
}

if ($('#phone1').length > 0) {
	var input = document.querySelector("#phone1");
	window.intlTelInput(input, {
		utilsScript: "assets/plugins/intltelinput/js/utils.js",
	});
}

// Zoom Meet
$('#google_meet').click(function () {
	if ($(this).is(':checked')) {
		$(".google-meet-link").show();
		$(".zoom-meet-link").hide();
	} else {
		$(".google-meet-link").hide();
		$(".zoom-meet-link").show();
	}
});

$('#zoom_meet').click(function () {
	if ($(this).is(':checked')) {
		$(".google-meet-link").hide();
		$(".zoom-meet-link").show();
	} else {
		$(".google-meet-link").show();
		$(".zoom-meet-link").hide();
	}
});

// JQuery counterUp

if ($('.counter').length > 0) {
	$('.counter').counterUp({
		delay: 10,
		time: 2000
	});
	$('.counter').addClass('animated fadeInDownBig');
}

// Sticky Sidebar

if ($(window).width() > 767) {
	if ($('.theiaStickySidebar').length > 0) {
		$('.theiaStickySidebar').theiaStickySidebar({
			// Settings
			additionalMarginTop: 125
		});
	}
}

// Maximize

if ($('.win-maximize').length > 0) {
	$('.win-maximize').on('click', function (e) {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	})
}

// Area Expert

if ($('.area-expert-slider').length > 0) {
	$('.area-expert-slider').owlCarousel({
		loop: false,
		margin: 24,
		nav: false,
		dots: false,
		smartSpeed: 2000,
		autoplay: true,
		responsive: {
			0: {
				items: 1
			},
			550: {
				items: 2
			},
			768: {
				items: 4
			},
			1200: {
				items: 5
			},
			1400: {
				items: 6
			}
		}
	})
}

// services-slider
if ($('.owl-carousel.services-slider').length > 0) {
	$('.owl-carousel.services-slider').owlCarousel({
		loop: true,
		margin: 24,
		nav: true,
		dots: false,
		smartSpeed: 2000,
		navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
		responsive: {
			0: {
				items: 1
			},

			550: {
				items: 2
			},
			700: {
				items: 2
			},
			1200: {
				items: 4
			},
			1400: {
				items: 4
			}
		}
	})
}

// Our Services

if ($('.our-services-slider').length > 0) {
	$('.our-services-slider').owlCarousel({
		loop: false,
		margin: 24,
		nav: true,
		dots: false,
		smartSpeed: 2000,
		autoplay: false,
		navText: [
			'<i class="fa-solid fa-chevron-left"></i>',
			'<i class="fa-solid fa-chevron-right"></i>'
		],
		responsive: {
			0: {
				items: 1
			},
			550: {
				items: 1
			},
			768: {
				items: 2
			},
			1200: {
				items: 2
			},
			1400: {
				items: 3
			}
		}
	})
}

// Our Branches

if ($('.our-branches-slider').length > 0) {
	$('.our-branches-slider').owlCarousel({
		loop: false,
		margin: 15,
		nav: true,
		dots: false,
		smartSpeed: 2000,
		autoplay: true,
		navText: [
			'<i class="fa-solid fa-chevron-left"></i>',
			'<i class="fa-solid fa-chevron-right"></i>'
		],
		responsive: {
			0: {
				items: 1
			},
			550: {
				items: 2
			},
			768: {
				items: 3
			},
			1200: {
				items: 3
			},
			1400: {
				items: 4
			}
		}
	})
}

// Provider Gallery Slider

if ($('.provider-gallery-slider').length > 0) {
	$('.provider-gallery-slider').owlCarousel({
		loop: false,
		margin: 15,
		nav: true,
		dots: false,
		smartSpeed: 2000,
		autoplay: true,
		navText: [
			'<i class="fa-solid fa-chevron-left"></i>',
			'<i class="fa-solid fa-chevron-right"></i>'
		],
		responsive: {
			0: {
				items: 1
			},
			550: {
				items: 2
			},
			768: {
				items: 3
			},
			1200: {
				items: 3
			},
			1400: {
				items: 4
			}
		}
	})
}

// Service slider
if ($('.owl-carousel.categories-slider-seven').length > 0) {
	$('.owl-carousel.categories-slider-seven').owlCarousel({
		loop: true,
		margin: 24,
		nav: true,
		dots: true,
		smartSpeed: 2000,
		navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
		navContainer: '.mynav',
		responsive: {
			0: {
				items: 1
			},

			550: {
				items: 2
			},
			700: {
				items: 3
			},
			1200: {
				items: 4
			},
			1400: {
				items: 5
			}
		}
	})
}

// Service slider
if ($('.owl-carousel.popular-service-seven').length > 0) {
	$('.owl-carousel.popular-service-seven').owlCarousel({
		loop: true,
		margin: 24,
		nav: false,
		dots: true,
		smartSpeed: 2000,
		navText: ["<i class='fa-solid fa-angle-left'></i>", "<i class='fa-solid fa-angle-right'></i>"],
		responsive: {
			0: {
				items: 1
			},

			550: {
				items: 2
			},
			700: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	})
}

// Service slider
if ($('.owl-carousel.testimonals-eight-slider').length > 0) {
	$('.owl-carousel.testimonals-eight-slider').owlCarousel({
		loop: true,
		margin: 24,
		nav: true,
		dots: false,
		smartSpeed: 2000,
		navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
		responsive: {
			0: {
				items: 1
			},

			550: {
				items: 1
			},
			700: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	})
}

// Service slider
if ($('.owl-carousel.blog-eight-slider').length > 0) {
	$('.owl-carousel.blog-eight-slider').owlCarousel({
		loop: true,
		margin: 24,
		nav: true,
		dots: false,
		smartSpeed: 2000,
		navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
		responsive: {
			0: {
				items: 1
			},

			550: {
				items: 2
			},
			700: {
				items: 2
			},
			1200: {
				items: 3
			},
			1400: {
				items: 3
			}
		}
	})
}

// Service slider
if ($('.owl-carousel.recent-projects-seven').length > 0) {
	$('.owl-carousel.recent-projects-seven').owlCarousel({
		loop: true,
		margin: 24,
		nav: false,
		dots: true,
		smartSpeed: 2000,
		navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
		navContainer: '.mynav-seven-two',
		responsive: {
			0: {
				items: 1
			},

			550: {
				items: 2
			},
			700: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	})
}

// Service slider
if ($('.owl-carousel.top-projects-seven').length > 0) {
	$('.owl-carousel.top-projects-seven').owlCarousel({
		loop: true,
		margin: 24,
		nav: true,
		dots: true,
		smartSpeed: 2000,
		navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
		navContainer: '.mynav-seven-three',
		responsive: {
			0: {
				items: 1
			},

			550: {
				items: 2
			},
			700: {
				items: 2
			},
			1200: {
				items: 3
			},
			1400: {
				items: 4
			}
		}
	})
}

// Service slider
if ($('.owl-carousel.category-eight-slider').length > 0) {
	$('.owl-carousel.category-eight-slider').owlCarousel({
		loop: true,
		margin: 24,
		nav: true,
		dots: false,
		smartSpeed: 2000,
		navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
		responsive: {
			0: {
				items: 1
			},

			550: {
				items: 2
			},
			700: {
				items: 3
			},
			1200: {
				items: 6
			},
			1400: {
				items: 6
			}
		}
	})
}

// Service slider
if ($('.owl-carousel.professional-eight-slider').length > 0) {
	$('.owl-carousel.professional-eight-slider').owlCarousel({
		loop: true,
		margin: 24,
		nav: true,
		dots: false,
		smartSpeed: 2000,
		navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
		responsive: {
			0: {
				items: 1
			},

			550: {
				items: 1
			},
			700: {
				items: 2
			},
			1200: {
				items: 3
			},
			1400: {
				items: 4
			}
		}
	})
}

// Service slider
if ($('.owl-carousel.testimonals-seven-slider').length > 0) {
	$('.owl-carousel.testimonals-seven-slider').owlCarousel({
		loop: true,
		margin: 24,
		nav: true,
		dots: false,
		smartSpeed: 2000,
		navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
		navContainer: '.mynav-test',
		responsive: {
			0: {
				items: 1
			},

			550: {
				items: 1
			},
			700: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	})
}

// Service slider
if ($('.owl-carousel.our-recent-blog').length > 0) {
	$('.owl-carousel.our-recent-blog').owlCarousel({
		loop: true,
		margin: 24,
		nav: false,
		dots: true,
		smartSpeed: 2000,
		navText: ["<i class='fa-solid fa-angle-left'></i>", "<i class='fa-solid fa-angle-right'></i>"],
		responsive: {
			0: {
				items: 1
			},

			550: {
				items: 2
			},
			700: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	})
}

// Service slider 
if ($('.owl-carousel.partners-slider-seven').length > 0) {
	$('.owl-carousel.partners-slider-seven').owlCarousel({
		loop: true,
		margin: 24,
		nav: false,
		dots: false,
		smartSpeed: 2000,
		autoplay: true,
		responsive: {
			0: {
				items: 1
			},

			550: {
				items: 2
			},
			700: {
				items: 3
			},
			1200: {
				items: 5
			},
			1400: {
				items: 5
			}
		}
	})
}
// Calendar

if ($('#calendar').length > 0) {
	document.addEventListener('DOMContentLoaded', function () {
		var calendarEl = document.getElementById('calendar');

		var calendar = new FullCalendar.Calendar(calendarEl, {
			themeSystem: 'bootstrap5',

			headerToolbar: {
				left: 'title, prev,today next',
				//center: '',
				right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
			},
			initialDate: '2024-08-12',
			navLinks: true, // can click day/week names to navigate views
			// businessHours: true, // display business hours
			editable: true,
			selectable: true,
			events: [
				{
					title: 'Leave',
					start: '2023-11-16',
					end: '2023-11-16',
					color: '#E8E8E8',
					textColor: '#585757'
				},
				{
					title: 'Leave',
					start: '2023-11-03',
					end: '2023-11-03',
					color: '#E8E8E8',
					textColor: '#585757'
				},
				{
					title: 'Weekly Holiday',
					start: '2023-11-06',
					end: '2023-11-06',
					color: '#ff3b3b1a',
					textColor: '#E92C2C'
				},
				{
					title: 'Weekly Holiday',
					start: '2023-11-13',
					end: '2023-11-13',
					color: '#ff3b3b1a',
					textColor: '#E92C2C'
				},
				{
					title: 'Weekly Holiday',
					start: '2023-11-20',
					end: '2023-11-20',
					color: '#ff3b3b1a',
					textColor: '#E92C2C'
				},
				{
					title: 'Weekly Holiday',
					start: '2023-11-27',
					end: '2023-11-27',
					color: '#ff3b3b1a',
					textColor: '#E92C2C'
				},
			]
		});

		calendar.render();
	});
}

// Calendar Booking

if ($('#calendar-book').length > 0) {
	document.addEventListener('DOMContentLoaded', function () {
		var calendarEl = document.getElementById('calendar-book');

		var calendar = new FullCalendar.Calendar(calendarEl, {
			themeSystem: 'bootstrap5',

			headerToolbar: {
				left: 'title, prev,today next',
				//center: '',
				right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
			},
			initialDate: '2023-11-12',
			navLinks: true, // can click day/week names to navigate views
			// businessHours: true, // display business hours
			editable: true,
			selectable: true,
			events: [
				{
					title: '12:30am Laptop serv...',
					start: '2023-11-02',
					end: '2023-11-02',
					color: '#EAEBEE',
					textColor: '#242B3A',
					"className": "fc-event-title",
				},
				{
					title: '10:00am House Clean..',
					start: '2023-11-04',
					end: '2023-11-04',
					color: '#EAEBEE',
					textColor: '#242B3A',
				},
				{
					title: '11:00am Washing ...',
					start: '2023-11-05',
					end: '2023-11-05',
					color: '#EAEBEE',
					textColor: '#242B3A',
				},
				{
					title: '02:00pm Toughened...',
					start: '2023-11-10',
					end: '2023-11-10',
					color: '#EAEBEE',
					textColor: '#242B3A',
				},
				{
					title: '05:00pm Interior ...',
					start: '2023-11-16',
					end: '2023-11-16',
					color: '#EAEBEE',
					textColor: '#242B3A',
				},
				{
					title: '01:00pm Building....',
					start: '2023-11-18',
					end: '2023-11-18',
					color: '#EAEBEE',
					textColor: '#242B3A',
				},
			],
			eventClick: function (event, calEvent, jsEvent, view) {
				// Using event delegation for dynamically added content
				$(document).ready(function () {
			// Bind event handlers globally to handle clicks
			$(document).on('click', '.fc-event-title', function () {
				$('.toggle-sidebar').addClass('sidebar-popup');
				$('.sidebar-overlay').addClass('opened');
			});

			$(document).on('click', '.sidebar-close', function () {
				$('.toggle-sidebar').removeClass('sidebar-popup');
				$('.sidebar-overlay').removeClass('opened');
			});
			$(document).on('click', '.sidebar-overlay', function () {
				$('.toggle-sidebar').removeClass('sidebar-popup');
			});
		});
			}
		});

		calendar.render();
	});
}

// toggle-password
if ($('.toggle-password').length > 0) {
	$(document).on('click', '.toggle-password', function () {
		// Toggle the eye icon classes
		$(this).toggleClass("feather-eye feather-eye-off");

		// Get the input field within the same .pass-group
		var input = $(this).siblings(".pass-input");

		// Toggle the type attribute
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});
}

// Otp Verfication  
$('.digit-group').find('input').each(function () {
	$(this).attr('maxlength', 1);
	$(this).on('keyup', function (e) {
		var parent = $($(this).parent());
		if (e.keyCode === 8 || e.keyCode === 37) {
			var prev = parent.find('input#' + $(this).data('previous'));
			if (prev.length) {
				$(prev).select();
			}
		}
		else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
			var next = parent.find('input#' + $(this).data('next'));
			if (next.length) {
				$(next).select();
			} else {
				if (parent.data('autosubmit')) {
					parent.submit();
				}
			}
		}
	});
});
$('.digit-group input').on('keyup', function () {
	var self = $(this);
	if (self.val() != '') {
		self.addClass('active');
	} else {
		self.removeClass('active');
	}
});

// Datetimepicker Date

if ($('.datetimepicker').length > 0) {
	$('.datetimepicker').datetimepicker({
		format: 'DD-MM-YYYY',
		icons: {
			up: "fas fa-angle-up",
			down: "fas fa-angle-down",
			next: 'fas fa-angle-right',
			previous: 'fas fa-angle-left'
		}
	});
}

// Month Year picker 
if ($('.monthpicker').length > 0) {
	$('.monthpicker').datetimepicker({
		format: 'MM-YYYY',
		icons: {
			up: "fas fa-angle-up",
			down: "fas fa-angle-down",
			next: 'fas fa-angle-right',
			previous: 'fas fa-angle-left'
		}
	});
}


if ($('#datetimepickershow').length > 0) {
	$('#datetimepickershow').datetimepicker({

		inline: true,
		sideBySide: true,
		format: 'DD-MM-YYYY',
		icons: {
			up: "fas fa-angle-up",
			down: "fas fa-angle-down",
			next: 'fas fa-angle-right',
			previous: 'fas fa-angle-left'
		}

	});
}

// Datetimepicker time

if ($('.timepicker').length > 0) {
	$('.timepicker').datetimepicker({
		format: 'HH:mm A',
		icons: {
			up: "fas fa-angle-up",
			down: "fas fa-angle-down",
			next: 'fas fa-angle-right',
			previous: 'fas fa-angle-left'
		}
	});
}

// Rating Star Review

const stars = document.querySelectorAll('.rating-select i');
const starsNone = document.querySelector('.form-info');

// ---- ---- Stars ---- ---- //
stars.forEach((star, index1) => {
	star.addEventListener('click', () => {
		stars.forEach((star, index2) => {
			// ---- ---- Active Star ---- ---- //
			index1 >= index2
				? star.classList.add('active')
				: star.classList.remove('active');
		});
	});
});

//Payments

$('.card-payments').on('click', function () {
	$('.card-payments').removeClass('active');
	$(this).addClass('active');
});


// Coming Soon
if ($('.comming-soon-pg').length > 0) {
	// Get html elements
	let day = document.querySelector('.days');
	let hour = document.querySelector('.hours');
	let minute = document.querySelector('.minutes');
	let second = document.querySelector('.seconds');

	function setCountdown() {

		// Set countdown date
		let countdownDate = new Date('Sep 30, 2024 16:00:00').getTime();

		// Update countdown every second
		let updateCount = setInterval(function () {

			// Get today's date and time
			let todayDate = new Date().getTime();

			// Get distance between now and countdown date
			let distance = countdownDate - todayDate;

			let days = Math.floor(distance / (1000 * 60 * 60 * 24));

			let hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));

			let minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));

			let seconds = Math.floor(distance % (1000 * 60) / 1000);

			// Display values in html elements
			day.textContent = days;
			hour.textContent = hours;
			minute.textContent = minutes;
			second.textContent = seconds;

			// if countdown expires
			if (distance < 0) {
				clearInterval(updateCount);
				document.querySelector(".comming-soon-pg").innerHTML = '<h1>EXPIRED</h1>'
			}
		}, 1000)
	}

	setCountdown()
}

//Search Bar

$(document).ready(function () {
	$(".searchbar a").click(function () {
		$(".togglesearch").slideToggle();
		$(".top-search").focus();
	});
});


// fade in scroll 

$(document).ready(function () {
	if ($('.main-wrapper .aos').length > 0) {
		AOS.init({
			duration: 1200,
			once: true
		});
	}
});

// Service slider
if ($('.owl-carousel.customer-review-slider').length > 0) {
	$('.owl-carousel.customer-review-slider').owlCarousel({
		loop: true,
		margin: 24,
		nav: false,
		dots: true,
		smartSpeed: 2000,
		navText: ["<i class='feather-arrow-left'></i>", "<i class='feather-arrow-right'></i>"],
		responsive: {
			0: {
				items: 1
			},

			550: {
				items: 1
			},
			700: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	})
}
$('.user-sidebar a').on('click', function(e) {
	if($(this).parent().hasClass('submenu')) {
		e.preventDefault();
	}
	if(!$(this).hasClass('subdrop')) {
		$('ul', $(this).parents('ul:first')).hide(350);
		$('a', $(this).parents('ul:first')).removeClass('subdrop');
		$(this).next('ul').show(350);
		$(this).addClass('subdrop');
	} else if($(this).hasClass('subdrop')) {
		$(this).removeClass('subdrop');
		$(this).next('ul').hide(350);
	}
});
$('.user-sidebar ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');

if ($('.typed').length > 0) {
	
document.addEventListener('DOMContentLoaded', function () {
	ityped.init(document.querySelector(".typed"), {
	  strings: ['Carpenders', 'Stylist', 'Builders'],
	  typeSpeed: 150,  // Speed of typing
	  backSpeed: 80,   // Speed of backspacing
	  loop: true       // Loops the animation
	});
  });
}

// Installer Wizard

$(document).ready(function () {
	let progressVal = 0;
	let businessType = 0;
	
	$(".next_btns").on('click', function () {
		$(this).parent().parent().parent().next().fadeIn('slow');
		$(this).parent().parent().parent().css({
			'display': 'none'
		});
		progressVal = progressVal + 1;
		$('.progress-active').removeClass('progress-active').addClass('progress-activated').next().addClass('progress-active');
	});
	$(".prev_btns").on('click', function () {
		$(this).parent().parent().parent().prev().fadeIn('slow');
		$(this).parent().parent().parent().css({
			'display': 'none'
		});
		progressVal = progressVal - 1;
		$('.progress-active').removeClass('progress-active').prev().removeClass('progress-activated').addClass('progress-active'); 
	});
});
//Increment Decrement Numberes
var quantity = 0;
$('.quantity-plus').click(function (e) {
	e.preventDefault();
	var quantity = parseInt($('#quantity').val());
	$('#quantity').val(quantity + 1);
});

$('.quantity-minus').click(function (e) {
	e.preventDefault();
	var quantity = parseInt($('#quantity').val());
	if (quantity > 0) {
		$('#quantity').val(quantity - 1);
	}
});

var quantity2 = 0;
$('.quantity-plus').click(function (e) {
	e.preventDefault();
	var quantity2 = parseInt($('#increment-count').val());
	$('#increment-count').val(quantity2 + 1);
});

$('.quantity-minus').click(function (e) {
	e.preventDefault();
	var quantity2 = parseInt($('#increment-count').val());
	if (quantity2 > 0) {
		$('#increment-count').val(quantity2 - 1);
	}
});

var quantity3 = 0;
$('.quantity-plus').click(function (e) {
	e.preventDefault();
	var quantity3 = parseInt($('#increment-count2').val());
	$('#increment-count2').val(quantity3 + 1);
});

$('.quantity-minus').click(function (e) {
	e.preventDefault();
	var quantity3 = parseInt($('#increment-count2').val());
	if (quantity3 > 0) {
		$('#increment-count2').val(quantity3 - 1);
	}
});