import { dom } from "../dom/selectors.js";
import { state } from "../state/state.js";

export function initGraphMode(renderApp, updateGraphModeButtons) {
	dom.graphModeButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const mode = button.textContent.toLowerCase();

			if (state.graphView !== mode) {
				state.graphView = mode;
				updateGraphModeButtons();
				renderApp();
			}
		});
	});
}
