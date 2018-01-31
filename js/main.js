jQuery(function($) {'use strict';

	$('.navbar-collapse ul li a').on('click', function() {
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});


	//Initiat WOW JS
	new WOW().init();

});

$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
        $("header").addClass("darkHeader");
    } else {
        $("header").removeClass("darkHeader");
    }
});

$('.notext').click(function(){
	$("body").toggleClass("header-expanded");
});
