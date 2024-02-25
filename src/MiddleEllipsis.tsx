import React, { useState, useEffect, useRef } from "react";
import { truncateText } from "./helper";

export const MiddleEllipsis = ({
	children = "",
	middleEllipsis = "...",
}) => {
	const nodeRef = useRef(null);
	const [centreEllipsisText, setCentreEllipsisText] = useState("");

	useEffect(() => {
		if (!nodeRef.current) return;

		const truncatedText = truncateText({
			text: children,
			middleEllipsis,
			nodeRef,
		});

		setCentreEllipsisText(truncatedText);
	}, [children, middleEllipsis]);

	return (
		<span ref={nodeRef} style={{ whiteSpace: "nowrap" }}>
			{centreEllipsisText}
		</span>
	);
};
