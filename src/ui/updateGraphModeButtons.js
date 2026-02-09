import { state } from "../state/state.js";
import { dom } from "../dom/selectors.js";

export function updateGraphModeButtons() {
	dom.graphModeButtons.forEach((button) => {
		const mode = button.textContent.toLowerCase();
		button.classList.toggle("active", mode === state.graphView);
	});
}
