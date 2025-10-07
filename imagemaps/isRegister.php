<?php if (isset($_COOKIE["udata"])): ?>
<a href="/members/home/" class="d-flex justify-content-center align-items-center focus-ring fw-bold py-3 rounded-pill border-0 btn-primary-color focus-ring-light link-light" role="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>My Account</a>
<?php else: ?>
<a href="#signupModal" class="d-flex justify-content-center align-items-center focus-ring fw-bold py-3 rounded-pill border-0 btn-primary-color focus-ring-light link-light" role="button" data-bs-target=".cartagena-dating-modal" data-bs-toggle="modal">Register for FREE</a>
<?php endif; ?>
