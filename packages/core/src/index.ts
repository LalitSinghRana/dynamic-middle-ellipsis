import type { FontWidthMap } from "./default-font-width-map";

import { setFontWidthMap } from "./string-utils";
import { truncateOnResize } from "./truncate-text";

export type MiddleEllipsisConfig = {
	customFontWidthMap?: FontWidthMap;
};

const createMiddleEllipsisUtils = (config?: MiddleEllipsisConfig) => {
	if (config?.customFontWidthMap) {
		setFontWidthMap(config.customFontWidthMap);
	}

	return truncateOnResize;
};

export type { FontWidthMap };
export default createMiddleEllipsisUtils;
