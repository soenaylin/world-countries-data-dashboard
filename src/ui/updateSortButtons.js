import { state } from "../state/state.js";
import { dom } from "../dom/selectors.js";

export function updateSortButtons() {
	dom.sortButtons.forEach((button) => {
		const sortKey = button.dataset.sort;
		const icon = button.querySelector(".sort-icon");

		button.classList.toggle("active", sortKey === state.sortBy);

		if (!icon) return; // 🛡 safety guard

		if (sortKey === state.sortBy) {
			icon.textContent = state.sortOrder === "asc" ? "↑" : "↓";
		} else {
			icon.textContent = "";
		}
	});
}
