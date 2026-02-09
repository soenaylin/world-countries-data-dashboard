export function filterCountries(countries, query) {
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
