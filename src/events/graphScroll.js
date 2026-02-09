import { dom } from "../dom/selectors.js";

export function initGraphScroll() {
	dom.graphButton.addEventListener("click", () => {
		dom.graphSection.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	});
}
