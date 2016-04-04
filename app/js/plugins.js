// function accordion() 
(function ($) {
	
	$.fn.accordion = function() {

		var $this = $(this);
		var $accordionHeading = $(this).find('.accordion .accordion-heading');
		
		// Check for active class
		$('.accordion').each( function(e) {

			if( $(this).hasClass('active') && $(this).children('.accordion-heading').hasClass('active') ) {
				$(this).children('.accordion-body').show();
			}

		});

		// Close the accordion
		function accordionClose(object) {
			object.parent('.accordion').siblings().children('.accordion-body').slideUp(350);
			object.parent('.accordion').siblings().children('.accordion-heading').removeClass('active');
			object.parent('.accordion').siblings().removeClass('active');
		}

		// Toggle accordion
		function accordionSlide(object) {
			object.siblings('.accordion-body').slideToggle(350);
			object.parent('.accordion').toggleClass('active');
			object.toggleClass('active')
		}


		// Accordion click function
		$accordionHeading.click(function(e) {

			var $accordionType = $(this).closest($this).data('collapsible').trim();

			if( $accordionType == 'accordion') {

				accordionClose( $(this) );
				accordionSlide( $(this) );
				
				
			} else if( $accordionType == 'expand') {

				accordionSlide( $(this) );

			} else {
				console.error('[data-collapsible] attribute is not defined');
			}
		
		});

	};

	$(document).ready(function(){
	    $('.accordion-wrapper').accordion();
  	});

}(jQuery));

// function tabber() 
(function ($) {

	$.fn.tabber = function() {

		var $this = $(this);

		function tabs(object) {
			var targetLink = object.attr('href');

			object.closest('.tabber-head').siblings('.tabber-content').children('.tab-content').hide();
			object.closest('.tabber-head').siblings('.tabber-content').children('.tab-content').removeClass('active');
			object.closest('.tabber-head').children('.tab').removeClass('active');

			object.parent().addClass('active');
			$(targetLink).fadeIn(350);
			$(targetLink).addClass('active');
		}

		$this.find('.tab').each(function(e) {

			if( $(this).hasClass('active') ) {				
				$($(this).children('a').attr('href')).addClass('active');
			}

			$(this).children('a').click(function(e) {
				
				if( !$(this).parent('.tab').hasClass('disabled') ) {					
					tabs( $(this) );
				}
				e.preventDefault();

			});

		});


	};

	$(document).ready(function(){
	    $('.tabber-wrapper').tabber();
  	});

}(jQuery));

// function tabber() 
(function ($) {

	var topScrollPosition, topPosition, targetLink;

	$.fn.modal = function() {

		var $this = $(this);
		
		$(window).scroll(function() { 
			topScrollPosition = $(window).scrollTop();
		});

		$(document).on('keyup', function(e) {
			if(e.keyCode === 27) {
				console.log('esc is pressed');
			}
		});
		

		$this.click(function(e) {
			e.preventDefault();
			targetLink = $this.attr('href');
			topPosition = $(this).offset().top - topScrollPosition;

			$(targetLink).after('<div class="overlay"></div>');

			if( !$(targetLink).hasClass('active') ) {
				$(targetLink).css({
					"display": "block",
					"transform": "scaleX(0.7)",
					"opacity": "0.5",
					"top": topPosition,
					complete: function() {
						$(this).addClass('active');
						$(this).animate(350, function() {							
							$(this).css({
								"top": "10%",
								"transform": "scaleX(1)",
								"opacity": "1"
							});	
							$('body').css({"overflow": "hidden"});		
							$('.overlay').css({"opacity": "0.5"});				
						});
					}

				});
			}
			
			e.stopPropagation();

		});

		$('body').click(function() {
			
		});

	};

	$.fn.closeModal = function() {

		var $this = $(this);

		$this.click(function(e){

			e.preventDefault();


			$(targetLink).removeClass('active');
			$(targetLink).animate(350, function() {

				$(this).css({
					"top": topPosition,
					"opacity": "0",
					"transform": "scaleX(0.7)"
					
				}).fadeOut(300);
				$('body').css({"overflow": ""});	

				$('.overlay').animate({
					opacity: 0,
				}, 350, function() {
					$(this).remove();
				});
			});


		});

	};

	$(document).ready(function(){
	    $('.modal-trigger').modal();
	    $('.modal-close').closeModal();
  	});

}(jQuery));