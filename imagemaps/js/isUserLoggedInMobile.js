const ctaSignupModal = document.querySelector(
  "nav#mobile-navbar a[data-id=\"cta-signup-modal\"]",
);
const btnSignInState = document.querySelector(
  "nav#mobile-navbar a[data-id=\"userMobileSignState\"]",
);

/**
 * Updates the content of an anchor element.
 *
 * @param {string} anchorSelector - A CSS selector to identify the anchor element.
 * @param {string} href - The new href attribute value for the anchor element.
 * @param {string} content - The new inner HTML content for the anchor element.
 * @return {void}
 */
function updateAnchorContent(anchorSelector, href, content) {
  const anchor = document.querySelector(anchorSelector);
  if (anchor instanceof HTMLAnchorElement) {
    anchor.innerHTML = content;
    anchor.href = href;
  }
}

/**
 * Updates the mobile user's inbox icon based on their login status and the presence of new messages.
 * @param {string} badgeTextContent - The text content of the badge indicating the number of new messages.
 * @return {void}
 */
export function isMobileUserLoggedIn(badgeTextContent) {
  if (!ctaSignupModal || !(btnSignInState instanceof HTMLAnchorElement))
    return;

  /**
   * Returns an SVG element representing the mobile user's inbox icon,
   * including a badge indicating the number of new messages if applicable.
   *
   * @return {string} The SVG element as a string.
   */
  const badgeIconOnMobile = () => {
    return `
            <span class="position-relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
					${badgeTextContent}
					<span class="visually-hidden">New alerts</span>
				</span>
            </span>
            <small class="mb-0 text-white">My Inbox</small>
        `;
  };
  updateAnchorContent(
    "[data-id=\"isMailUserLoggedIn\"]",
    "/members/mailbox?folder=received",
    badgeIconOnMobile(),
  );

  ctaSignupModal.remove();

  /**
   * Returns an SVG element representing a sign out button with a logout icon and the text "Sign out".
   *
   * @return {string} The SVG element as a string.
   */
  const btnSignInContentState = () => {
    return `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
            Sign out
        `;
  };

  // btnSignInState.innerHTML = "";
  btnSignInState.href = "/members/logout?cmd=logout";
  btnSignInState.insertAdjacentHTML("beforeend", btnSignInContentState());
}

/**
 * Updates the mobile user's login status icon to indicate that they are logged out.
 *
 * @return {void}
 */
export function isMobileUserLoggedOut() {
  if (
    !ctaSignupModal
    || !(btnSignInState instanceof HTMLAnchorElement)
    || !(ctaSignupModal instanceof HTMLAnchorElement)
  ) {
    return;
  }
  /**
   * Returns an SVG element representing a sign up icon with a user-plus symbol and the text "Sign up for FREE".
   *
   * @return {string} The SVG element as a string.
   */
  const badgeIconOnMobile = () => {
    return `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
            <small class="mb-0 text-white lh-base fs-6 text-nowrap">Sign in</small>
        `;
  };
  updateAnchorContent(
    "[data-id=\"isMailUserLoggedIn\"]",
    "/members/signup/",
    badgeIconOnMobile(),
  );

  const btnSignInContentState = () => {
    return `
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd"></path>
            </svg>
            Sign in
        `;
  };

  ctaSignupModal.dataset.bsToggle = "modal";
  ctaSignupModal.dataset.bsTarget = ".cartagena-dating-modal";
  ctaSignupModal.className
    = "fw-semibold py-2 px-3 rounded-pill text-white mb-0 w-100 text-center fs-4 text-nowrap btn-primary-color";
  ctaSignupModal.textContent = "My Account";
  btnSignInState.href = "/members/login";
  btnSignInState.insertAdjacentHTML("beforeend", btnSignInContentState());
}
