import {
	getAvailableWidth,
	getAvailableWidthWhenSharing,
	getElementProperties,
} from "./element-utils";
import { getCharacterWidth, getStringWidth } from "./string-utils";

type TruncateOptions = {
	boundingElement?: HTMLElement;
	targetElement: HTMLElement;
	originalText: string;
	ellipsisSymbol: string;
	lineLimit: number;
};

const truncateText = ({
	boundingElement,
	targetElement,
	originalText,
	ellipsisSymbol,
	lineLimit,
}: TruncateOptions) => {
	const { fontSize, fontFamily } = getElementProperties(targetElement);
	let availableWidth = boundingElement
		? getAvailableWidthWhenSharing(targetElement, boundingElement)
		: getAvailableWidth(targetElement);

	if (lineLimit > 1) {
		availableWidth =
			availableWidth * lineLimit - getCharacterWidth("W", fontFamily, fontSize);
	}

	const maxTextWidth = getStringWidth(originalText, fontSize, fontFamily);

	/*
		If maximum possible originalText width is less than or equal to available width, 
		then there is no need to truncate originalText.
		Return original originalText.
	*/
	if (maxTextWidth <= availableWidth) return originalText;

	const middleEllipsisWidth = getStringWidth(
		ellipsisSymbol,
		fontSize,
		fontFamily,
	);
	const originalTextLength = originalText.length;

	let remainingWidth = availableWidth - middleEllipsisWidth;
	let firstHalf = "";
	let secondHalf = "";

	for (let i = 0; i < Math.floor(originalTextLength / 2); i++) {
		remainingWidth -= getCharacterWidth(originalText[i], fontFamily, fontSize);

		if (remainingWidth < 0) break;
		firstHalf += originalText[i];

		remainingWidth -= getCharacterWidth(
			originalText.at(i - 1) as string,
			fontFamily,
			fontSize,
		);

		if (remainingWidth < 0) break;
		secondHalf = originalText.at(i - 1) + secondHalf;
	}

	return firstHalf + ellipsisSymbol + secondHalf;
};

export const truncateOnResize = ({
	boundingElement,
	targetElement,
	originalText = "",
	ellipsisSymbol = "...",
	lineLimit = 1,
}: TruncateOptions) => {
	if (!targetElement.offsetParent || !originalText) return () => {};

	const observer = new ResizeObserver(() => {
		const truncatedText = truncateText({
			boundingElement,
			targetElement,
			/* Below checks provide run-time guarantees */
			originalText: String(originalText),
			ellipsisSymbol:
				typeof ellipsisSymbol === "string" ? ellipsisSymbol : "...",
			lineLimit: typeof lineLimit === "number" ? lineLimit : 1,
		});

		// Directly update the originalText in the DOM
		targetElement.textContent = truncatedText;
	});

	observer.observe(targetElement.offsetParent);

	return () => observer.disconnect();
};
