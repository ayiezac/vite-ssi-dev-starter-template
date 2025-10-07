
// (function($) {
//   var $window = $(window);
//   var $videoWrap = $('.video-wrap');
//   var $video = $('.video');
//   var videoHeight = $video.outerHeight();

//   $window.on('scroll',  function() {
//     var windowScrollTop = $window.scrollTop();
//     var videoBottom = videoHeight + $videoWrap.offset().top;

//     if (windowScrollTop > videoBottom) {
//       $videoWrap.height(videoHeight);
//       $video.addClass('stuck');

//     } else {
//       $videoWrap.height('auto');
//       $video.removeClass('stuck');
//     }
//   });
// }(jQuery));

(function ($) {
 var $window = $(window);
 var $videoWrap = $(".video-wrap");
 var $video = $(".video");
 var videoHeight = $video.outerHeight();
 var isClosed = false; // Flag to track whether the close button has been clicked

 // Create close button element and append it to video wrap
 var $closeButton = $('<div class="close-button">X</div>').appendTo(
  $video
 );

 $window.on("scroll", function () {
  if (!isClosed) {
   // Check if the close button has not been clicked
   var windowScrollTop = $window.scrollTop();
   var videoBottom = videoHeight + $videoWrap.offset().top;

   if (windowScrollTop > videoBottom) {
    $videoWrap.height(videoHeight);
    $video.addClass("stuck");
    $closeButton.show(); // Show the close button when the video is stuck
   } else {
    $videoWrap.height("auto");
    $video.removeClass("stuck");
    $closeButton.hide(); // Hide the close button when the video is not stuck
   }
  }
 });

 // Add click event listener for the dynamically created close button
 $videoWrap.on("click", ".close-button", function () {
  $videoWrap.height("auto");
  $video.removeClass("stuck");
  $closeButton.hide(); // Hide the close button
  isClosed = true; // Set the flag to true when the close button is clicked
 });
})(jQuery);






