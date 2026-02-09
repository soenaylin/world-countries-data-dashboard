import { state } from "../state/state.js";
import { dom } from "../dom/selectors.js";

export function updateSearchInfo(count) {
	if (state.searchQuery) {
		dom.searchInfo.textContent = `${count} countries satisfied the search criteria`;
		dom.searchInfo.classList.remove("hidden");
	} else {
		dom.searchInfo.classList.add("hidden");
	}
}
