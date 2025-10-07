<?php if (isset($_COOKIE["udata"])): ?>
  <a href="/members/home/" class="fw-semibold py-2 px-3 rounded-pill text-white mb-0 w-100 text-center fs-4 text-nowrap btn-primary-color">My Account</a>
  <a data-id="userMobileSignState" href="/members/logout?cmd=logout" class="link-dark d-flex align-items-center fw-semibold column-gap-1 w-100" noprefetch="">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" x2="9" y1="12" y2="12"></line>
    </svg>
    Sign out
  </a>
<?php else: ?>
  <a href="/members/login/" class="fw-semibold py-2 px-3 rounded-pill mb-0 w-100 text-center fs-4 text-nowrap text-dark">
    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
      <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd"></path>
    </svg>
    Login
  </a>
    <a href="/members/login/" class="fw-semibold py-2 px-3 rounded-pill mb-0 w-100 text-center fs-4 text-nowrap text-white btn-primary-color">
    <svg class="lucide lucide-user-plus" fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
    Create Account
  </a>
<?php endif; ?>