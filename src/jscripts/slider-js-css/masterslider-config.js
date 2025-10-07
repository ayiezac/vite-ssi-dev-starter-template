//////  START OF MASTER SLIDER  /////////
var masterslider = new MasterSlider();

// slider controls
masterslider.control('arrows', { autohide: false, overVideo: true });
// masterslider.control('slideinfo', { autohide: false, overVideo: true, dir: 'h', align: 'bottom', inset: false, margin: 10 });
// slider setup
masterslider.setup("masterslider", {
  width: 80,
  height: 110,
  minHeight: 0,
  space: 4,
  start: 1,
  grabCursor: false,
  swipe: false,
  mouse: false,
  keyboard: false,
  layout: "partialview",
  wheel: true,
  autoplay: false,
  instantStartLayers: false,
  loop: true,
  shuffle: false,
  preload: 5,
  heightLimit: true,
  autoHeight: true,
  smoothHeight: true,
  endPause: false,
  overPause: true,
  fillMode: "center",
  centerControls: true,
  startOnAppear: false,
  layersMode: "center",
  autofillTarget: "",
  hideLayers: false,
  fullscreenMargin: 0,
  speed: 20,
  dir: "h",
  parallaxMode: 'swipe',
  view: "basic",
});