document.addEventListener("DOMContentLoaded", async () => {
    const { toggleFunction, closeMegaMenu } = await import("/imagemaps/js/lazyloadScript.js");

    const toggleMegaMenu = document.querySelector("a[href='#toggle-our-services']");
    const megaMenu = document.querySelector("#our-services-megamenu");
    const mega_dropdown_btn_close = megaMenu?.querySelector("button[data-id='mega-dropdown-btn-close']");
    const caret = toggleMegaMenu?.querySelector("svg");

    if (!caret || !(caret instanceof SVGSVGElement) || !toggleMegaMenu || !megaMenu || !(megaMenu instanceof HTMLDivElement) || !mega_dropdown_btn_close) {
        return;
    }

    toggleMegaMenu.addEventListener("click", async (e) => {
        e.preventDefault();
        toggleFunction(megaMenu, caret);
    });

    mega_dropdown_btn_close.addEventListener("click", async () => {
        closeMegaMenu(megaMenu, caret);
    });

    document.addEventListener("click", async (e) => {
        if (!(e.target instanceof Node) ||
            (!megaMenu.contains(e.target) && e.target !== toggleMegaMenu)) {
            closeMegaMenu(megaMenu, caret);
        }
    });
});