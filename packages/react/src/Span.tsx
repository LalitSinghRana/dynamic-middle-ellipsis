import createMiddleEllipsisUtils, {
	type MiddleEllipsisConfig,
} from "@dynamic-middle-ellipsis/core";
import { useContext, useEffect, useRef } from "react";
import { ContainerContext } from "./Div";

export type MiddleEllipsisProps = {
	children: string; // Text to be truncated
	ellipsisSymbol?: string; // Custom ellipsisSymbol to be used in the middle
	lineLimit?: number; // Number of lines to wrap before truncating starts
	[x: string]: unknown; // Rest of the props
};

export const Span = ({
	config,
	children = "",
	ellipsisSymbol = "...",
	lineLimit = 1,
	...rest
}: MiddleEllipsisProps & { config?: MiddleEllipsisConfig }) => {
	const boundingElement = useContext(ContainerContext);
	const nodeRef = useRef(null);
	const truncateOnResizeRef = useRef(createMiddleEllipsisUtils(config));

	useEffect(() => {
		if (!nodeRef.current) return;
		const targetElement = nodeRef.current;
		const truncateOnResize = truncateOnResizeRef.current;

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
		<span ref={nodeRef} {...rest} style={{ wordBreak: "break-all" }}>
			{"\u00A0"}
		</span>
	);
};
