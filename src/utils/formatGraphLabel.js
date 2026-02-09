import { normalizeCountryName } from "./normalizeName.js";

export function formatGraphLabel(name, max = 14) {
	const normalized = normalizeCountryName(name);
	return normalized.length <= max
		? normalized
		: normalized.slice(0, max) + "…";
}
