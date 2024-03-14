export const getElementProperties = (targetElement: Element) => {
	const style = window.getComputedStyle(targetElement);

	const fontSize = parseFloat(style.fontSize);
	let fontFamily = style.fontFamily.split(",")[0];
	/*
	- For multiple word font family name, it returns with quotes.
		- Example: "Times New Roman", "Courier New", etc
	*/
	if (fontFamily[0] === '"' || fontFamily[0] === "'") fontFamily = fontFamily.slice(1, -1);

	const marginXWidth =
		parseFloat(style.marginLeft) + parseFloat(style.marginRight);
	const borderXWidth =
		parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
	const paddingXWidth =
		parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);

	const width = parseFloat(style.width);
	const totalWidth = width + marginXWidth;
	const innerWidth = width - paddingXWidth - borderXWidth;

	return {
		fontSize,
		fontFamily,
		totalWidth,
		borderXWidth,
		paddingXWidth,
		marginXWidth,
		innerWidth,
	};
};

export const getSiblingWidth = (targetElement: Element): number => {
	let width = 0;
	if (!targetElement.parentNode) return width;

	for (const child of targetElement.parentNode.children) {
		if (child === targetElement) {
			const { paddingXWidth, borderXWidth } =
				getElementProperties(targetElement);
			width += paddingXWidth + borderXWidth;
		} else {
			width += getElementProperties(child).totalWidth;
		}
	}

	return width;
};

export const getAvailableWidth = (targetElement: HTMLElement) => {
	const offsetParentElement = targetElement.offsetParent;
	if (!offsetParentElement) return 0;

	let takenWidth = 0;
	let tempElement = targetElement;

	while (tempElement !== offsetParentElement) {
		takenWidth += getSiblingWidth(tempElement);

		if (!tempElement.parentElement) break;
		tempElement = tempElement.parentElement;
	}

	return getElementProperties(offsetParentElement).innerWidth - takenWidth;
};

/*
  This function assumes that all children element sharing will get equal width.
*/
export const getAvailableWidthWhenSharing = (
	targetElement: HTMLElement,
	boundingElement: HTMLElement,
) => {
	const containerAvailableWidth = getAvailableWidth(boundingElement);

	let takenWidth = 0;
	let tempElement = targetElement;

	while (tempElement !== boundingElement) {
		const { paddingXWidth, borderXWidth, marginXWidth } =
			getElementProperties(tempElement);
		const w = paddingXWidth + borderXWidth + marginXWidth;

		takenWidth += w;

		if (!tempElement.parentElement) break;
		tempElement = tempElement.parentElement;
	}

	const availableWidth =
		containerAvailableWidth / boundingElement.childElementCount - takenWidth;

	return availableWidth;
};
