import { truncateOnResize } from "../truncate-text-utils";

const spanTemplate = `
	<style>
		:host {
			word-break: break-all;
		}
	</style>
	<slot></slot>
`;

export class Span extends HTMLElement {
	#cleanup: () => void = () => {};

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.#cleanup = truncateOnResize({
			boundingElement: this.closest("middle-ellipsis-div") as HTMLElement,
			targetElement: this,
			originalText: this.textContent ?? "",
			ellipsisSymbol: this.getAttribute("ellipsisSymbol") ?? undefined,
			lineLimit: Number(this.getAttribute("lineLimit")),
		});

		this.render();
	}

	disconnectedCallback() {
		this.#cleanup();
	}

	render() {
		if (this.shadowRoot === null) return;

		this.shadowRoot.innerHTML = spanTemplate;
	}
}
