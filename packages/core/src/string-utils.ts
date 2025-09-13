import {
	defaultFontWidthMap,
	type FontWidthMap,
} from "./default-font-width-map";

let fontWidthMap: FontWidthMap = defaultFontWidthMap;

export const setFontWidthMap = (customMap: FontWidthMap) => {
	fontWidthMap = customMap;
};

export const getCharacterWidth = (
	character: string,
	fontFamily: string,
	fontSize = 16,
) => {
	const characterWidthMap =
		fontWidthMap[fontFamily] ?? defaultFontWidthMap.serif;

	// If character is not present in widthMap, return width of 'W' character (widest character)
	const characterWidth = characterWidthMap[character] ?? characterWidthMap.W;

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
