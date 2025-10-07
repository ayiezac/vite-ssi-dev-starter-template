// if (!$.camelCase && $.fn && $.fn.jquery) {
//   // Use the internal camelCase function if available
//   $.camelCase = function (str) {
//     return str.replace(/-([a-z])/g, function (all, letter) {
//       return letter.toUpperCase();
//     });
//   };
// }

export function carousels() {
  globalThis.$(".owl-carousel1").owlCarousel({
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    loop: true,
    center: true,
    // margin: 0,
    responsiveClass: true,
    nav: true,
    onInitialized: (_event) => {
      // Apply accessibility button names
      globalThis.$(".owl-carousel1").find(".owl-dot").attr("type", "button");
      globalThis.$(".owl-carousel1").find(".owl-dot").attr("aria-label", "Dot Navigation");
    },
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      680: {
        items: 2,
        nav: false,
        loop: false,
      },
      1000: {
        items: 3,
        nav: true,
      },
    },
  });
};
