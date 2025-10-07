/**
 * Toggles the display of a mega menu by adding or removing the 'entrance-show' class.
 *
 * @param {HTMLDivElement} megaMenu - The mega menu element to toggle.
 * @param {SVGSVGElement} svg - The SVG element to rotate.
 * @return {void}
 */
function toggleFunction(megaMenu, svg) {
  megaMenu.classList.toggle("entrance-show");
  svg.style.rotate = megaMenu.classList.contains("entrance-show")
    ? "-180deg"
    : "0deg";
  svg.style.transition = "rotate 0.4s ease";
}

/**
 * Closes a mega menu by removing the 'entrance-show' class.
 *
 * @param {HTMLDivElement} megaMenu - The mega menu element to close.
 * @param {SVGSVGElement} svg - The SVG element to rotate.
 * @return {void}
 */
function closeMegaMenu(megaMenu, svg) {
  megaMenu.classList.remove("entrance-show");
  svg.style.rotate = "0deg";
}

function scrollFunction(element) {
  element.style.top = window.scrollY > 300 ? "0" : "-20rem";
}

export { closeMegaMenu, scrollFunction, toggleFunction };
