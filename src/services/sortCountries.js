export function sortCountries(countries, sortBy, sortOrder) {
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
