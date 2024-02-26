import React from "react";
import { fontFamilyWidthMap } from "./fontFamilyWidthMap";

const getCharacterWidth = (
	character: string,
	fontSize = 16, // TODO: Figure out a way to not have this pass around every instance
	fontFamily: string, // TODO: Figure out a way to not have this pass around every instance
) => {
	const widthMap = fontFamilyWidthMap[fontFamily];

	// If character is not present in widthMap, return width of 'W' character (widest character)
	const characterWidth = widthMap[character] || widthMap.W;

	return characterWidth * (fontSize / 16) * 1; // 2px for 'normal' letter spacing
};

const getElementCssProperties = (element: Element) => {
	const elementStyleObj = window.getComputedStyle(element);

	const paddingWidthX =
		parseInt(elementStyleObj.paddingLeft, 10) +
		parseInt(elementStyleObj.paddingRight, 10);
	const paddingWidthY =
		parseInt(elementStyleObj.paddingTop, 10) +
		parseInt(elementStyleObj.paddingBottom, 10);
	const marginWidthX =
		parseInt(elementStyleObj.marginLeft, 10) +
		parseInt(elementStyleObj.marginRight, 10);
	const borderWidthX =
		parseInt(elementStyleObj.borderLeftWidth, 10) +
		parseInt(elementStyleObj.borderRightWidth, 10);

	// `nodeStyleObj.width` return width that includes padding. So we have to subtract padding to get available width.
	const width = parseInt(elementStyleObj.width, 10) - paddingWidthX;
	const height = parseInt(elementStyleObj.height, 10) - paddingWidthY;

	const fontSize = parseInt(elementStyleObj.fontSize, 10);
	const fontFamily = elementStyleObj.fontFamily.split(",")[0];

	return {
		width,
		height,
		paddingWidthX,
		marginWidthX,
		borderWidthX,
		fontSize,
		fontFamily,
	};
};

const getStringWidth = (text: string, fontSize: number, fontFamily: string) => {
	let width = 0;

	for (const c of text) {
		width += getCharacterWidth(c, fontSize, fontFamily);
	}

	return width;
};

export const truncateText = ({
	text,
	nodeRef,
	middleEllipsis,
}: {
	text: string;
	nodeRef: React.RefObject<HTMLElement>;
	middleEllipsis: string;
}) => {
	const curEle = nodeRef.current;
	const offsetParent = curEle?.offsetParent;
	/*
		If current element or offsetParent are not available, we can't truncate text.
		Return original text.
	*/
	if (!curEle || !offsetParent) return text;

	const { fontSize, fontFamily } = getElementCssProperties(curEle);
	const { width: availableWidth } = getElementCssProperties(offsetParent);

	const maxTextWidth = getStringWidth(text, fontSize, fontFamily);

	console.log("LALIT ~ availableWidth:", {
		availableWidth,
		calculatedWidth: maxTextWidth,
	});

	/*
		If maximum possible text width is less than or equal to available width, 
		then there is no need to truncate text.
		Return original text.
	*/
	if (maxTextWidth <= availableWidth) return text;

	const middleEllipsisWidth = getStringWidth(
		middleEllipsis,
		fontSize,
		fontFamily,
	);
	const emptySpaceWidth = 0;
	const textCharCount = text.length;

	let remainingWidth =
		availableWidth - middleEllipsisWidth - emptySpaceWidth * 2;
	let firstHalf = "";
	let secondHalf = "";
	let firstHalfWidth = 0;
	let secondHalfWidth = 0;

	for (let i = 0; i < Math.floor(textCharCount / 2); i++) {
		const fhWidth = getCharacterWidth(text[i], fontSize, fontFamily);
		remainingWidth -= fhWidth;

		if (remainingWidth < 0) break;
		firstHalf += text[i];
		firstHalfWidth += fhWidth;

		const shWidth = getCharacterWidth(
			text[textCharCount - i - 1],
			fontSize,
			fontFamily,
		);
		remainingWidth -= shWidth;

		if (remainingWidth < 0) break;
		secondHalf = text[textCharCount - i - 1] + secondHalf;
		secondHalfWidth += shWidth;
	}

	// console.log("LALIT ~ availableWidth:", {
	// 	availableWidth,
	// 	calculatedWidth: firstHalfWidth + middleEllipsisWidth + secondHalfWidth,
	// 	firstHalfWidth,
	// 	middleEllipsisWidth,
	// 	secondHalfWidth,
	// });

	return firstHalf + middleEllipsis + secondHalf;
};
