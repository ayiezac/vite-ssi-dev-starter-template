(() => {
	if (HTMLScriptElement.supports?.("speculationrules")) {
		const specScript = document.createElement("script");
		specScript.type = "speculationrules";
		specScript.textContent = JSON.stringify({
			prefetch: [
				{
					where: {
						href_matches: "/*",
					},
					eagerness: "immediate",
				},
			],
			prerender: [
				{
					where: {
						href_matches: "/*",
					},
					eagerness: "moderate",
				},
			],
		});
		document.body.append(specScript);
	} else {
		const script = document.createElement("script");
		script.src = "/imagemaps/js/instant-page.min.js";
		script.defer = true;
		script.type = "module";
		document.body.append(script);
	}
})();
