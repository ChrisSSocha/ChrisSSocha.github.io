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

function deadPixel(pixelSize){

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  x = getRandomInt(0, screen.width);
  y = getRandomInt(0, screen.height);

  var deadPixel = document.createElement('div');

  deadPixel.style.position = "fixed";
  deadPixel.style.zIndex = "1000";
  deadPixel.style.width = pixelSize + "px";
  deadPixel.style.height = pixelSize + "px";
  deadPixel.style.backgroundColor = "black";
  deadPixel.style.left = x + "px";
  deadPixel.style.top = y + "px";

  document.body.appendChild(deadPixel);

  console.log("Added dead pixel at " + x + ", " + y);
  
}

throw "This is a test error"

