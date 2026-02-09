const MAP = {
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

export const normalizeCountryName = (name) => MAP[name] || name;
