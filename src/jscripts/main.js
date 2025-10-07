import { ddaccordion } from "./ddaccordion.min.js";
import r from './jquery@1.12.4.js';
import { carousels } from "./owl-carousel-config.js";

const $ = r;

if (typeof window !== 'undefined') {
  window.$ = $;
} else {
  window.jQuery = $;
}

//preload any images defined inside ajaxloadingmsg variable
ddaccordion.preloadimages(jQuery(ddaccordion.ajaxloadingmsg).filter('img'))

ddaccordion.init({
  headerclass: "technology", //Shared CSS class name of headers group
  contentclass: "thelanguage", //Shared CSS class name of contents group
  revealtype: "click", //Reveal content when user clicks or onmouseover the header? Valid value: "click", "clickgo", or "mouseover"
  mouseoverdelay: 1000, //if revealtype="mouseover", set delay in milliseconds before header expands onMouseover
  collapseprev: false, //Collapse previous content (so only one open at any time)? true/false 
  defaultexpanded: [], //index of content(s) open by default [index1, index2, etc]. [] denotes no content.
  onemustopen: false, //Specify whether at least one header should be open always (so never all headers closed)
  animatedefault: false, //Should contents open by default be animated into view?
  persiststate: false, //persist state of opened contents within browser session?
  toggleclass: ["closedlanguage", "openlanguage"], //Two CSS classes to be applied to the header when it's collapsed and expanded, respectively ["class1", "class2"]
  togglehtml: ["prefix", "&#9658;", "&#9660;"], //Additional HTML added to the header when it's collapsed and expanded, respectively  ["position", "html1", "html2"] (see docs)
  animatespeed: "fast", //speed of animation: integer in milliseconds (ie: 200), or keywords "fast", "normal", or "slow"
  oninit: function (_expandedindices) { //custom code to run when headers have initalized
    //do nothing
  },
  onopenclose: function (_header, _index, _state, _isuseractivated) { //custom code to run whenever a header is opened or closed
    //do nothing
  }
});

carousels();