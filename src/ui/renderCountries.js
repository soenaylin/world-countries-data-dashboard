import { dom } from "../dom/selectors.js";
import { createCountryCard } from "./createCountryCard.js";

export function renderCountries(countries) {
	dom.countriesContainer.innerHTML = "";

	countries.forEach((c) => {
		const card = createCountryCard(c);
		dom.countriesContainer.appendChild(card);
	});
}
