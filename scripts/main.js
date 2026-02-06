/* =======================
   Define the global state object
======================= */
const state = {
	searchQuery: "",
	sortBy: "name", // "name" | "capital" | "population"
	sortOrder: "asc", // "asc" | "desc"
	graphView: "population", // "population" | "languages"
};

/* =======================
   Select the container
======================= */
const countriesContainer = document.querySelector(".countries");
const graphContainer = document.querySelector(".graph-bars");
const searchInput = document.querySelector(".controls input");
const searchInfo = document.querySelector(".search-info");
const sortButtons = document.querySelectorAll(
	".sort-buttons button[data-sort]"
);
const graphModeButtons = document.querySelectorAll(".graph-modes button");
const graphTitle = document.querySelector(".graph-title");
const graphButton = document.querySelector(".graph-btn");
const graphSection = document.querySelector("#graph-section");
const scrollTopBtn = document.querySelector("#scroll-top-btn");

/* =======================
   Compute world population ONCE
======================= */
const WORLD_POPULATION = countries.reduce(
	(total, country) => total + country.population,
	0
);

/* =======================
   Build a normalization map (based on your data)
======================= */
const COUNTRY_NAME_MAP = {
	"United States of America": "USA",
	"United Kingdom of Great Britain and Northern Ireland": "UK",
	"Russian Federation": "Russia",

	"Korea (Republic of)": "South Korea",
	"Korea (Democratic People's Republic of)": "North Korea",

	"Iran (Islamic Republic of)": "Iran",
	"Venezuela (Bolivarian Republic of)": "Venezuela",
	"Bolivia (Plurinational State of)": "Bolivia",
	"Tanzania, United Republic of": "Tanzania",
	"Moldova (Republic of)": "Moldova",
	"Syrian Arab Republic": "Syria",
	"Lao People's Democratic Republic": "Laos",

	"Congo (Democratic Republic of the)": "DR Congo",
	Congo: "Republic of the Congo",

	"Vatican City": "Vatican",

	"Ivory Coast": "Côte d’Ivoire",
	"Cabo Verde": "Cape Verde",

	"Micronesia (Federated States of)": "Micronesia",
	"Palestine, State of": "Palestine",

	"United States Minor Outlying Islands": "US Outlying Islands",

	"South Georgia and the South Sandwich Islands": "South Georgia & SSI",
	"Saint Helena, Ascension and Tristan da Cunha": "Saint Helena",

	"Virgin Islands (U.S.)": "US Virgin Islands",
	"Virgin Islands (British)": "British Virgin Islands",
};

/* =======================
   Final normalization function (clean & reusable)
======================= */
function normalizeCountryName(name) {
	return COUNTRY_NAME_MAP[name] || name;
}

/* =======================
   Optional graph-specific shortening
======================= */
function formatGraphLabel(name, maxLength = 14) {
	const normalized = normalizeCountryName(name);

	if (normalized.length <= maxLength) return normalized;
	return normalized.slice(0, maxLength) + "…";
}

/* =======================
   Create ONE card (helper function)
======================= */
function createCountryCard(country) {
	const card = document.createElement("div");
	card.className = "country-card";

	const flag = document.createElement("img");
	flag.className = "flag";
	flag.src = country.flag;
	flag.alt = `${country.name} flag`;

	const name = document.createElement("h3");
	name.className = "country-name";
	name.textContent = normalizeCountryName(country.name).toUpperCase();

	const capital = document.createElement("p");
	capital.innerHTML = `<strong>Capital:</strong> ${country.capital}`;

	const languages = document.createElement("p");
	languages.innerHTML = `<strong>Languages:</strong> ${country.languages.join(
		", "
	)}`;

	const population = document.createElement("p");
	population.innerHTML = `<strong>Population:</strong> ${country.population.toLocaleString()}`;

	card.append(flag, name, capital, languages, population);

	return card;
}

/* =======================
   Render ALL cards
======================= */
function renderCountries(countriesList) {
	countriesContainer.innerHTML = "";

	countriesList.forEach((country) => {
		const card = createCountryCard(country);
		countriesContainer.appendChild(card);
	});
}

/* =======================
   Initial render
======================= */
// renderCountries(countries);

/* =======================
   Prepare population graph data
======================= */
function getPopulationGraphData(countries) {
	const sortedCountries = [...countries].sort(
		(a, b) => b.population - a.population
	);

	const topTen = sortedCountries.slice(0, 10);

	const graphData = [
		{ label: "World", value: WORLD_POPULATION },
		...topTen.map((country) => ({
			label: country.name,
			value: country.population,
		})),
	];

	return graphData;
}

/* =======================
   Language graph data preparation (pure logic)
======================= */
function getLanguageGraphData(countries) {
	const languageMap = {};

	countries.forEach((country) => {
		country.languages.forEach((language) => {
			languageMap[language] = (languageMap[language] || 0) + 1;
		});
	});

	const languageData = Object.entries(languageMap)
		.map(([language, count]) => ({
			label: language,
			value: count,
		}))
		.sort((a, b) => b.value - a.value)
		.slice(0, 10);

	return languageData;
}

/* =======================
   Create ONE graph row
======================= */
function createGraphRow(item, maxValue) {
	const row = document.createElement("div");
	row.className = "graph-row";

	const label = document.createElement("span");
	label.className = "graph-label";
	label.textContent = formatGraphLabel(item.label);

	const barWrapper = document.createElement("div");
	barWrapper.className = "graph-bar-wrapper";

	const bar = document.createElement("div");
	bar.className = "graph-bar";

	// store target width (but do NOT apply yet)
	const percentage = (item.value / maxValue) * 100;
	bar.dataset.width = percentage;

	barWrapper.appendChild(bar);

	const value = document.createElement("span");
	value.className = "graph-value";
	value.textContent = item.value.toLocaleString();

	row.append(label, barWrapper, value);

	return row;
}

/* =======================
   Render the graph
======================= */
function renderGraph(countries) {
	graphContainer.innerHTML = "";

	let graphData = [];

	if (state.graphView === "population") {
		graphData = getPopulationGraphData(countries);
		graphTitle.textContent = "10 Most Populated Countries in the World";
	}

	if (state.graphView === "languages") {
		graphData = getLanguageGraphData(countries);
		graphTitle.textContent = "10 Most Spoken Languages in the World";
	}

	const maxValue = Math.max(...graphData.map((item) => item.value));

	graphData.forEach((item) => {
		const row = createGraphRow(item, maxValue);
		graphContainer.appendChild(row);
	});

	// 🔥 animation trigger
	requestAnimationFrame(() => {
		const bars = graphContainer.querySelectorAll(".graph-bar");
		bars.forEach((bar) => {
			bar.style.width = bar.dataset.width + "%";
		});
	});
}

/* =======================
   Initial render
======================= */
// renderPopulationGraph(countries);

/* =======================
   Implement filtering logic (pure function)
======================= */
function filterCountries(countries, query) {
	if (!query) return countries;

	const lowerQuery = query.toLowerCase();

	return countries.filter((country) => {
		if (!country.name || !country.capital || !country.languages)
			return false;

		const nameMatch = country.name.toLowerCase().includes(lowerQuery);
		const capitalMatch = country.capital.toLowerCase().includes(lowerQuery);
		const languageMatch = country.languages.some((lang) =>
			lang.toLowerCase().includes(lowerQuery)
		);

		return nameMatch || capitalMatch || languageMatch;
	});
}

/* =======================
   Update the search info text (derived UI)
======================= */
function updateSearchInfo(count) {
	if (state.searchQuery) {
		searchInfo.textContent = `${count} countries satisfied the search criteria`;
		searchInfo.classList.remove("hidden");
	} else {
		searchInfo.classList.add("hidden");
	}
}

/* =======================
   Create sorting logic (pure function)
======================= */
function sortCountries(countries, sortBy, sortOrder) {
	const sorted = [...countries];

	sorted.sort((a, b) => {
		if (
			!a.name ||
			!a.capital ||
			!a.languages ||
			!b.name ||
			!b.capital ||
			!b.languages
		) {
			// Handle the case where a country object is missing a required property
			return 0;
		}

		let valueA = a[sortBy];
		let valueB = b[sortBy];

		if (typeof valueA === "string") {
			valueA = valueA.toLowerCase();
			valueB = valueB.toLowerCase();
		}

		if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
		if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
		return 0;
	});

	return sorted;
}

/* =======================
   Create a derived data function
======================= */
function getVisibleCountries() {
	let result = [...countries];

	// (Search & sort will come later)
	result = filterCountries(result, state.searchQuery);
	result = sortCountries(result, state.sortBy, state.sortOrder);

	return result;
}

/* =======================
   Create the main render function
======================= */
function renderApp() {
	const visibleCountries = getVisibleCountries();

	renderCountries(visibleCountries);
	renderGraph(visibleCountries);
	updateSearchInfo(visibleCountries.length);
}

/* =======================
   Update active button UI (important UX)
======================= */
function updateSortButtons() {
	sortButtons.forEach((button) => {
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

/* =======================
   Active button UI
======================= */
function updateGraphModeButtons() {
	graphModeButtons.forEach((button) => {
		const mode = button.textContent.toLowerCase();
		button.classList.toggle("active", mode === state.graphView);
	});
}

/* =======================
   Initial render
======================= */
renderApp();
updateGraphModeButtons();
updateSortButtons();

/* =======================
   EVENTS
======================= */
searchInput.addEventListener("input", (event) => {
	state.searchQuery = event.target.value.trim();
	renderApp();
});

sortButtons.forEach((button) => {
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

/* =======================
   Handle graph mode button clicks (state update)
======================= */
graphModeButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const mode = button.textContent.toLowerCase();

		if (state.graphView !== mode) {
			state.graphView = mode;
			updateGraphModeButtons();
			renderApp();
		}
	});
});

/* =======================
   Add click behavior
======================= */
graphButton.addEventListener("click", () => {
	graphSection.scrollIntoView({
		behavior: "smooth",
		block: "start",
	});
});

/* =======================
   Scroll-to-top button (footer utility)
======================= */
window.addEventListener("scroll", () => {
	if (window.scrollY > 300) {
		scrollTopBtn.classList.add("show");
	} else {
		scrollTopBtn.classList.remove("show");
	}
});

scrollTopBtn.addEventListener("click", () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
});
