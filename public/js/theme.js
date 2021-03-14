(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict

// start of script
$(".btn-primary").click(function() {
  location.href = "/mail_type_1/" + $('.text-dark').text()[10];
});

var raw_result = $("#raw li");

for(var i=0; i<8; i++) {
  if(parseInt(raw_result[(5*i)+1].textContent) > 70 && parseInt(raw_result[(5*i)+3].textContent) === 0) {
    if(parseInt(raw_result[(5*i)+1].textContent) > 90) {
      location.href = "/mail_type_4/" + parseInt(raw_result[5*i].textContent);
    }
    else {
      location.href = "/mail_type_2/" + parseInt(raw_result[5*i].textContent);
    }
  }

  if(parseInt(raw_result[(5*i)+2].textContent) > 70 && parseInt(raw_result[(5*i)+4].textContent) === 0) {
    if(parseInt(raw_result[(5*i)+2].textContent) > 90) {
      location.href = "/mail_type_5/" + parseInt(raw_result[5*i].textContent);
    }
    else {
      location.href = "/mail_type_3/" + parseInt(raw_result[5*i].textContent);
    }
  }
}