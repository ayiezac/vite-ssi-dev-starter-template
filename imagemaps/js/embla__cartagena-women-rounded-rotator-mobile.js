import EmblaCarousel from "https://cdn.jsdelivr.net/npm/embla-carousel@8.6.0/+esm";

const emblaNode = document.querySelector(".embla");
const options = { dragFree: true };
const emblaApi = EmblaCarousel(emblaNode, options);

emblaApi.slideNodes(); // Access API
const emblaContainer = emblaNode.querySelector(".embla .embla__container");
const verified_link_badge = document.querySelectorAll("#verified-badge a");

const fragment = document.createDocumentFragment();
for (const link of verified_link_badge) {
  const embla__slide = document.createElement("div");
  embla__slide.className = "embla__slide mx-3";

  const embla__slide_link = document.createElement("a");
  embla__slide_link.href = link.href;
  embla__slide_link.className = "d-inline-block focus-ring rounded-circle";

  const img = link.querySelector("img");
  const embla__slide_img = new Image(80, 80);
  // Use lazysizes: set src to placeholder, real src to data-src, add lazyload class
  embla__slide_img.src = "data:image/webp;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  embla__slide_img.setAttribute("data-src", img.getAttribute("data-src") || img.src);
  embla__slide_img.alt = img.alt;
  embla__slide_img.decoding = "async";
  embla__slide_img.className = "object-fit-cover rounded-circle lazyload";
  embla__slide_img.style.aspectRatio = "1 / 1";

  embla__slide_link.insertBefore(
    embla__slide_img,
    embla__slide_link.firstChild,
  );
  embla__slide.insertBefore(embla__slide_link, embla__slide.firstChild);
  fragment.insertBefore(embla__slide, fragment.firstChild);
}
emblaContainer.insertBefore(fragment, emblaContainer.firstChild);
