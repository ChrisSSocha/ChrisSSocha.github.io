window.onerror=function(msg){
  if (!sessionStorage.jsError){
    sessionStorage.jsError = "";
  }

  sessionStorage.jsError += msg + "; ";
}

$(window).bind("ready", function() {

  var titleWidth = $(".title").outerWidth();
  var navigationWidth = $(".navigation").outerWidth();
  var mobileWidth = titleWidth + navigationWidth + 20;

  var isMobile = null;

  if (matchMedia){
    var mobileMedia = window.matchMedia( "(max-width: " + mobileWidth + "px)" );
    mobileMedia.addListener(IsMobileCallback);
    IsMobileCallback(mobileMedia);
  }

  function IsMobileCallback(mobileMedia){
    isMobile = mobileMedia.matches;
    
    if (isMobile) {
      $(".navigation-link").addClass("hide");
      $(".mobile-navigation").addClass("showMobileNavigation");
    } else{
      $(".navigation-link").removeClass("hide");
      $(".mobile-navigation").removeClass("showMobileNavigation");
    }
  }

  $(".navigation").hover(function(){
    if (isMobile) {
      $(".navigation-link").addClass("showDropdown");
    }
  }, function(){
    $(".navigation-link").removeClass("showDropdown");
  });

});

throw "This is a test error"

