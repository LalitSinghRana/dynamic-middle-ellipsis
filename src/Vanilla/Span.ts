import { truncateOnResize } from "../truncate-text-utils";

export class Span extends HTMLElement {
	#cleanup: () => void;
	#originalText: string | null;

	connectedCallback() {
		this.#originalText = this.textContent;

		this.#cleanup = truncateOnResize({
			boundingElement: this.closest("middle-ellipsis-div") as HTMLElement,
			targetElement: this,
			originalText: this.innerHTML,
			ellipsisSymbol: this.getAttribute("ellipsisSymbol") as string,
			lineLimit: Number(this.getAttribute("lineLimit")),
		});
	}

	disconnectedCallback() {
		this.#cleanup();
	}
}
