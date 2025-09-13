import type {
	FontWidthMap,
	MiddleEllipsisConfig,
} from "@dynamic-middle-ellipsis/core";
import { Div } from "./Div";
import type { MiddleEllipsisProps } from "./Span";
import { Span } from "./Span";

const createMiddleEllipsis = (config?: MiddleEllipsisConfig) => {
	const MiddleEllipsis = () => {
		return null;
	};

	MiddleEllipsis.BoundingDiv = Div;
	MiddleEllipsis.Span = (props: MiddleEllipsisProps) => (
		<Span {...props} config={config} />
	);

	return MiddleEllipsis;
};

export type { FontWidthMap };
export default createMiddleEllipsis;
