import { useState, useCallback, useEffect, useRef } from "react";
import getCharacterWidth from "./width-mapping";

const getElementSizes = (element: any) => {
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

/**
 * Apply dynamic centre ellipsis to given text
 * @param {string|number|boolean|bigint} val: value of given text.
 * @param {object} options: Object containing optional params.
 * @param {number} options.sharedBy: count of similar elements that share the same parent.
 * - e.g. multiple tags
 * @param {number} options.notAvailable: Combined width of all other elements that share the same parent as text.
 * - eg: Icons, buttons, etc.
 * @param {boolean} options.wrapLine: Weather to wrap line/text to new line.
 * - eg: Text inside any tag should not be wrapped.
 * @returns {object}
 * - @type {string} centreEllipsedText: a useState string containing modified text.
 * - @type {string} updateText: a useCallback func that needs DOM node reference to do calculations.
 * - @type {string} tooltipText: a useState string containing original text (only if text was modified).
 * - @type {boolean} ignoreDirectOffsetParent: a boolean to ignore direct offsetParent.
 *          This is for dual click cells which are wrapped inside a div with relative position.
 */
const useTextMiddleEllipsis = (
	val: any,
	{
		sharedBy = 1,
		notAvailable = 9.5,
		wrapLine = true,
		ignoreDirectOffsetParent = false,
	} = {},
) => {
	const initText = String(val);
	const [centreEllipsedText, setCentreEllipsedText] = useState(initText);
	const [tooltipText, setTooltipText] = useState("");
	const nodeRef = useRef(null);
	const offsetParentNodeRef = useRef(null);
	const resizeObserverRef = useRef(null);
	const debounceTimeoutRef = useRef(null);
	const previousWidthRef = useRef(null);

	const updateTextFunc = (curEle: any) => {
		const parentEle = ignoreDirectOffsetParent
			? curEle?.offsetParent?.offsetParent
			: curEle?.offsetParent;

		if (parentEle) {
			const { fontSize } = getElementSizes(curEle);
			const { width: parentWidth, height: parentHeight } =
				getElementSizes(parentEle);

			// If any of the cells in the row are multi-line text, i.e. parent/cell height is large.
			// Make this cell multi-line text too.
			const updatedSharedBy =
				(wrapLine && parentHeight >= 50 && sharedBy >= 1 ? 0.5 : sharedBy) *
				1.05;

			const availableWidth = parentWidth / updatedSharedBy - notAvailable;
			const textCharCount = initText.length;
			const maxTextWidth = initText
				.split("")
				.reduce((acc, cur) => acc + getCharacterWidth(cur, fontSize), 0);
			let newStr = initText;

			// truncate text only if not enough space is available.
			if (availableWidth < maxTextWidth) {
				let remainingWidth =
					availableWidth -
					4 *
						(getCharacterWidth(" ", fontSize) +
							getCharacterWidth(".", fontSize));
				let firstHalf = "";
				let secondHalf = "";

				for (let i = 0; i < Math.floor(textCharCount / 2); i += 1) {
					remainingWidth -= getCharacterWidth(initText[i], fontSize);
					if (remainingWidth < 0) break;
					else firstHalf += initText[i];

					remainingWidth -= getCharacterWidth(
						initText[textCharCount - i - 1],
						fontSize,
					);
					if (remainingWidth < 0) break;
					else secondHalf = initText[textCharCount - i - 1] + secondHalf;
				}

				newStr = `${firstHalf} . . . ${secondHalf}`;
			}

			setCentreEllipsedText(newStr);
			// If text was not modified. There's no need for tooltip.
			setTooltipText(newStr === initText ? "" : initText);
		}
	};

	const updateText = useCallback(
		(node: any) => {
			nodeRef.current = node;
			offsetParentNodeRef.current = ignoreDirectOffsetParent
				? node?.offsetParent?.offsetParent
				: node?.offsetParent;

			updateTextFunc(node);
		},
		[initText],
	);

	useEffect(() => {
		if (!offsetParentNodeRef?.current) return undefined;

		if (!resizeObserverRef.current) {
			resizeObserverRef.current = new ResizeObserver((entries) => {
				clearTimeout(debounceTimeoutRef.current);

				// adding delay to avoid unnecessary rerenders during resizing.
				debounceTimeoutRef.current = setTimeout(() => {
					const currentWidth = entries[0].contentRect.width;
					const previousWidth = previousWidthRef.current;

					if (previousWidth !== null) {
						const widthChangePercentage =
							(Math.abs(currentWidth - previousWidth) / previousWidth) * 100;

						// adding 1% check to avoid unnecessary rerenders.
						if (widthChangePercentage >= 1) {
							updateTextFunc(nodeRef.current);
						}
					}

					previousWidthRef.current = currentWidth;
				}, 100);
			});
		}

		// Using ResizeObserver to send latest width from real DOM to react.
		const resizeObserver = resizeObserverRef.current;
		resizeObserver.observe(offsetParentNodeRef.current);

		return () => {
			resizeObserver.disconnect();
			clearTimeout(debounceTimeoutRef.current);
		};
	}, [offsetParentNodeRef?.current]);

	return { centreEllipsedText, updateText, tooltipText };
};

export default useTextMiddleEllipsis;
