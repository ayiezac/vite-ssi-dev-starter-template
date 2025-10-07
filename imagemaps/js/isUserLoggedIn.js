import * as Comlink from "https://cdn.jsdelivr.net/npm/comlink@4.4.2/+esm";
const worker = new Worker(" /imagemaps/js/worker-utils/worker-fetchdom.js");
import lodashMemoize from 'https://cdn.jsdelivr.net/npm/lodash.memoize@4.1.2/+esm'
/**
 * Handles the message event of a worker, checking for errors and rendering data if available.
 *
 * @param {MessageEvent} e - The event object containing the message data.
 * @return {Promise<void>} - A promise that resolves when the rendering is complete.
 */
document.addEventListener("DOMContentLoaded", async () => {
    const workerAPI = Comlink.wrap(worker);
    const fetchDataMemoized = lodashMemoize((url) => workerAPI.fetchData(url));
    const data = await fetchDataMemoized(`${location.origin}/members/home/`);
    handleRender(data);
});

const handleMemberLoginState = () => {
    return `
        <a href="/members/login" class="nav-link link-body-emphasis fs-4 fw-medium text-nowrap">Member's Login
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-in">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" x2="3" y1="12" y2="12"></line>
            </svg>
        </a>
    `;
}
const handleInboxState = (badgeContent) => {
    return `
        <a href="/members/mailbox?folder=received" class="position-relative nav-link link-body-emphasis fs-4 fw-medium d-flex align-items-center gap-2 text-nowrap">
            My Inbox
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"></path>
            </svg>
            <small class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                ${badgeContent}
                <span class="visually-hidden">unread messages</span>
            </small>
        </a>
    `;
}

const handleLogoutState = () => {
    return `
        <a href="/members/logout?cmd=logout" class="nav-link link-body-emphasis fs-4 fw-medium d-flex align-items-center gap-2 text-nowrap">
            Logout
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
            </svg>
        </a>
    `;
}
const handleSignupState = () => {
    return `
        <a href="#signup" role="button" class="mb-0 link-light border p-3 d-flex gap-2 rounded-pill align-items-center btn-primary-color" data-bs-toggle="modal" data-bs-target=".cartagena-dating-modal">
            <span>Sign up Today, <strong>It's Totally FREE!</strong></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
        </a>
    `;
}
const handleRender = async (data) => {
    const { isMobileUserLoggedIn, isMobileUserLoggedOut } = await import("/imagemaps/js/isUserLoggedInMobile.min.js");

    const parseDOM = lodashMemoize((data) => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(data, "text/html");
        return dom;
    })
    
    const dom = parseDOM(data);
    const badgeElement = dom.querySelector(`a[href='https://${location.hostname}/members/mailbox?folder=received'] .badge`);

    const inboxBadge = document.querySelectorAll("[data-id='desktop-uLogin']");
    const btnLogState = document.querySelector("[data-id='btnLogStateContainer']");
    const btnLogStateOnScrollNav = document.querySelector("[data-id='btnCtaStateContainer']");

    if (badgeElement) {
        const badge = badgeElement.textContent;

        btnLogState.innerHTML = "";
        btnLogState.innerHTML = handleLogoutState();
        btnLogStateOnScrollNav.innerHTML = "";
        btnLogStateOnScrollNav.innerHTML = handleLogoutState();

        const inboxBadgeLength = inboxBadge.length;
        for (let i = 0; i < inboxBadgeLength; i++) {
            inboxBadge[i].innerHTML = "";
            inboxBadge[i].innerHTML = handleInboxState(badge);
        }

        isMobileUserLoggedIn(badge);

    } else {
        btnLogState.innerHTML = "";
        btnLogState.innerHTML = handleSignupState();
        btnLogStateOnScrollNav.innerHTML = "";
        btnLogStateOnScrollNav.innerHTML = handleSignupState();
        for (let i = 0; i < inboxBadge.length; i++) {
            inboxBadge[i].innerHTML = "";
            inboxBadge[i].insertAdjacentHTML("beforeend", handleMemberLoginState());
        }

        isMobileUserLoggedOut();
    }
};