import { dom } from "../dom/selectors.js";
import { state } from "../state/state.js";
import {
	getPopulationGraphData,
	getLanguageGraphData,
} from "../services/graphData.js";
import { createGraphRow } from "./createGraphRow.js";

export function renderGraph(countries) {
	dom.graphContainer.innerHTML = "";

	const data =
		state.graphView === "population"
			? getPopulationGraphData(countries)
			: getLanguageGraphData(countries);

	dom.graphTitle.textContent =
		state.graphView === "population"
			? "10 Most Populated Countries in the World"
			: "10 Most Spoken Languages in the World";

	const max = Math.max(...data.map((d) => d.value));
	data.forEach((item) => {
		const row = createGraphRow(item, max);
		dom.graphContainer.appendChild(row);
	});

	requestAnimationFrame(() => {
		const bars = dom.graphContainer.querySelectorAll(".graph-bar");
		bars.forEach((bar) => (bar.style.width = bar.dataset.width + "%"));
	});
}
