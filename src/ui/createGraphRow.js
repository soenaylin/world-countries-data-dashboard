import { formatGraphLabel } from "../utils/formatGraphLabel.js";

export function createGraphRow(item, maxValue) {
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
