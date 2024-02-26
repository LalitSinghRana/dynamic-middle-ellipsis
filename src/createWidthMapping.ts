const getCharacterWidth = (character: string, fontFamily: string) => {
	const context = document.createElement("canvas").getContext("2d");
	if (!context)
		throw new Error("Browser canvas failed to create a 2D rendering context");

	context.font = `16px ${fontFamily}`;
	/* Getting avg of 2 character width, to include font-family built in spacing */
	const metrics = context.measureText(character + character);

	/* Using upper limit, so that our calculated text width always be smaller than available in DOM.*/
	return metrics.width / 2;
};

const generateCharacterWidthMapping = (fontFamily) => {
	const fontWidthMapping = {};
	/*
    The first 32 characters in the ASCII-table are unprintable control codes and are not used in web typography.
    ASCII characters from 32 to 127 are printable characters. We will generate width mapping for these characters.
  */
	for (let i = 32; i < 128; i++) {
		const character = String.fromCharCode(i);
		fontWidthMapping[character] = getCharacterWidth(character, fontFamily);
	}

	return fontWidthMapping;
};

const generateFontWidthMapping = () => {
	const fontFamilies = new Set<string>();

	for (const element of document.querySelectorAll("*")) {
		// biome-ignore lint/complexity/noForEach: <single and simple iteration>
		window
			.getComputedStyle(element)
			.getPropertyValue("font-family")
			.split(", ")
			.forEach((fontFamily) => fontFamilies.add(fontFamily));
	}

	const fontsMap = {};

	for (const fontFamily of fontFamilies) {
		fontsMap[fontFamily] = generateCharacterWidthMapping(fontFamily);
	}

	return fontsMap;
};

const getCharacterWidth2 = (character: string, fontFamily: string) => {
	const element = document.createElement("span");
	element.style.fontFamily = fontFamily;
	element.style.fontSize = "16px";
	element.style.position = "absolute";
	element.style.visibility = "hidden";
	element.textContent = character;
	document.body.appendChild(element);
	const width = element.getBoundingClientRect().width;
	document.body.removeChild(element);
	return width;
};
