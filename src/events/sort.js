import { dom } from "../dom/selectors.js";
import { state } from "../state/state.js";

export function initSort(renderApp, updateSortButtons) {
	dom.sortButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const sortKey = button.dataset.sort;

			if (state.sortBy === sortKey) {
				state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
			} else {
				state.sortBy = sortKey;
				state.sortOrder = "asc";
			}

			updateSortButtons();
			renderApp();
		});
	});
}
