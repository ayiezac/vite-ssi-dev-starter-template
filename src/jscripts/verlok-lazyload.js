import LazyLoad from "https://cdn.jsdelivr.net/npm/vanilla-lazyload@19.0.3/+esm";

const lazyLoadInstance  = new LazyLoad({
  elements_selector: ".lazyload",
});

lazyLoadInstance.update();