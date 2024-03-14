import React, { useContext, useEffect, useRef } from "react";
import { ContainerContext } from "./Div";
import { truncateOnResize } from "../truncate-text-utils";

type MiddleEllipsisProps = {
	children: string; // Text to be truncated
	ellipsisSymbol?: string; // Custom ellipsisSymbol to be used in the middle
	lineLimit?: number; // Number of lines to wrap before truncating starts
	[x: string]: unknown; // Rest of the props
};

export const Span = ({
	children = "",
	ellipsisSymbol,
	lineLimit,
	...rest
}: MiddleEllipsisProps) => {
	const boundingElement = useContext(ContainerContext);
	const nodeRef = useRef(null);

	useEffect(() => {
		if (!nodeRef.current) return;
		const targetElement = nodeRef.current;

		const cleanup = truncateOnResize({
			boundingElement,
			targetElement,
			originalText: children,
			ellipsisSymbol,
			lineLimit,
		});

		return cleanup;
	}, [children, ellipsisSymbol, boundingElement, lineLimit]);

	return (
		<span ref={nodeRef} {...rest}>
			{"\u00A0"}
		</span>
	);
};
