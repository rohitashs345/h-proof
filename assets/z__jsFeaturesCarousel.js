"use strict";

Shopify.theme.jsTestimonials = {
  init: function init($section) {
    this.createSlider();
  },
  createSlider: function createSlider() {
    var $testimonialSlider = $('[data-carousel-slider]').flickity({
      wrapAround: true,      
      autoPlay: $('.features-carousel-slider').data('autoplay'),
      initialIndex: 1,
      cellAlign: 'left',
      resize: false,
      prevNextButtons: true,
      pageDots: false,
      watchCSS: false,
      arrowShape: { 
                    x0: 10,
                    x1: 60, y1: 50,
                    x2: 60, y2: 40,
                    x3: 20
                  }
    }); // Reset layout to avoid collapsing issues

   // setTimeout(function () {
   //   $testimonialSlider.flickity('resize');
   // }, 500);
    
    $('body').on('click', '.testimonial__nav--prev', function () {
      $testimonialSlider.flickity('previous');
    });
    $('body').on('click', '.testimonial__nav--next', function () {
      $testimonialSlider.flickity('next');
    });
  },
  blockSelect: function blockSelect($section, blockId) {
    var $testimonialSlider = $section.find('[data-carousel-slider]');
    var slideIndex = $('#shopify-section-' + blockId).data('testimonial-index');
    $testimonialSlider.flickity('select', slideIndex, true, true);
  },
  unload: function unload($section) {
    var $slider = $section.find('.flickity-enabled');
    $slider.flickity('destroy');
    $('.testimonial__nav--prev').off();
    $('.testimonial__nav--next').off();
  }
};