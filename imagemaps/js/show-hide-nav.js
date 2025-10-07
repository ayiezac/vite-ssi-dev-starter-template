import { Offcanvas } from 'bootstrap';
import throttle from 'lodash.throttle';

const toggleMegaMenu = document.querySelector(
	"a[href='#mega-dropdown-content2']",
);
const megaMenuOnTop = document.querySelector('.mega-dropdown-content2');
const caretAtMegaMenuOnTop = toggleMegaMenu?.querySelector('svg');

const scrollDrivenNav = document.getElementById('scroll-driven-nav');
const megaMenuAtShowHideNav = document.getElementById('our-services-megamenu');
const caretAtShowHideNav = document.querySelector('svg#mega-menu-caret');

const btnOffcanvasMenu = document.querySelectorAll(
	'[data-class="btnOffCanvas"]',
);
const offcanvasMenu = document.getElementById('offcanvasMenu');
const bsOffcanvas = new Offcanvas(offcanvasMenu);

for (const btn of btnOffcanvasMenu) {
	btn.addEventListener('click', () => {
		bsOffcanvas.toggle();
	});
}

const scrollFunction = throttle(async () => {
	const { scrollFunction, closeMegaMenu } = await import(
		'/imagemaps/js/lazyloadScript.js'
	);
	scrollFunction(scrollDrivenNav);
	closeMegaMenu(megaMenuAtShowHideNav, caretAtShowHideNav);
	closeMegaMenu(megaMenuOnTop, caretAtMegaMenuOnTop);
	bsOffcanvas.hide();
}, 200);

window.addEventListener('scroll', scrollFunction);
