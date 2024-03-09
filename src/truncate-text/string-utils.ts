import { fontFamilyMap } from "./font-family-map";

export const getCharacterWidth = (
	character: string,
	fontFamily: string,
	fontSize = 16,
) => {
	const characterWidthMap = fontFamilyMap[fontFamily];
	if (!characterWidthMap) return 0;

	// If character is not present in widthMap, return width of 'W' character (widest character)
	const characterWidth = characterWidthMap[character] || characterWidthMap.W;

	return characterWidth * (fontSize / 16); // scale the width according to fontSize
};

export const getStringWidth = (
	originalText: string,
	fontSize: number,
	fontFamily: string,
) => {
	let width = 0;

	for (const c of originalText) {
		width += getCharacterWidth(c, fontFamily, fontSize);
	}

	return width;
};
