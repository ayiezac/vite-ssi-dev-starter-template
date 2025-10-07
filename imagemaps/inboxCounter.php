<?php
header("Cache-Control: max-age=60, must-revalidate");
$cookieData = isset($_COOKIE["udata"]) ? $_COOKIE["udata"] : null;
?>


<?php if (isset($cookieData)): ?>
    <a class="align-items-center d-flex fs-4 fw-medium gap-2 link-body-emphasis nav-link position-relative text-nowrap"href="/members/mailbox?folder=received">My Inbox <svg class="bi bi-envelope"fill=currentColor height=20 viewBox="0 0 16 16"width=20 xmlns=http://www.w3.org/2000/svg><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/></svg> <small :class="counter > 0 ? 'badge bg-danger' : ''"class="position-absolute rounded-pill start-100 top-0 translate-middle"x-data=counterData x-init=fetchCounters()><span x-text="counter > 0 ? counter : ''"></span><span class=visually-hidden>unread messages</span></small></a>
<?php else: ?>
    <a class="fs-4 fw-medium link-body-emphasis nav-link text-nowrap"href=/members/login>Member's Login <svg fill=none height=20 stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=1.5 viewBox="0 0 24 24"width=20 xmlns=http://www.w3.org/2000/svg><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1=15 x2=3 y1=12 y2=12 /></svg></a>
<?php endif; ?>