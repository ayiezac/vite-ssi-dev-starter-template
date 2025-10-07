export async function fetchTotalSearch() {
	const response = await fetch("/invar/search.new.php");
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const responseText = await response.text();
	const parser = new DOMParser();
	const dom = parser.parseFromString(responseText, "text/html");
	const elmTotalSearch = dom.querySelector(
		".update-wrap > .update-list > span.search-item",
	);
	if (!elmTotalSearch) {
		throw new Error("Element not found");
	}
	const elmTotalSearchTxtContent = elmTotalSearch.textContent;
	if (elmTotalSearchTxtContent === null) {
		throw new Error("Element has no text content");
	}
	const match = elmTotalSearchTxtContent.match(/\d+/);
	if (!match) {
		throw new Error("No match found");
	}
	return match[0];
}

const elmInputLastId = document.querySelector("input[name='lastid']");
elmInputLastId.value = await fetchTotalSearch();