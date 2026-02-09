import { countries } from "../data/countries_data.js";

/* =======================
   Compute world population ONCE
======================= */
export const WORLD_POPULATION = countries.reduce(
	(total, country) => total + country.population,
	0
);

/* =======================
   Prepare population graph data
======================= */
export function getPopulationGraphData(countries) {
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
export function getLanguageGraphData(countries) {
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
