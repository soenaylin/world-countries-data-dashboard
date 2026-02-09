import { normalizeCountryName } from "../utils/normalizeName.js";

export function createCountryCard(country) {
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
