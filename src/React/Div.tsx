import React, { type ReactNode, createContext, useEffect, useRef, useState } from "react";

type MultiEllipsisContainerProps = {
	children: Iterable<ReactNode>;
	[x: string]: unknown;
};

export const ContainerContext = createContext<HTMLElement | undefined>(undefined);

export const Div = ({
	children, // Array of elements to be wrapped
	...rest // Rest of the props
}: MultiEllipsisContainerProps) => {
	const containerRef = useRef(null);
	const [boundingElement, setBoundingElement] = useState(undefined);

	// Update node state when nodeRef.current changes
	useEffect(() => {
		if (!containerRef?.current) return;

		setBoundingElement(containerRef?.current);
	}, []);

	return (
		<ContainerContext.Provider value={boundingElement}>
			{/* Feel free to remove the inline style with whatever your project is
			using. Tailwind, scss, etc. */}
			<span ref={containerRef} style={{ width: "100%" }} {...rest}>
				{children}
			</span>
		</ContainerContext.Provider>
	);
};
