import React from "react";
import getCharacterWidth from "./width-mapping";

const getElementSizes = (element: Element) => {
	const nodeStyleObj = window.getComputedStyle(element);

	const paddingWidthX =
		parseInt(nodeStyleObj.paddingLeft, 10) +
		parseInt(nodeStyleObj.paddingRight, 10);
	const paddingWidthY =
		parseInt(nodeStyleObj.paddingTop, 10) +
		parseInt(nodeStyleObj.paddingBottom, 10);
	const marginWidthX =
		parseInt(nodeStyleObj.marginLeft, 10) +
		parseInt(nodeStyleObj.marginRight, 10);
	const borderWidthX =
		parseInt(nodeStyleObj.borderLeftWidth, 10) +
		parseInt(nodeStyleObj.borderRightWidth, 10);

	// `nodeStyleObj.width` return width that includes padding. So we have to subtract padding to get available width.
	const width = parseInt(nodeStyleObj.width, 10) - paddingWidthX;
	const height = parseInt(nodeStyleObj.height, 10) - paddingWidthY;

	const fontSize = parseInt(nodeStyleObj.fontSize, 10);

	return {
		width,
		height,
		paddingWidthX,
		marginWidthX,
		borderWidthX,
		fontSize,
	};
};

const getStringWidth = (text: string, fontSize: number) => {
	let width = 0;

	for (const c of text) {
		width += getCharacterWidth(c, fontSize);
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

	const { fontSize } = getElementSizes(curEle);
	const { width: availableWidth } = getElementSizes(offsetParent);

	const maxTextWidth = getStringWidth(text, fontSize);

	/*
		If maximum possible text width is less than or equal to available width, 
		then there is no need to truncate text.
		Return original text.
	*/
	if (maxTextWidth <= availableWidth) return text;

	const middleEllipsisWidth = getStringWidth(middleEllipsis, fontSize);
	const textCharCount = text.length;

	let remainingWidth = availableWidth - middleEllipsisWidth;
	let firstHalf = "";
	let secondHalf = "";

	for (let i = 0; i < Math.floor(textCharCount / 2); i++) {
		remainingWidth -= getCharacterWidth(text[i], fontSize);

		if (remainingWidth <= 0) break;
		firstHalf += text[i];

		remainingWidth -= getCharacterWidth(text[textCharCount - i - 1], fontSize);
		if (remainingWidth <= 0) break;
		secondHalf = text[textCharCount - i - 1] + secondHalf;
	}

	return firstHalf + middleEllipsis + secondHalf;
};
