import { dom } from "../dom/selectors.js";
import { debounce } from "../utils/debounce.js";
import { state } from "../state/state.js";

export function initSearch(renderApp) {
	const handler = debounce((value) => {
		state.searchQuery = value.toLowerCase();
		renderApp();
	}, 200);

	dom.searchInput.addEventListener("input", (e) =>
		handler(e.target.value.trim())
	);
}
