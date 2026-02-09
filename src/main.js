import { countries } from "./data/countries_data.js";
import { state } from "./state/state.js";
import { filterCountries } from "./services/filterCountries.js";
import { sortCountries } from "./services/sortCountries.js";
import { renderCountries } from "./ui/renderCountries.js";
import { renderGraph } from "./ui/renderGraph.js";

import { initSearch } from "./events/search.js";
import { initSort } from "./events/sort.js";
import { initGraphMode } from "./events/graphMode.js";
import { initGraphScroll } from "./events/graphScroll.js";
import { initScrollTop } from "./events/scrollTop.js";

import { updateGraphModeButtons } from "./ui/updateGraphModeButtons.js";
import { updateSortButtons } from "./ui/updateSortButtons.js";
import { updateSearchInfo } from "./ui/updateSearchInfo.js";

function getVisibleCountries() {
	let result = filterCountries(countries, state.searchQuery);
	return sortCountries(result, state.sortBy, state.sortOrder);
}

function renderApp() {
	const visible = getVisibleCountries();
	renderCountries(visible);
	renderGraph(visible);

	updateSearchInfo(visible.length);
}

renderApp();
initSearch(renderApp);
initSort(renderApp, updateSortButtons);
initGraphMode(renderApp, updateGraphModeButtons);
initGraphScroll();
initScrollTop();
