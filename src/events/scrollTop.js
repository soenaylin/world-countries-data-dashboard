import { dom } from "../dom/selectors.js";

export function initScrollTop() {
	window.addEventListener("scroll", () => {
		if (window.scrollY > 300) {
			dom.scrollTopBtn.classList.add("show");
		} else {
			dom.scrollTopBtn.classList.remove("show");
		}
	});

	dom.scrollTopBtn.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});
}
