import { truncateOnResize } from "../truncate-text-utils";

export class Span extends HTMLElement {
	#cleanup: () => void;

	connectedCallback() {
		this.#cleanup = truncateOnResize({
			boundingElement: this.closest("middle-ellipsis-div") as HTMLElement,
			targetElement: this,
			originalText: this.textContent ?? "",
			ellipsisSymbol: this.getAttribute("ellipsisSymbol") ?? undefined,
			lineLimit: Number(this.getAttribute("lineLimit")),
		});
	}

	disconnectedCallback() {
		this.#cleanup();
	}
}
