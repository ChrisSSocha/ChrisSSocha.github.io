$(window).bind("ready", function() {
	
	self = this;

	self.titleWidth = $(".title").outerWidth();
	self.navigationWidth = $(".navigation").outerWidth();
	self.mobileWidth = titleWidth + navigationWidth + 20;

	var isMobile = null;

	if (matchMedia){
		var mobileMedia = window.matchMedia( "(max-width: " + mobileWidth + "px)" );
		mobileMedia.addListener(IsMobileCallback)
		IsMobileCallback(mobileMedia)
	}

	function IsMobileCallback(mobileMedia){
		self.isMobile = mobileMedia.matches;
		
		if (self.isMobile) {
			$(".navigation-link").addClass("hide");
			$(".mobile-navigation").addClass("showMobileNavigation");
		} else{
			$(".navigation-link").removeClass("hide");
			$(".mobile-navigation").removeClass("showMobileNavigation");
		};
	}

	$(".navigation").hover(function(){
		if (self.isMobile) {
			$(".navigation-link").addClass("showDropdown");
		};
	}, function(){
		$(".navigation-link").removeClass("showDropdown");
	});

});