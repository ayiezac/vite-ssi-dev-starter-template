/**
 * @param {Element | null} hideMenu
 * @param {Element | null} showMenu
 */
export function toggleSubmenu(hideMenu, showMenu) {
  hideMenu?.classList.add("slide-out");
  showMenu?.classList.remove("slide-out");
  showMenu?.classList.add("slide-in");

  if (showMenu instanceof HTMLElement) {
    showMenu.style.display = "block";
  }

  const handleAnimationEnd = () => {
    hideMenu?.classList.remove("slide-out");
    if (hideMenu instanceof HTMLElement) {
      hideMenu.style.display = "none";
    }
    hideMenu?.removeEventListener("animationend", handleAnimationEnd);
  };

  hideMenu?.addEventListener("animationend", handleAnimationEnd);

  showMenu?.addEventListener("animationend", () => {
    showMenu?.classList.remove("slide-in");
  });
}

/**
 * Transfers the text content from a source element to a target menu.
 *
 * @param {Element} sourceElement - The source element containing the text content to be transferred.
 * @param {Element} targetMenu - The target menu element where the text content will be transferred.
 * @param {string} selector - The CSS selector used to find the target text element.
 * @return {void}
 */
export function transferTextContent(sourceElement, targetMenu, selector) {
  const textContent = sourceElement.textContent;
  const targetTextElement = targetMenu.querySelector(selector);
  if (targetTextElement) {
    targetTextElement.textContent = textContent;
  }
}
