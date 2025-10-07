document.addEventListener("DOMContentLoaded", () => {
  const MasterSlider = window.MasterSlider;
  const e = new MasterSlider();
  requestIdleCallback(() => {
    e.control("arrows", { autohide: !1, overVideo: !0 });
    requestIdleCallback(() => {
      e.setup("masterslider", {
        width: 80,
        height: 110,
        minHeight: 0,
        space: 4,
        start: 1,
        grabCursor: !1,
        swipe: !1,
        mouse: !1,
        keyboard: !1,
        layout: "partialview",
        wheel: !0,
        autoplay: !1,
        instantStartLayers: !1,
        loop: !0,
        shuffle: !1,
        preload: 8,
        heightLimit: !0,
        autoHeight: !0,
        smoothHeight: !0,
        endPause: !1,
        overPause: !0,
        fillMode: "center",
        centerControls: !0,
        startOnAppear: !1,
        layersMode: "center",
        autofillTarget: "",
        hideLayers: !1,
        fullscreenMargin: 0,
        speed: 20,
        dir: "h",
        parallaxMode: "swipe",
        view: "basic",
      });
    });
  });
});
